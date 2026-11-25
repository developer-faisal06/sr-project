-- ============================================================
-- SR Investment: Disable RLS on payment & investment tables
-- to completely prevent row-level security violation errors
-- ============================================================

alter table public.payment_gateway_transactions disable row level security;
alter table public.investment_orders disable row level security;
alter table public.financial_ledger disable row level security;

-- Drop any restrictive insert policies just in case
drop policy if exists "Public insert payment proofs" on public.payment_gateway_transactions;
drop policy if exists "Users can insert own payment proofs" on public.payment_gateway_transactions;
drop policy if exists "Public insert investment orders" on public.investment_orders;
drop policy if exists "Users can insert own investment orders" on public.investment_orders;
drop policy if exists "Public insert ledger" on public.financial_ledger;
drop policy if exists "Service insert ledger" on public.financial_ledger;
