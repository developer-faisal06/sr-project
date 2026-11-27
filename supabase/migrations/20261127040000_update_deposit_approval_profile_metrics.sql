-- ============================================================
-- SR Investment: Update admin_approve_investment_order to increment total_deposited and invested
-- ============================================================

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

  -- 1. Always increment user's total_deposited, active_capital, and invested upon deposit approval
  update public.profiles
  set total_deposited = coalesce(total_deposited, 0) + approved_order.amount,
      invested = coalesce(invested, 0) + approved_order.amount,
      active_capital = coalesce(active_capital, 0) + approved_order.amount
  where id = approved_order.user_id;

  -- 2. First deposit lock handling
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
