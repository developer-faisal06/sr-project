-- Migration: Real-time Lock & Release, Holidays, Site Settings & Custom Plan Architecture
-- Date: 2026-11-15

-- 1. Holiday calendar extensions
-- Existing working_day_calendars stores specific non-working dates and is reused by DB lock functions.
alter table public.working_day_calendars add column if not exists is_recurring_day boolean not null default false;
alter table public.working_day_calendars add column if not exists day_of_week integer check (day_of_week between 0 and 6);

-- Recurring holidays are kept separate so the existing unique holiday_date constraint remains valid.
create table if not exists public.recurring_holidays (
  id bigserial primary key,
  day_of_week integer not null check (day_of_week between 0 and 6),
  title text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists recurring_holidays_day_idx on public.recurring_holidays(day_of_week, enabled);

alter table public.recurring_holidays enable row level security;
drop policy if exists "Public read recurring holidays" on public.recurring_holidays;
create policy "Public read recurring holidays" on public.recurring_holidays for select to anon, authenticated using (enabled = true);
drop policy if exists "Admin manage recurring holidays" on public.recurring_holidays;
create policy "Admin manage recurring holidays" on public.recurring_holidays for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));

-- 2. Extend system_settings for SiteSettings requirements
alter table public.system_settings add column if not exists withdraw_warning_text text default 'Notice: First approved deposit and accrued profits require 30 completed working days before withdrawal eligibility. Referral commissions have a 45 working-day maturation cycle. Weekends (Friday & Saturday) and institutional holidays are excluded.';
alter table public.system_settings add column if not exists invest_warning_text text default 'Notice: Please confirm recipient gateway addresses and network identifiers accurately before confirming deposit proofs.';
alter table public.system_settings add column if not exists global_notice_text text default 'Institutional Gold & Commodity trading operates 24/5. Weekend settlements (Friday & Saturday) are paused for audit rebalancing.';
alter table public.system_settings add column if not exists global_notice_visible boolean default true;
alter table public.system_settings add column if not exists global_notice_style text default 'warning';

-- 3. Extend investment_plans for Custom Amount & Dynamic Attributes
alter table public.investment_plans add column if not exists min_amount numeric default 100;
alter table public.investment_plans add column if not exists max_amount numeric default 100000;
alter table public.investment_plans add column if not exists return_rate numeric default 10;
alter table public.investment_plans add column if not exists is_custom_amount boolean default false;

-- Ensure default "Custom Amount" plan exists
insert into public.investment_plans (id, name, amount, roi, min_amount, max_amount, return_rate, is_custom_amount, popular, sort_order)
values ('custom', 'Custom Amount', '$100 - $100,000', 'Dynamic ROI (~8-15%)', 100, 100000, 10, true, false, 99)
on conflict (id) do update set
  name = 'Custom Amount',
  is_custom_amount = true,
  min_amount = coalesce(public.investment_plans.min_amount, 100),
  max_amount = coalesce(public.investment_plans.max_amount, 100000);

-- Update default starter, popular, premium with amounts & limits
update public.investment_plans set min_amount = 200, max_amount = 499, return_rate = 8 where id = 'starter';
update public.investment_plans set min_amount = 500, max_amount = 999, return_rate = 10 where id = 'popular';
update public.investment_plans set min_amount = 1000, max_amount = 50000, return_rate = 12 where id = 'premium';

-- 4. Enable Supabase Realtime publication on relevant tables
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'working_day_calendars') then
    alter publication supabase_realtime add table public.working_day_calendars;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'recurring_holidays') then
    alter publication supabase_realtime add table public.recurring_holidays;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'system_settings') then
    alter publication supabase_realtime add table public.system_settings;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'investment_plans') then
    alter publication supabase_realtime add table public.investment_plans;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'notifications') then
    alter publication supabase_realtime add table public.notifications;
  end if;
end $$;

-- 5. Friday/Saturday working-day algorithm + recurring holiday awareness.
-- PostgreSQL extract(dow): Sunday=0 ... Friday=5, Saturday=6.
create or replace function public.is_working_day(check_date date)
returns boolean language sql stable set search_path = public as $$
  select extract(dow from check_date) not in (5, 6)
    and not exists (
      select 1 from public.working_day_calendars h
      where h.holiday_date = check_date and h.enabled = true
    )
    and not exists (
      select 1 from public.recurring_holidays h
      where h.enabled = true and h.day_of_week = extract(dow from check_date)::integer
    );
$$;

create or replace function public.add_working_days(start_date date, number_of_days integer)
returns date language plpgsql stable set search_path = public as $$
declare current_date_value date := start_date; counted integer := 0;
begin
  if number_of_days <= 0 then return start_date; end if;
  while counted < number_of_days loop
    current_date_value := current_date_value + 1;
    if public.is_working_day(current_date_value) then counted := counted + 1; end if;
  end loop;
  return current_date_value;
end;
$$;

-- 6. Secure admin-only holiday schedule mutation and exact notification broadcast.
create or replace function public.admin_create_holiday_schedule(
  holiday_records jsonb,
  notification_message text default null
)
returns jsonb language plpgsql security definer set search_path = public as $$
declare item jsonb; created_count integer := 0; schedule_title text;
begin
  if not (select private.is_admin()) then
    raise exception 'Only an administrator can manage holidays';
  end if;
  if jsonb_typeof(holiday_records) <> 'array' or jsonb_array_length(holiday_records) = 0 then
    raise exception 'At least one holiday record is required';
  end if;

  for item in select value from jsonb_array_elements(holiday_records) loop
    schedule_title := coalesce(nullif(trim(item->>'title'), ''), 'Official Market Holiday');
    if coalesce((item->>'is_recurring_day')::boolean, false) then
      if (item->>'day_of_week') is null or (item->>'day_of_week')::integer not between 0 and 6 then
        raise exception 'A recurring holiday needs a valid day_of_week between 0 and 6';
      end if;
      insert into public.recurring_holidays (day_of_week, title, enabled)
      values ((item->>'day_of_week')::integer, schedule_title, true);
    else
      if nullif(item->>'date', '') is null then
        raise exception 'A dated holiday requires a date';
      end if;
      insert into public.working_day_calendars (holiday_date, holiday_name, enabled)
      values ((item->>'date')::date, schedule_title, true)
      on conflict (holiday_date) do update set holiday_name = excluded.holiday_name, enabled = true;
    end if;
    created_count := created_count + 1;
  end loop;

  if nullif(trim(notification_message), '') is not null then
    insert into public.notifications (recipient_id, recipient_type, category, event_type, title, message, is_read, is_seen)
    values ('ALL', 'ALL', 'SYSTEM', 'HOLIDAY_ANNOUNCEMENT', 'Holiday Schedule Updated', trim(notification_message), false, false);
  end if;

  return jsonb_build_object('created_count', created_count);
end;
$$;

create or replace function public.admin_delete_holiday_schedule(target_id bigint, target_kind text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not (select private.is_admin()) then raise exception 'Only an administrator can manage holidays'; end if;
  if target_kind = 'RECURRING' then
    delete from public.recurring_holidays where id = target_id;
  else
    delete from public.working_day_calendars where id = target_id;
  end if;
  if not found then raise exception 'Holiday record not found'; end if;
  return true;
end;
$$;

create or replace function public.admin_update_lock_site_settings(new_values jsonb)
returns public.system_settings language plpgsql security definer set search_path = public as $$
declare result public.system_settings;
begin
  if not (select private.is_admin()) then raise exception 'Only an administrator can update platform settings'; end if;
  update public.system_settings
  set global_notice_text = coalesce(new_values->>'global_notice_text', global_notice_text),
      global_notice_visible = coalesce((new_values->>'global_notice_visible')::boolean, global_notice_visible),
      global_notice_style = coalesce(new_values->>'global_notice_style', global_notice_style),
      withdraw_warning_text = coalesce(new_values->>'withdraw_warning_text', withdraw_warning_text),
      invest_warning_text = coalesce(new_values->>'invest_warning_text', invest_warning_text),
      updated_at = now()
  where id = 'global_config'
  returning * into result;
  if result.id is null then raise exception 'Global settings record not found'; end if;
  return result;
end;
$$;

grant execute on function public.admin_create_holiday_schedule(jsonb, text) to authenticated;
grant execute on function public.admin_delete_holiday_schedule(bigint, text) to authenticated;
grant execute on function public.admin_update_lock_site_settings(jsonb) to authenticated;

