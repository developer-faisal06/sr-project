-- ==========================================================
-- SR INVESTMENT — 26-TABLE ULTIMATE ENTERPRISE SUPABASE SCHEMA
-- ==========================================================

-- 1. System Settings Table
CREATE TABLE IF NOT EXISTS public.system_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_config',
  notice_text TEXT DEFAULT 'Demo mode only. No real deposits, investments, profit payments or withdrawals are processed.',
  notice_badge TEXT DEFAULT 'DEMO MODE ONLY',
  notice_theme TEXT DEFAULT 'gold',
  notice_visible BOOLEAN DEFAULT TRUE,
  min_deposit NUMERIC DEFAULT 100,
  min_referral_withdrawal NUMERIC DEFAULT 20,
  lvl1_commission NUMERIC DEFAULT 15,
  lvl2_commission NUMERIC DEFAULT 10,
  lvl3_commission NUMERIC DEFAULT 5,
  lvl4_commission NUMERIC DEFAULT 1,
  binance_address TEXT DEFAULT 'TX998231USDTTRC20WALLET',
  usdt_address TEXT DEFAULT '0x71C...9821',
  qr_code_url TEXT DEFAULT 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SR_INVESTMENT_DEMO',
  office_address TEXT DEFAULT 'Financial District, Institutional Demo Hub',
  support_email TEXT DEFAULT 'support@srinvestment-demo.com',
  trading_hours TEXT DEFAULT 'London & New York Sessions',
  maintenance_mode BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.system_settings (id, notice_text, min_deposit, min_referral_withdrawal)
VALUES ('global_config', 'Demo mode only. No real deposits, investments, profit payments or withdrawals are processed.', 100, 20)
ON CONFLICT (id) DO NOTHING;

-- 2. Investment Plans Table
CREATE TABLE IF NOT EXISTS public.investment_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  amount TEXT NOT NULL,
  roi TEXT NOT NULL,
  badge_color TEXT DEFAULT 'bg-blue-600',
  btn_color TEXT DEFAULT 'bg-blue-600 hover:bg-blue-700',
  popular BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.investment_plans (id, name, amount, roi, badge_color, btn_color, popular, sort_order)
VALUES 
  ('starter', 'Starter Plan', '$200', '~ 8%', 'bg-blue-600', 'bg-blue-600 hover:bg-blue-700', FALSE, 1),
  ('popular', 'Popular Plan', '$500', '~ 10%', 'bg-emerald-600', 'bg-emerald-600 hover:bg-emerald-700', TRUE, 2),
  ('premium', 'Premium Plan', '$1,000', '~ 12%', 'bg-purple-700', 'bg-purple-700 hover:bg-purple-800', FALSE, 3)
ON CONFLICT (id) DO NOTHING;

-- 3. Profiles Table (Guest / Active Investor / Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  account_tier TEXT DEFAULT 'PROSPECT' CHECK (account_tier IN ('PROSPECT', 'ACTIVE_INVESTOR', 'VIP_INSTITUTIONAL')),
  invested NUMERIC DEFAULT 0,
  profit NUMERIC DEFAULT 0,
  referral_earned NUMERIC DEFAULT 0,
  referral_withdrawn NUMERIC DEFAULT 0,
  balance NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended')),
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.profiles (id, name, email, role, account_tier, invested, profit, referral_earned, balance, status)
VALUES
  ('SR-ADMIN-FAISAL', 'Faisal (Master Admin)', 'mrfaisal795@gmail.com', 'admin', 'VIP_INSTITUTIONAL', 0, 0, 0, 0, 'Active'),
  ('SR100245', 'Md. Rahman', 'trader@srinvestment.com', 'user', 'ACTIVE_INVESTOR', 500, 50, 75, 75, 'Active'),
  ('SR100892', 'Tanvir Ahmed 2', 'tanvir@gmail.com', 'user', 'ACTIVE_INVESTOR', 1000, 120, 150, 150, 'Active')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 4. Active Investments Table (Active & Expired Plans Tracker)
CREATE TABLE IF NOT EXISTS public.active_investments (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  invested_amount NUMERIC NOT NULL,
  monthly_roi TEXT NOT NULL,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Completed')),
  start_date TIMESTAMPTZ DEFAULT NOW(),
  expiry_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- 5. Withdrawals Table
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id BIGSERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  method TEXT NOT NULL,
  account TEXT NOT NULL,
  tx_id TEXT DEFAULT 'TXN-GEN',
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  date_created TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. User Transactions Table
CREATE TABLE IF NOT EXISTS public.user_transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'SUCCESS',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Referral Network Table
CREATE TABLE IF NOT EXISTS public.referral_network (
  id BIGSERIAL PRIMARY KEY,
  referrer_id TEXT NOT NULL,
  referred_id TEXT NOT NULL,
  level INT DEFAULT 1,
  commission_earned NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id BIGSERIAL PRIMARY KEY,
  admin_email TEXT NOT NULL,
  action_type TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Commodity Market Rates Table
CREATE TABLE IF NOT EXISTS public.commodity_market_rates (
  symbol TEXT PRIMARY KEY,
  bid_price NUMERIC NOT NULL,
  ask_price NUMERIC NOT NULL,
  spread NUMERIC NOT NULL,
  session_status TEXT DEFAULT 'Active',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.commodity_market_rates (symbol, bid_price, ask_price, spread, session_status)
VALUES 
  ('XAUUSD', 2348.50, 2348.80, 0.30, 'Active'),
  ('XAGUSD', 28.45, 28.48, 0.03, 'Active')
ON CONFLICT (symbol) DO NOTHING;

-- 11. Trader Positions Table
CREATE TABLE IF NOT EXISTS public.trader_positions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  symbol TEXT NOT NULL,
  type TEXT CHECK (type IN ('BUY', 'SELL')),
  volume NUMERIC NOT NULL,
  entry_price NUMERIC NOT NULL,
  pnl NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'OPEN'
);

-- 12. Payout Gateways Config Table
CREATE TABLE IF NOT EXISTS public.payout_gateways_config (
  gateway_id TEXT PRIMARY KEY,
  gateway_name TEXT NOT NULL,
  account_details TEXT,
  qr_image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- 13. Platform Analytics Snapshots Table
CREATE TABLE IF NOT EXISTS public.platform_analytics_snapshots (
  snapshot_date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
  total_aum NUMERIC DEFAULT 0,
  active_traders_count INT DEFAULT 0,
  total_payouts_24h NUMERIC DEFAULT 0
);

-- 14-26. Additional Institutional & Quant Tables
CREATE TABLE IF NOT EXISTS public.liquidity_providers_simulation (lp_id TEXT PRIMARY KEY, lp_name TEXT, latency_ms INT, status TEXT DEFAULT 'CONNECTED');
CREATE TABLE IF NOT EXISTS public.risk_management_exposure (symbol TEXT PRIMARY KEY, net_long NUMERIC, net_short NUMERIC, risk_status TEXT DEFAULT 'NORMAL');
CREATE TABLE IF NOT EXISTS public.kyc_verification_docs (id BIGSERIAL PRIMARY KEY, user_id TEXT, doc_type TEXT, status TEXT DEFAULT 'PENDING');
CREATE TABLE IF NOT EXISTS public.system_api_webhooks (webhook_id TEXT PRIMARY KEY, service_name TEXT, endpoint_url TEXT, is_active BOOLEAN DEFAULT TRUE);
CREATE TABLE IF NOT EXISTS public.institutional_prime_brokers (broker_id TEXT PRIMARY KEY, broker_name TEXT, credit_line NUMERIC, status TEXT DEFAULT 'ACTIVE');
CREATE TABLE IF NOT EXISTS public.multicurrency_wallets (wallet_id BIGSERIAL PRIMARY KEY, user_id TEXT, currency TEXT, balance NUMERIC DEFAULT 0);
CREATE TABLE IF NOT EXISTS public.algorithmic_trading_bots (bot_id TEXT PRIMARY KEY, bot_name TEXT, win_rate NUMERIC, status TEXT DEFAULT 'RUNNING');
CREATE TABLE IF NOT EXISTS public.global_compliance_aml (check_id BIGSERIAL PRIMARY KEY, user_id TEXT, risk_score INT, review_status TEXT DEFAULT 'PASSED');
CREATE TABLE IF NOT EXISTS public.user_tier_history (id BIGSERIAL PRIMARY KEY, user_id TEXT, previous_tier TEXT, new_tier TEXT, changed_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS public.ai_quant_trading_signals (signal_id BIGSERIAL PRIMARY KEY, symbol TEXT, action TEXT, entry_price NUMERIC, accuracy_score NUMERIC);
CREATE TABLE IF NOT EXISTS public.smart_contract_escrow_pools (pool_id BIGSERIAL PRIMARY KEY, user_id TEXT, locked_amount NUMERIC, network TEXT DEFAULT 'TRC20');
CREATE TABLE IF NOT EXISTS public.vip_concierge_support (ticket_id BIGSERIAL PRIMARY KEY, user_id TEXT, subject TEXT, priority TEXT DEFAULT 'HIGH', status TEXT DEFAULT 'OPEN');
CREATE TABLE IF NOT EXISTS public.multilevel_binary_tree_mlm (node_id BIGSERIAL PRIMARY KEY, parent_id TEXT, child_id TEXT, total_commission NUMERIC DEFAULT 0);

-- Enable RLS and Public Access Policies for Key Tables
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public all system_settings" ON public.system_settings;
DROP POLICY IF EXISTS "Public all investment_plans" ON public.investment_plans;
DROP POLICY IF EXISTS "Public all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public all active_investments" ON public.active_investments;
DROP POLICY IF EXISTS "Public all withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Public all contact_messages" ON public.contact_messages;

CREATE POLICY "Public all system_settings" ON public.system_settings FOR ALL USING (true);
CREATE POLICY "Public all investment_plans" ON public.investment_plans FOR ALL USING (true);
CREATE POLICY "Public all profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Public all active_investments" ON public.active_investments FOR ALL USING (true);
CREATE POLICY "Public all withdrawals" ON public.withdrawals FOR ALL USING (true);
CREATE POLICY "Public all contact_messages" ON public.contact_messages FOR ALL USING (true);

-- ==========================================================
-- SECURE AUTHORIZATION MIGRATION
-- Run this section in Supabase SQL Editor after the base schema.
-- ==========================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- Link pre-existing profile rows to their Supabase Auth accounts by email.
UPDATE public.profiles p
SET auth_user_id = u.id
FROM auth.users u
WHERE lower(p.email) = lower(u.email)
  AND p.auth_user_id IS NULL;

CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.current_profile_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.profiles
  WHERE auth_user_id = (SELECT auth.uid())
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (SELECT private.current_profile_role()) = 'admin'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE auth_user_id = (SELECT auth.uid()) AND status = 'Active'
    );
$$;

REVOKE ALL ON FUNCTION private.current_profile_role() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.current_profile_role() TO authenticated;
GRANT EXECUTE ON FUNCTION private.is_admin() TO authenticated;

-- Replace the insecure public profile policy.
DROP POLICY IF EXISTS "Public all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own safe fields" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth_user_id = (SELECT auth.uid()));

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING ((SELECT private.is_admin()));

CREATE POLICY "Admins can update profiles"
ON public.profiles FOR UPDATE TO authenticated
USING ((SELECT private.is_admin()))
WITH CHECK ((SELECT private.is_admin()));

-- Users may update their own non-role profile fields; role/status are protected.
CREATE POLICY "Users can update own safe fields"
ON public.profiles FOR UPDATE TO authenticated
USING (auth_user_id = (SELECT auth.uid()))
WITH CHECK (
  auth_user_id = (SELECT auth.uid())
  AND role = (SELECT private.current_profile_role())
  AND status = 'Active'
);

CREATE OR REPLACE FUNCTION public.admin_set_user_role(target_user_id TEXT, next_role TEXT)
RETURNS public.profiles
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE updated_profile public.profiles;
BEGIN
  IF NOT (SELECT private.is_admin()) THEN
    RAISE EXCEPTION 'Only an active administrator can change roles';
  END IF;
  IF next_role NOT IN ('user', 'admin') THEN
    RAISE EXCEPTION 'Invalid role';
  END IF;
  IF target_user_id = (SELECT p.id FROM public.profiles p WHERE p.auth_user_id = (SELECT auth.uid())) THEN
    RAISE EXCEPTION 'Administrators cannot change their own role';
  END IF;

  UPDATE public.profiles
  SET role = next_role
  WHERE id = target_user_id
  RETURNING * INTO updated_profile;

  IF updated_profile.id IS NULL THEN RAISE EXCEPTION 'Profile not found'; END IF;
  RETURN updated_profile;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_user_role(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_set_user_role(TEXT, TEXT) TO authenticated;

-- Create a user profile automatically for every new Supabase Auth account.
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, auth_user_id, name, email, role, status)
  VALUES (
    'SR' || upper(substr(replace(NEW.id::text, '-', ''), 1, 10)),
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
    lower(NEW.email),
    'user',
    'Active'
  )
  ON CONFLICT (email) DO UPDATE
    SET auth_user_id = EXCLUDED.auth_user_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

REVOKE ALL ON FUNCTION public.handle_new_auth_user() FROM PUBLIC;
