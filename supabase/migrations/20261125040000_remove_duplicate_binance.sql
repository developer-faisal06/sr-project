-- ============================================================
-- SR Investment: Remove duplicate binance gateway & refine binance_pay
-- ============================================================

-- 1. If any orders/proofs reference 'binance', migrate them to 'binance_pay'
update public.investment_orders set gateway_code = 'binance_pay' where gateway_code = 'binance';
update public.payment_gateway_transactions set gateway_code = 'binance_pay' where gateway_code = 'binance';
update public.withdrawals set method = 'Binance Pay' where lower(method) in ('binance', 'binance pay');

-- 2. Delete the duplicate 'binance' row
delete from public.payment_gateways where code = 'binance';

-- 3. Update binance_pay with proper currency, network, and default settings
update public.payment_gateways
set name = 'Binance Pay',
    currency = 'USDT',
    network = 'TRC20',
    enabled = true,
    deposit_enabled = true,
    withdrawal_enabled = true
where code = 'binance_pay';
