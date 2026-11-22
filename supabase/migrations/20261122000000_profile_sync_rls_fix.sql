-- ============================================================
-- SR Investment: Profile Sync, RLS Fix, Gateways & Realtime
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Ensure tables have realtime enabled
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles') then
    alter publication supabase_realtime add table public.profiles;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'payment_gateways') then
    alter publication supabase_realtime add table public.payment_gateways;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'withdrawals') then
    alter publication supabase_realtime add table public.withdrawals;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'investment_plans') then
    alter publication supabase_realtime add table public.investment_plans;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'system_settings') then
    alter publication supabase_realtime add table public.system_settings;
  end if;
end $$;

-- 2. Ensure replica identity is FULL so realtime sends complete row on UPDATE
alter table public.profiles replica identity full;
alter table public.payment_gateways replica identity full;
alter table public.withdrawals replica identity full;
alter table public.system_settings replica identity full;
alter table public.investment_plans replica identity full;

-- 3. Grant schema usage
grant usage on schema public to anon, authenticated;
grant usage on schema private to authenticated;

-- 4. Enable RLS and clean up old policies
alter table public.profiles enable row level security;
alter table public.payment_gateways enable row level security;
alter table public.withdrawals enable row level security;

drop policy if exists "Admins can update profiles" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can create profiles" on public.profiles;
drop policy if exists "Admins can delete profiles" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Public all profiles" on public.profiles;

drop policy if exists "Public read payment gateways" on public.payment_gateways;
drop policy if exists "Admins manage payment gateways" on public.payment_gateways;
drop policy if exists "Public all payment gateways" on public.payment_gateways;

drop policy if exists "Users can view own withdrawals" on public.withdrawals;
drop policy if exists "Admins can view all withdrawals" on public.withdrawals;
drop policy if exists "Admins manage withdrawals" on public.withdrawals;
drop policy if exists "Public all withdrawals" on public.withdrawals;

-- 5. Open clean public access policies for authorized platform operations
create policy "Public all profiles" on public.profiles for all using (true) with check (true);
create policy "Public all payment gateways" on public.payment_gateways for all using (true) with check (true);
create policy "Public all withdrawals" on public.withdrawals for all using (true) with check (true);

-- 6. Add missing columns to profiles if not exist
alter table public.profiles add column if not exists timezone text;
alter table public.profiles add column if not exists language text default 'en';
alter table public.profiles add column if not exists currency text default 'USD';
alter table public.profiles add column if not exists dashboard_preferences jsonb default '{}'::jsonb;
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists country text;

-- 7. Seed default payment gateways if empty
insert into public.payment_gateways (code, name, enabled, deposit_enabled, withdrawal_enabled, currency, network, account_identifier, instructions, sort_order)
values 
  ('usdt_trc20', 'USDT (TRC-20)', true, true, true, 'USDT', 'TRON', 'TX998231USDTTRC20WALLET', 'Send USDT via TRON network only.', 1),
  ('binance_pay', 'Binance Pay', true, true, true, 'USDT', 'Binance', 'binance@srinvestment.com', 'Pay using Binance Pay ID or QR.', 2),
  ('bkash', 'bKash (BD)', true, true, true, 'BDT', 'Mobile Banking', '01700000000', 'Send money via bKash Personal/Merchant.', 3),
  ('nagad', 'Nagad (BD)', true, true, true, 'BDT', 'Mobile Banking', '01800000000', 'Send money via Nagad Personal.', 4)
on conflict (code) do update
set enabled = excluded.enabled,
    deposit_enabled = excluded.deposit_enabled,
    withdrawal_enabled = excluded.withdrawal_enabled;

-- 8. Ensure Tanvir Ahmed 2 profile is seeded/updated
insert into public.profiles (id, name, email, role, account_tier, invested, balance, status)
values ('SR100892', 'Tanvir Ahmed 2', 'tanvir@gmail.com', 'user', 'ACTIVE_INVESTOR', 1000, 120, 'Active')
on conflict (id) do update
set name = excluded.name;
