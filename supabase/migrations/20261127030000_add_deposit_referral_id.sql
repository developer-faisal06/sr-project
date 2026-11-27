-- ============================================================
-- SR Investment: Add optional referral_id to investment_orders and payment_gateway_transactions
-- ============================================================

alter table public.investment_orders add column if not exists referral_id text;
alter table public.payment_gateway_transactions add column if not exists referral_id text;
