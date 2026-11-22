-- ============================================================
-- SR Investment: Automatic Nightly Profit Crediting (pg_cron)
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Enable pg_cron extension if available on Supabase project
create extension if not exists pg_cron;

-- 2. Schedule nightly job to run every day at 00:05 AM (UTC)
--    It calls our public.admin_credit_daily_profits(10) function automatically.
do $$
begin
  if exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    -- Unschedule previous job if exists to prevent duplicates
    perform cron.unschedule('sr-nightly-profit-credit');
    
    -- Schedule new cron job to run at 00:05 UTC daily
    perform cron.schedule(
      'sr-nightly-profit-credit',
      '5 0 * * *',
      'select public.admin_credit_daily_profits(10);'
    );
  end if;
end $$;
