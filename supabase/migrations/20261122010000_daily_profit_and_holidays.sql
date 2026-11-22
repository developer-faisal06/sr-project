-- ============================================================
-- SR Investment: Daily Profit Logs, Holiday Multi-Date & DB Schema Extension
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Extend profiles with profit tracking columns
alter table public.profiles add column if not exists active_capital numeric default 0;
alter table public.profiles add column if not exists today_profit numeric default 0;
alter table public.profiles add column if not exists total_profit numeric default 0;
alter table public.profiles add column if not exists last_profit_credited_date date;

-- 2. Create daily_profit_logs table for admin auditing
create table if not exists public.daily_profit_logs (
  id bigserial primary key,
  user_id text not null,
  user_name text not null,
  active_capital numeric not null default 0,
  monthly_roi_percent numeric not null default 10,
  daily_profit_amount numeric not null default 0,
  credited_at timestamptz default now()
);

-- 3. Enable RLS and Realtime
alter table public.daily_profit_logs enable row level security;
drop policy if exists "Public all daily_profit_logs" on public.daily_profit_logs;
create policy "Public all daily_profit_logs" on public.daily_profit_logs for all using (true) with check (true);

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'daily_profit_logs') then
    alter publication supabase_realtime add table public.daily_profit_logs;
  end if;
end $$;

alter table public.daily_profit_logs replica identity full;

-- 4. Function to credit daily profit (30 working days calculation basis)
create or replace function public.admin_credit_daily_profits(monthly_roi numeric default 10)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  daily_amt numeric;
  credited_count integer := 0;
  today_date date := current_date;
begin
  -- Skip weekends (Saturday=6, Sunday=0)
  if extract(isodow from today_date) in (6, 7) then
    return 0;
  end if;

  -- Skip if today is an official holiday in working_day_calendars
  if exists (select 1 from public.working_day_calendars where holiday_date = today_date and enabled = true) then
    return 0;
  end if;

  for r in select id, name, coalesce(active_capital, invested, 0) as cap, coalesce(total_profit, 0) as tp, last_profit_credited_date from public.profiles where status = 'Active' and coalesce(active_capital, invested, 0) > 0 loop
    if r.last_profit_credited_date is null or r.last_profit_credited_date < today_date then
      -- Daily profit based on 30 working days per month
      daily_amt := round((r.cap * (monthly_roi / 100.0)) / 30.0, 2);

      update public.profiles set
        today_profit = daily_amt,
        total_profit = tp + daily_amt,
        last_profit_credited_date = today_date,
        updated_at = now()
      where id = r.id;

      insert into public.daily_profit_logs (user_id, user_name, active_capital, monthly_roi_percent, daily_profit_amount)
      values (r.id, r.name, r.cap, monthly_roi, daily_amt);

      credited_count := credited_count + 1;
    end if;
  end loop;

  return credited_count;
end;
$$;

revoke all on function public.admin_credit_daily_profits from public;
grant execute on function public.admin_credit_daily_profits to authenticated;
