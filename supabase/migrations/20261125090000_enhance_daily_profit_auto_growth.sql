-- ============================================================
-- SR Investment: Automatic Daily Profit Crediting & Balance Growth
-- ============================================================

create or replace function public.admin_credit_daily_profits(monthly_roi numeric default 10)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  daily_amt numeric;
  credited_count integer := 0;
  today_date date := current_date;
begin
  -- Note: We now allow daily profit accrual automatically (can run on demand or via cron)
  for r in 
    select id, name, coalesce(active_capital, invested, 0) as cap, coalesce(total_profit, 0) as tp, coalesce(balance, 0) as bal, last_profit_credited_date 
    from public.profiles 
    where status = 'Active' and coalesce(active_capital, invested, 0) > 0 
  loop
    if r.last_profit_credited_date is null or r.last_profit_credited_date < today_date then
      -- Daily profit based on 30 working days per month
      daily_amt := round((r.cap * (monthly_roi / 100.0)) / 30.0, 2);

      -- Update profile: increment balance & total_profit, set today_profit
      update public.profiles set
        today_profit = daily_amt,
        total_profit = tp + daily_amt,
        balance = bal + daily_amt,
        withdrawable_balance = coalesce(withdrawable_balance, bal, 0) + daily_amt,
        last_profit_credited_date = today_date,
        updated_at = now()
      where id = r.id;

      -- Insert into daily profit logs for auditing
      insert into public.daily_profit_logs (user_id, user_name, active_capital, monthly_roi_percent, daily_profit_amount)
      values (r.id, r.name, r.cap, monthly_roi, daily_amt);

      -- Insert notification for user
      insert into public.notifications (recipient_id, recipient_type, category, event_type, title, message, related_id, related_type)
      values (
        r.id,
        'USER',
        'INVESTMENT',
        'DAILY_PROFIT_CREDITED',
        'Daily Profit Credited! 📈',
        'Your active investment generated a daily profit of +$' || daily_amt || ' (' || monthly_roi || '% monthly ROI basis). Balance updated!',
        r.id::text,
        'INVESTMENT'
      );

      credited_count := credited_count + 1;
    end if;
  end loop;

  return credited_count;
end;
$$;

revoke all on function public.admin_credit_daily_profits from public;
grant execute on function public.admin_credit_daily_profits to authenticated, anon;
