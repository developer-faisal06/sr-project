-- ============================================================
-- SR Investment: Public INSERT access for payment_gateway_transactions & investment_orders
-- ============================================================

drop policy if exists "Users can insert own payment proofs" on public.payment_gateway_transactions;
drop policy if exists "Public insert payment proofs" on public.payment_gateway_transactions;
create policy "Public insert payment proofs" on public.payment_gateway_transactions
  for insert to public
  with check (true);

drop policy if exists "Users can insert own investment orders" on public.investment_orders;
drop policy if exists "Public insert investment orders" on public.investment_orders;
create policy "Public insert investment orders" on public.investment_orders
  for insert to public
  with check (true);

drop policy if exists "Service insert ledger" on public.financial_ledger;
drop policy if exists "Public insert ledger" on public.financial_ledger;
create policy "Public insert ledger" on public.financial_ledger
  for insert to public
  with check (true);

