-- ============================================================
-- SR Investment: Clean Initial Financial Balances to 0 for Users
-- ============================================================

-- Ensure total_deposited and active_investment columns exist and default to 0
alter table public.profiles add column if not exists total_deposited numeric default 0;
alter table public.profiles add column if not exists active_investment numeric default 0;

-- Ensure default column constraints default to 0
alter table public.profiles alter column invested set default 0;
alter table public.profiles alter column active_investment set default 0;
alter table public.profiles alter column monthly_profit set default 0;
alter table public.profiles alter column monthly_profit_pct set default 0;
alter table public.profiles alter column profit set default 0;
alter table public.profiles alter column referral_earned set default 0;
alter table public.profiles alter column balance set default 0;
alter table public.profiles alter column active_capital set default 0;
alter table public.profiles alter column today_profit set default 0;
alter table public.profiles alter column total_profit set default 0;
alter table public.profiles alter column locked_balance set default 0;
alter table public.profiles alter column locked_deposit set default 0;
alter table public.profiles alter column locked_profit set default 0;
alter table public.profiles alter column withdrawable_balance set default 0;
alter table public.profiles alter column total_deposited set default 0;
alter table public.profiles alter column total_referrals set default 0;
alter table public.profiles alter column team_members set default 0;
alter table public.profiles alter column active_referrals set default 0;
alter table public.profiles alter column available_commission set default 0;
alter table public.profiles alter column pending_commission set default 0;

-- Reset all non-admin accounts so full account balance and metrics start strictly at 0
update public.profiles
set
  invested = 0,
  active_investment = 0,
  monthly_profit = 0,
  monthly_profit_pct = 0,
  balance = 0,
  profit = 0,
  referral_earned = 0,
  active_capital = 0,
  today_profit = 0,
  total_profit = 0,
  locked_balance = 0,
  locked_deposit = 0,
  locked_profit = 0,
  withdrawable_balance = 0,
  total_deposited = 0,
  total_referrals = 0,
  team_members = 0,
  active_referrals = 0,
  available_commission = 0,
  pending_commission = 0
where coalesce(role, 'user') <> 'admin';


