-- ============================================================
-- SR Investment: Clean Initial Financial Balances to 0 for Users
-- ============================================================

-- Ensure default column constraints default to 0
alter table public.profiles alter column invested set default 0;
alter table public.profiles alter column profit set default 0;
alter table public.profiles alter column referral_earned set default 0;
alter table public.profiles alter column balance set default 0;
alter table public.profiles alter column active_capital set default 0;
alter table public.profiles alter column today_profit set default 0;
alter table public.profiles alter column total_profit set default 0;
alter table public.profiles alter column locked_deposit set default 0;
alter table public.profiles alter column locked_profit set default 0;
alter table public.profiles alter column withdrawable_balance set default 0;

-- Reset seeded test accounts so all initial metrics start at 0
update public.profiles
set
  invested = 0,
  balance = 0,
  profit = 0,
  referral_earned = 0,
  active_capital = 0,
  today_profit = 0,
  total_profit = 0,
  locked_deposit = 0,
  locked_profit = 0,
  withdrawable_balance = 0
where email in ('trader@srinvestment.com', 'tanvir@gmail.com', 'sharmin@yahoo.com');
