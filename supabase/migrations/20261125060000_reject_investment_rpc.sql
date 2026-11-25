-- ============================================================
-- SR Investment: Admin Reject Investment Order RPC & Notifications
-- ============================================================

create or replace function public.admin_reject_investment_order(target_order_id bigint, review_note text default null)
returns public.investment_orders
language plpgsql security definer set search_path = public as $$
declare
  order_row public.investment_orders;
  proof_row public.payment_gateway_transactions;
begin
  if not (select private.is_admin()) then
    raise exception 'Only an administrator can reject an investment order';
  end if;

  update public.investment_orders
  set status = 'Rejected',
      admin_note = nullif(trim(coalesce(review_note,'')), '')
  where id = target_order_id and status in ('Pending','UNDER_REVIEW')
  returning * into order_row;

  if order_row.id is null then
    raise exception 'Order not found or already processed';
  end if;

  -- Also update corresponding payment proof if exists
  if order_row.payment_transaction_id is not null then
    update public.payment_gateway_transactions
    set status = 'Rejected',
        reviewed_at = now(),
        admin_note = nullif(trim(coalesce(review_note,'')), '')
    where id = order_row.payment_transaction_id;
  end if;

  -- Insert notification for user
  insert into public.notifications (recipient_id, recipient_type, category, event_type, title, message, related_id, related_type)
  values (
    order_row.user_id,
    'USER',
    'DEPOSIT',
    'INVESTMENT_REJECTED',
    'Deposit Rejected',
    'Your deposit order for ' || order_row.amount || ' ' || order_row.currency || ' was rejected. Reason: ' || coalesce(review_note, 'Admin verification failed.'),
    order_row.id::text,
    'INVESTMENT'
  );

  return order_row;
end;
$$;

revoke all on function public.admin_reject_investment_order from public;
grant execute on function public.admin_reject_investment_order to authenticated;
