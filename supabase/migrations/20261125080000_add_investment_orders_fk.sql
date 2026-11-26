-- ============================================================
-- SR Investment: Add explicit Foreign Key relationship between
-- investment_orders and payment_gateway_transactions for PostgREST
-- ============================================================

do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where constraint_schema = 'public'
      and table_name = 'investment_orders'
      and constraint_type = 'FOREIGN KEY'
      and constraint_name = 'investment_orders_payment_transaction_id_fkey'
  ) then
    -- Clean up any orphaned references first
    update public.investment_orders
    set payment_transaction_id = null
    where payment_transaction_id is not null
      and not exists (
        select 1 from public.payment_gateway_transactions
        where id = public.investment_orders.payment_transaction_id
      );

    alter table public.investment_orders
      add constraint investment_orders_payment_transaction_id_fkey
      foreign key (payment_transaction_id)
      references public.payment_gateway_transactions(id)
      on delete set null;
  end if;
end $$;
