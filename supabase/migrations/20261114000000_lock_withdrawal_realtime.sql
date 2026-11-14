-- SR Investment: working-day locks, withdrawal eligibility and realtime foundations.
-- Additive migration: existing deposits/gateways/notifications remain compatible.

alter table public.system_settings add column if not exists deposit_lock_working_days integer default 30;
alter table public.system_settings add column if not exists referral_lock_working_days integer default 45;
alter table public.system_settings add column if not exists lock_timezone text default 'UTC';
alter table public.system_settings add column if not exists lock_weekend_days jsonb default '[0,6]'::jsonb;
alter table public.system_settings add column if not exists lock_policy_enabled boolean default true;
alter table public.system_settings add column if not exists referral_lock_working_days integer default 45;


alter table public.profiles add column if not exists first_deposit_approved_at timestamptz;
alter table public.profiles add column if not exists deposit_unlock_at timestamptz;
alter table public.profiles add column if not exists locked_deposit numeric default 0;
alter table public.profiles add column if not exists locked_profit numeric default 0;
alter table public.profiles add column if not exists locked_referral_commission numeric default 0;
alter table public.profiles add column if not exists withdrawable_balance numeric default 0;

create table if not exists public.user_withdrawal_locks (
  id bigserial primary key,
  user_id text not null,
  lock_type text not null check (lock_type in ('FIRST_DEPOSIT','PROFIT','REFERRAL_COMMISSION','MANUAL_HOLD','RISK_HOLD')),
  source_id text,
  principal_amount numeric default 0,
  profit_amount numeric default 0,
  referral_amount numeric default 0,
  approved_at timestamptz,
  lock_start_date date not null default current_date,
  lock_days integer not null default 30,
  unlock_date date,
  working_days_completed integer not null default 0,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','ELIGIBLE','RELEASED','MANUAL_HOLD','RISK_HOLD','CANCELLED')),
  hold_reason text,
  released_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.referral_commission_locks (
  id bigserial primary key,
  referrer_id text not null,
  referred_user_id text,
  referral_id text,
  commission_amount numeric not null default 0,
  currency text not null default 'USD',
  earned_at timestamptz not null default now(),
  lock_start_date date not null default current_date,
  lock_days integer not null default 45,
  unlock_date date,
  status text not null default 'LOCKED' check (status in ('PENDING','LOCKED','ELIGIBLE','RELEASED','CANCELLED','REVERSED')),
  released_at timestamptz,
  reversal_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.working_day_calendars (
  id bigserial primary key,
  holiday_date date not null unique,
  holiday_name text not null,
  country_code text,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.notifications add column if not exists event_type text;
alter table public.notifications add column if not exists priority text default 'NORMAL';
alter table public.notifications add column if not exists is_seen boolean default false;
alter table public.notifications add column if not exists seen_at timestamptz;
alter table public.notifications add column if not exists expires_at timestamptz;

create table if not exists public.payment_gateways (
  code text primary key,
  name text not null,
  enabled boolean not null default true,
  deposit_enabled boolean not null default true,
  withdrawal_enabled boolean not null default false,
  currency text default 'USD',
  network text,
  account_identifier text,
  qr_code_url text,
  instructions text,
  fee_percent numeric default 0,
  min_amount numeric default 0,
  max_amount numeric,
  sort_order integer default 1,
  updated_at timestamptz default now()
);
alter table public.payment_gateways add column if not exists deposit_enabled boolean default true;
alter table public.payment_gateways add column if not exists withdrawal_enabled boolean default false;
alter table public.payment_gateways add column if not exists withdrawal_fields jsonb default '{}'::jsonb;
alter table public.payment_gateways add column if not exists maintenance_message text;

create index if not exists user_withdrawal_locks_user_status_idx on public.user_withdrawal_locks(user_id,status);
create index if not exists user_withdrawal_locks_unlock_date_idx on public.user_withdrawal_locks(unlock_date,status);
create index if not exists referral_commission_locks_referrer_status_idx on public.referral_commission_locks(referrer_id,status);
create index if not exists referral_commission_locks_unlock_date_idx on public.referral_commission_locks(unlock_date,status);
alter table public.withdrawals add column if not exists user_id text;
alter table public.withdrawals add column if not exists updated_at timestamptz default now();
alter table public.withdrawals add column if not exists rejection_reason text;
alter table public.withdrawals add column if not exists payout_reference text;
alter table public.withdrawals add column if not exists closed_at timestamptz;
alter table public.withdrawals add column if not exists closed_by uuid;
create index if not exists withdrawals_user_status_idx on public.withdrawals(user_id,status,date_created desc);

create table if not exists public.payment_gateway_transactions (
  id bigserial primary key,
  user_id text not null,
  gateway_code text,
  amount numeric not null,
  currency text default 'USD',
  transaction_reference text not null,
  status text not null default 'Pending',
  admin_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.investment_orders (
  id bigserial primary key,
  user_id text not null,
  plan_id text not null,
  gateway_code text,
  amount numeric not null,
  currency text default 'USD',
  payment_transaction_id bigint references public.payment_gateway_transactions(id),
  status text not null default 'Pending',
  admin_note text,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.financial_ledger (
  id bigserial primary key,
  user_id text not null,
  event_type text not null,
  amount numeric not null default 0,
  currency text default 'USD',
  balance_before numeric default 0,
  balance_after numeric default 0,
  locked_before numeric default 0,
  locked_after numeric default 0,
  reference_id text,
  reason text,
  created_by uuid,
  created_at timestamptz not null default now()
);

alter table public.payment_gateway_transactions add column if not exists admin_note text;
alter table public.payment_gateway_transactions add column if not exists reviewed_at timestamptz;
alter table public.investment_orders add column if not exists admin_note text;
alter table public.investment_orders add column if not exists approved_at timestamptz;
create index if not exists investment_orders_user_status_idx on public.investment_orders(user_id,status,created_at desc);
create index if not exists payment_gateway_transactions_user_status_idx on public.payment_gateway_transactions(user_id,status,created_at desc);
create index if not exists financial_ledger_user_created_idx on public.financial_ledger(user_id,created_at desc);

create index if not exists notifications_recipient_seen_idx on public.notifications(recipient_type,recipient_id,is_seen,created_at desc);

create or replace function public.is_working_day(check_date date)
returns boolean language sql stable as $$
  select extract(isodow from check_date) between 1 and 5
    and not exists (select 1 from public.working_day_calendars h where h.holiday_date = check_date and h.enabled = true);
$$;

create or replace function public.add_working_days(start_date date, number_of_days integer)
returns date language plpgsql stable as $$
declare current_date_value date := start_date; counted integer := 0;
begin
  if number_of_days <= 0 then return start_date; end if;
  while counted < number_of_days loop
    current_date_value := current_date_value + 1;
    if public.is_working_day(current_date_value) then counted := counted + 1; end if;
  end loop;
  return current_date_value;
end;
drop policy if exists "Public all withdrawals" on public.withdrawals;
alter table public.payment_gateway_transactions enable row level security;
alter table public.investment_orders enable row level security;
alter table public.financial_ledger enable row level security;
drop policy if exists "Users can view own deposit orders" on public.investment_orders;
create policy "Users can view own deposit orders" on public.investment_orders
  for select to authenticated using (user_id = (select id from public.profiles where auth_user_id = auth.uid()));
drop policy if exists "Admins can view all deposit orders" on public.investment_orders;
create policy "Admins can view all deposit orders" on public.investment_orders
  for select to authenticated using ((select private.is_admin()));
drop policy if exists "Users can view own payment proofs" on public.payment_gateway_transactions;
create policy "Users can view own payment proofs" on public.payment_gateway_transactions
  for select to authenticated using (user_id = (select id from public.profiles where auth_user_id = auth.uid()));
drop policy if exists "Admins can view all payment proofs" on public.payment_gateway_transactions;
create policy "Admins can view all payment proofs" on public.payment_gateway_transactions
  for select to authenticated using ((select private.is_admin()));

$$;

create or replace function public.count_working_days(start_date date, end_date date)
returns integer language sql stable as $$
  select count(*)::integer from generate_series(start_date + 1, end_date, interval '1 day') d(day)
  where public.is_working_day(d.day::date);
$$;

create or replace function public.get_withdrawal_eligibility(target_user_id text)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare result jsonb; first_lock record; referral_total numeric;
begin
alter table public.withdrawals enable row level security;
drop policy if exists "Users can view own withdrawals" on public.withdrawals;
create policy "Users can view own withdrawals" on public.withdrawals
  for select to authenticated using (user_id = (select id from public.profiles where auth_user_id = auth.uid()));
drop policy if exists "Admins can view all withdrawals" on public.withdrawals;
create policy "Admins can view all withdrawals" on public.withdrawals
  for select to authenticated using ((select private.is_admin()));
drop policy if exists "Users can view own ledger" on public.financial_ledger;
create policy "Users can view own ledger" on public.financial_ledger
  for select to authenticated using (user_id = (select id from public.profiles where auth_user_id = auth.uid()));
drop policy if exists "Admins can view all ledger" on public.financial_ledger;
create policy "Admins can view all ledger" on public.financial_ledger
  for select to authenticated using ((select private.is_admin()));
  if not exists (select 1 from public.profiles p where p.id = target_user_id and p.auth_user_id = auth.uid()) and not (select private.is_admin()) then
    raise exception 'Not authorized to view this user eligibility';
  end if;
  select * into first_lock from public.user_withdrawal_locks
    where user_id = target_user_id and lock_type = 'FIRST_DEPOSIT' and status in ('ACTIVE','ELIGIBLE','MANUAL_HOLD','RISK_HOLD')
    order by created_at asc limit 1;
  select coalesce(sum(commission_amount),0) into referral_total from public.referral_commission_locks
    where referrer_id = target_user_id and status in ('PENDING','LOCKED');
  result := jsonb_build_object(
    'user_id', target_user_id,
    'deposit_lock_until', first_lock.unlock_date,
    'deposit_lock_active', first_lock.id is not null and (first_lock.unlock_date is null or current_date < first_lock.unlock_date),
    'locked_deposit', coalesce(first_lock.principal_amount,0),
    'locked_profit', coalesce(first_lock.profit_amount,0),
    'locked_referral_commission', referral_total,
    'referral_lock_active', referral_total > 0,
    'working_days_completed', coalesce(first_lock.working_days_completed,0),
    'working_days_required', coalesce(first_lock.lock_days,30)
  );
  return result;
end;
$$;

create or replace function public.refresh_working_day_lock_counters()
returns integer language plpgsql security definer set search_path = public as $$
declare changed integer;
begin
  update public.user_withdrawal_locks l
  set working_days_completed = public.count_working_days(l.lock_start_date, current_date),
      status = case when l.status = 'ACTIVE' and l.unlock_date is not null and current_date >= l.unlock_date then 'ELIGIBLE' else l.status end,
      updated_at = now()
  where l.status in ('ACTIVE','ELIGIBLE');
  get diagnostics changed = row_count;
  update public.referral_commission_locks l
  set status = case when l.status in ('PENDING','LOCKED') and l.unlock_date is not null and current_date >= l.unlock_date then 'ELIGIBLE' else l.status end,
      updated_at = now()
  where l.status in ('PENDING','LOCKED');
  return changed;
end;
$$;

alter table public.user_withdrawal_locks enable row level security;
alter table public.referral_commission_locks enable row level security;
alter table public.working_day_calendars enable row level security;

drop policy if exists "Users can view own withdrawal locks" on public.user_withdrawal_locks;
create policy "Users can view own withdrawal locks" on public.user_withdrawal_locks
  for select to authenticated using (user_id = (select id from public.profiles where auth_user_id = auth.uid()));
drop policy if exists "Admins can view all withdrawal locks" on public.user_withdrawal_locks;
create policy "Admins can view all withdrawal locks" on public.user_withdrawal_locks
  for select to authenticated using ((select private.is_admin()));
drop policy if exists "Users can view own referral locks" on public.referral_commission_locks;
create policy "Users can view own referral locks" on public.referral_commission_locks
  for select to authenticated using (referrer_id = (select id from public.profiles where auth_user_id = auth.uid()));
drop policy if exists "Admins can view all referral locks" on public.referral_commission_locks;
create policy "Admins can view all referral locks" on public.referral_commission_locks
  for select to authenticated using ((select private.is_admin()));
drop policy if exists "Public can view enabled working holidays" on public.working_day_calendars;
create policy "Public can view enabled working holidays" on public.working_day_calendars
  for select using (enabled = true);

create or replace function public.admin_create_manual_lock(
  target_user_id text,
  target_lock_type text,
  target_amount numeric,
  target_days integer,
  target_reason text
)
returns public.user_withdrawal_locks
language plpgsql security definer set search_path = public as $$
declare created_lock public.user_withdrawal_locks;
begin
  if not (select private.is_admin()) then raise exception 'Only an administrator can create a lock'; end if;
  if target_amount <= 0 or target_days < 0 or length(trim(coalesce(target_reason,''))) < 3 then raise exception 'Amount, days and reason are required'; end if;
  insert into public.user_withdrawal_locks (user_id, lock_type, principal_amount, lock_days, unlock_date, status, hold_reason)
  values (target_user_id, target_lock_type, target_amount, target_days, public.add_working_days(current_date, target_days), 'MANUAL_HOLD', trim(target_reason))
  returning * into created_lock;
  insert into public.admin_audit_logs (admin_email, action_type, details)
  select coalesce(u.email,'admin'), 'CREATE_MANUAL_LOCK', jsonb_build_object('user_id',target_user_id,'lock_id',created_lock.id,'amount',target_amount,'reason',target_reason)::text
  from auth.users u where u.id = auth.uid();
  return created_lock;
end;
$$;

create or replace function public.admin_release_lock(target_lock_id bigint, release_reason text)
returns public.user_withdrawal_locks
language plpgsql security definer set search_path = public as $$
declare released_lock public.user_withdrawal_locks;
begin
  if not (select private.is_admin()) then raise exception 'Only an administrator can release a lock'; end if;
  if length(trim(coalesce(release_reason,''))) < 3 then raise exception 'A release reason is required'; end if;
  update public.user_withdrawal_locks set status = 'RELEASED', released_at = now(), hold_reason = trim(release_reason), updated_at = now()
  where id = target_lock_id and status in ('ACTIVE','ELIGIBLE','MANUAL_HOLD','RISK_HOLD') returning * into released_lock;
  if released_lock.id is null then raise exception 'Lock not found or already released'; end if;
  insert into public.admin_audit_logs (admin_email, action_type, details)
  select coalesce(u.email,'admin'), 'RELEASE_LOCK', jsonb_build_object('lock_id',target_lock_id,'user_id',released_lock.user_id,'reason',release_reason)::text
  from auth.users u where u.id = auth.uid();
  return released_lock;
end;
$$;

create or replace function public.admin_approve_investment_order(target_order_id bigint, review_note text default null)
returns public.investment_orders
language plpgsql security definer set search_path = public as $$
declare approved_order public.investment_orders; first_lock_exists boolean; lock_days integer;
begin
  if not (select private.is_admin()) then raise exception 'Only an administrator can approve an investment order'; end if;
  update public.investment_orders
  set status = 'Approved', approved_at = coalesce(approved_at, now()), admin_note = nullif(trim(coalesce(review_note,'')),'')
  where id = target_order_id and status in ('Pending','UNDER_REVIEW')
  returning * into approved_order;
  if approved_order.id is null then raise exception 'Investment order not found or already processed'; end if;

  select exists(select 1 from public.user_withdrawal_locks where user_id = approved_order.user_id and lock_type = 'FIRST_DEPOSIT') into first_lock_exists;
  select coalesce(deposit_lock_working_days,30) into lock_days from public.system_settings where id = 'global_config';
  if not first_lock_exists then
    insert into public.user_withdrawal_locks (user_id, lock_type, source_id, principal_amount, approved_at, lock_start_date, lock_days, unlock_date)
    values (approved_order.user_id, 'FIRST_DEPOSIT', approved_order.id::text, approved_order.amount, approved_order.approved_at, approved_order.approved_at::date, coalesce(lock_days,30), public.add_working_days(approved_order.approved_at::date, coalesce(lock_days,30)));
    update public.profiles set first_deposit_approved_at = approved_order.approved_at, deposit_unlock_at = public.add_working_days(approved_order.approved_at::date, coalesce(lock_days,30)), locked_deposit = coalesce(locked_deposit,0) + approved_order.amount where id = approved_order.user_id;
  end if;
  update public.payment_gateway_transactions set status = 'Approved', reviewed_at = now(), admin_note = nullif(trim(coalesce(review_note,'')),'') where id = approved_order.payment_transaction_id;
  insert into public.financial_ledger (user_id,event_type,amount,currency,locked_after,reference_id,reason,created_by)
  values (approved_order.user_id,'DEPOSIT_LOCKED',approved_order.amount,approved_order.currency,approved_order.amount,approved_order.id::text,'First approved deposit; 30 working-day lock',auth.uid());
  return approved_order;
end;
$$;

create or replace function public.validate_withdrawal_eligibility(target_user_id text, requested_amount numeric)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare summary jsonb; profile_row record; available numeric;
begin
  if not exists (select 1 from public.profiles p where p.id = target_user_id and p.auth_user_id = auth.uid()) and not (select private.is_admin()) then
    return jsonb_build_object('allowed',false,'reason','Not authorized');
  end if;
  if requested_amount <= 0 then return jsonb_build_object('allowed',false,'reason','Withdrawal amount must be greater than zero'); end if;
  select * into profile_row from public.profiles where id = target_user_id;
  if profile_row.id is null then return jsonb_build_object('allowed',false,'reason','User profile not found'); end if;
  summary := public.get_withdrawal_eligibility(target_user_id);
  available := coalesce(profile_row.withdrawable_balance, profile_row.balance, 0);
  if coalesce((summary->>'deposit_lock_active')::boolean,false) then return summary || jsonb_build_object('allowed',false,'reason','Principal and profit are locked until the working-day lock expires'); end if;
  if coalesce((summary->>'referral_lock_active')::boolean,false) then return summary || jsonb_build_object('allowed',false,'reason','Referral commission is still inside its working-day lock'); end if;
  if requested_amount > available then return summary || jsonb_build_object('allowed',false,'reason','Requested amount exceeds withdrawable balance','withdrawable_balance',available); end if;
  return summary || jsonb_build_object('allowed',true,'reason','Withdrawal is eligible','withdrawable_balance',available);
end;
create or replace function public.create_referral_commission_lock(
  target_referrer_id text,
  target_referred_user_id text,
  target_amount numeric,
  target_referral_id text default null
)
returns public.referral_commission_locks
language plpgsql security definer set search_path = public as $$
declare referral_days integer; lock_row public.referral_commission_locks;
begin
  if target_referrer_id = target_referred_user_id or target_amount <= 0 then return null; end if;
  if exists (select 1 from public.referral_commission_locks where referred_user_id = target_referred_user_id and referrer_id = target_referrer_id and status <> 'REVERSED') then return null; end if;
  select coalesce(referral_lock_working_days,45) into referral_days from public.system_settings where id = 'global_config';
  insert into public.referral_commission_locks (referrer_id,referred_user_id,referral_id,commission_amount,lock_days,unlock_date)
  values (target_referrer_id,target_referred_user_id,target_referral_id,target_amount,coalesce(referral_days,45),public.add_working_days(current_date,coalesce(referral_days,45)))
  returning * into lock_row;
  return lock_row;
end;
$$;

$$;
create or replace function public.submit_withdrawal(
  target_user_id text,
  target_amount numeric,
  target_gateway_code text,
  target_account text
)
returns public.withdrawals
language plpgsql security definer set search_path = public as $$
declare profile_row record; eligibility jsonb; created_withdrawal public.withdrawals; gateway_row record; hold_count integer;
begin
  if not exists (select 1 from public.profiles p where p.id = target_user_id and p.auth_user_id = auth.uid()) then raise exception 'Not authorized'; end if;
  if target_amount <= 0 or length(trim(coalesce(target_account,''))) < 2 then raise exception 'Amount and account are required'; end if;
  select * into gateway_row from public.payment_gateways where code = target_gateway_code and enabled = true and withdrawal_enabled = true;
  if gateway_row.id is null then raise exception 'Selected withdrawal gateway is not available'; end if;
  select * into profile_row from public.profiles where id = target_user_id for update;
  if profile_row.status <> 'Active' then raise exception 'Account is not active'; end if;
  select count(*) into hold_count from public.user_withdrawal_locks where user_id = target_user_id and status in ('RISK_HOLD','MANUAL_HOLD');
  eligibility := public.validate_withdrawal_eligibility(target_user_id,target_amount);
  if not coalesce((eligibility->>'allowed')::boolean,false) then raise exception '%',coalesce(eligibility->>'reason','Withdrawal is not eligible'); end if;
  if exists (select 1 from public.withdrawals where user_id = target_user_id and status = 'Pending') then raise exception 'A pending withdrawal already exists'; end if;
  insert into public.withdrawals (user_id,user_name,user_email,amount,method,account,tx_id,status)
  values (target_user_id,profile_row.name,profile_row.email,target_amount,gateway_row.name,target_account,'WD-'||floor(random()*900000+100000)::text,'Pending')
  returning * into created_withdrawal;
  update public.profiles set withdrawable_balance = coalesce(withdrawable_balance,balance,0) - target_amount where id = target_user_id;
  insert into public.financial_ledger (user_id,event_type,amount,currency,reference_id,reason,created_by)
  values (target_user_id,'WITHDRAWAL_REQUESTED',target_amount,gateway_row.currency,created_withdrawal.id::text,'Withdrawal request pending admin approval',auth.uid());
  insert into public.notifications (recipient_id,recipient_type,category,event_type,title,message,related_id,related_type)
  values (target_user_id,'USER','WITHDRAWAL','WITHDRAWAL_SUBMITTED','Withdrawal Requested',target_amount::text||' '||gateway_row.currency||' withdrawal is pending admin review.',created_withdrawal.id::text,'WITHDRAWAL');
  return created_withdrawal;
end;
$$;


create or replace function public.admin_review_withdrawal(target_withdrawal_id bigint, decision text, review_reason text default null, payout_reference text default null)
returns public.withdrawals
language plpgsql security definer set search_path = public as $$
declare withdrawal_row public.withdrawals;
begin
  if not (select private.is_admin()) then raise exception 'Only an administrator can review withdrawals'; end if;
  if upper(coalesce(decision,'')) not in ('APPROVED','REJECTED','PAID','HOLD') then raise exception 'Invalid withdrawal decision'; end if;
  update public.withdrawals set status = case when upper(decision)='APPROVED' then 'Approved' when upper(decision)='REJECTED' then 'Rejected' when upper(decision)='PAID' then 'Approved' else 'Pending' end, updated_at = now()
  where id = target_withdrawal_id and status = 'Pending' returning * into withdrawal_row;
  if withdrawal_row.id is null then raise exception 'Withdrawal not found or already processed'; end if;
  if upper(decision)='REJECTED' then
    update public.profiles set withdrawable_balance = coalesce(withdrawable_balance,0) + withdrawal_row.amount where id = withdrawal_row.user_id;
    insert into public.financial_ledger (user_id,event_type,amount,currency,reference_id,reason,created_by) values (withdrawal_row.user_id,'WITHDRAWAL_REJECTED',withdrawal_row.amount,withdrawal_row.currency,withdrawal_row.id::text,coalesce(review_reason,'Rejected by admin'),auth.uid());
    update public.withdrawals set rejection_reason = review_reason, closed_at = now(), closed_by = auth.uid() where id = withdrawal_row.id returning * into withdrawal_row;
  elsif upper(decision)='PAID' then
    insert into public.financial_ledger (user_id,event_type,amount,currency,reference_id,reason,created_by) values (withdrawal_row.user_id,'WITHDRAWAL_PAID',withdrawal_row.amount,withdrawal_row.currency,coalesce(payout_reference,withdrawal_row.tx_id),'Paid by admin',auth.uid());
    update public.withdrawals set payout_reference = coalesce(payout_reference,withdrawal_row.tx_id), closed_at = now(), closed_by = auth.uid() where id = withdrawal_row.id returning * into withdrawal_row;
  else
    insert into public.financial_ledger (user_id,event_type,amount,currency,reference_id,reason,created_by) values (withdrawal_row.user_id,'WITHDRAWAL_APPROVED',withdrawal_row.amount,withdrawal_row.currency,withdrawal_row.id::text,coalesce(review_reason,'Approved by admin'),auth.uid());
  end if;
  insert into public.notifications (recipient_id,recipient_type,category,event_type,title,message,related_id,related_type)
  values (withdrawal_row.user_id,'USER','WITHDRAWAL','WITHDRAWAL_UPDATED','Withdrawal '+upper(decision),coalesce(review_reason,'Admin reviewed your withdrawal request.'),withdrawal_row.id::text,'WITHDRAWAL');
  return withdrawal_row;
end;
$$;
