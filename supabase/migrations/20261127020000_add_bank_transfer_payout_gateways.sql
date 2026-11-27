-- ============================================================
-- SR Investment: Ensure All Payout Gateways (Bank Transfer, Touch 'n Go, USDT TRC-20, etc.)
-- ============================================================

insert into public.payment_gateways (code, name, enabled, deposit_enabled, withdrawal_enabled, currency, network, account_identifier, instructions, sort_order)
values 
  ('usdt_trc20', 'USDT (TRC-20)', true, true, true, 'USDT', 'TRON (TRC20)', 'TX998231USDTTRC20WALLET', 'Send or withdraw USDT via TRON network only.', 1),
  ('binance_pay', 'Binance Pay', true, true, true, 'USDT', 'Binance', 'binance@srinvestment.com', 'Pay or withdraw using Binance Pay ID or QR.', 2),
  ('bank_transfer', 'Bank Transfer (Local & Wire)', true, true, true, 'USD', 'Bank Wire / Local Bank', 'SR Investment Capital Limited (Routing: 090271822)', 'Withdraw directly to any local or international bank account.', 3),
  ('touchngo', 'Touch n Go', true, true, true, 'MYR', 'Wallet', '0120000000', 'Pay or withdraw via Touch n Go eWallet.', 4),
  ('bkash', 'bKash (BD)', true, true, true, 'BDT', 'Mobile Banking', '01700000000', 'Send or withdraw money via bKash Personal/Merchant.', 5),
  ('nagad', 'Nagad (BD)', true, true, true, 'BDT', 'Mobile Banking', '01800000000', 'Send or withdraw money via Nagad Personal.', 6),
  ('rocket', 'Rocket (BD)', true, true, true, 'BDT', 'Mobile Banking', '01900000000', 'Send or withdraw money via DBBL Rocket.', 7)
on conflict (code) do update
set name = excluded.name,
    enabled = true,
    withdrawal_enabled = true,
    currency = excluded.currency,
    network = excluded.network,
    account_identifier = excluded.account_identifier;

-- Reload PostgREST schema cache
notify pgrst, 'reload schema';
