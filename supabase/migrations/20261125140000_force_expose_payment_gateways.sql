-- ============================================================
-- SR Investment: Force Create and Expose payment_gateways to PostgREST
-- ============================================================

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

-- Ensure RLS is enabled and fully open for public read/write
alter table public.payment_gateways enable row level security;

drop policy if exists "Public all payment gateways" on public.payment_gateways;
create policy "Public all payment gateways" on public.payment_gateways
  for all using (true) with check (true);

-- Grant privileges explicitly to anon and authenticated roles (crucial for live Data API access)
grant select, insert, update, delete on public.payment_gateways to anon, authenticated;
grant usage on schema public to anon, authenticated;

-- Seed default payment gateways
insert into public.payment_gateways (code, name, enabled, deposit_enabled, withdrawal_enabled, currency, network, account_identifier, instructions, sort_order)
values 
  ('usdt_trc20', 'USDT (TRC-20)', true, true, true, 'USDT', 'TRON', 'TX998231USDTTRC20WALLET', 'Send USDT via TRON network only.', 1),
  ('binance_pay', 'Binance Pay', true, true, true, 'USDT', 'TRC20', 'binance@srinvestment.com', 'Pay using Binance Pay ID or QR.', 2),
  ('bkash', 'bKash (BD)', true, true, true, 'BDT', 'Mobile Banking', '01700000000', 'Send money via bKash Personal/Merchant.', 3),
  ('nagad', 'Nagad (BD)', true, true, true, 'BDT', 'Mobile Banking', '01800000000', 'Send money via Nagad Personal.', 4),
  ('touchngo', 'Touch n Go', true, true, true, 'MYR', 'Wallet', '0120000000', 'Pay via Touch n Go eWallet.', 5)
on conflict (code) do update
set name = excluded.name,
    enabled = excluded.enabled,
    deposit_enabled = excluded.deposit_enabled,
    withdrawal_enabled = excluded.withdrawal_enabled,
    currency = excluded.currency,
    network = excluded.network,
    account_identifier = excluded.account_identifier;

-- Force PostgREST schema cache reload
notify pgrst, 'reload schema';
