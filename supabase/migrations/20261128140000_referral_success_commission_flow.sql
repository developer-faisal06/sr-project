-- ============================================================
-- SR Investment: Automatic Referral Commission & Downline Sync on Deposit Approval
-- ============================================================

CREATE OR REPLACE FUNCTION public.admin_approve_investment_order(target_order_id BIGINT, review_note TEXT DEFAULT NULL)
RETURNS public.investment_orders
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  approved_order public.investment_orders;
  first_lock_exists BOOLEAN;
  lock_days INTEGER;
  ref_code TEXT;
  referrer_row public.profiles;
  commission_pct NUMERIC := 15;
  commission_val NUMERIC := 0;
BEGIN
  IF NOT (SELECT private.is_admin()) THEN
    RAISE EXCEPTION 'Only an administrator can approve an investment order';
  END IF;

  UPDATE public.investment_orders
  SET status = 'Approved',
      approved_at = COALESCE(approved_at, NOW()),
      admin_note = NULLIF(TRIM(COALESCE(review_note, '')), '')
  WHERE id = target_order_id AND status IN ('Pending', 'UNDER_REVIEW')
  RETURNING * INTO approved_order;

  IF approved_order.id IS NULL THEN
    RAISE EXCEPTION 'Investment order not found or already processed';
  END IF;

  -- 1. Always increment user's total_deposited, active_capital, and invested upon deposit approval
  UPDATE public.profiles
  SET total_deposited = COALESCE(total_deposited, 0) + approved_order.amount,
      invested = COALESCE(invested, 0) + approved_order.amount,
      active_capital = COALESCE(active_capital, 0) + approved_order.amount
  WHERE id = approved_order.user_id;

  -- 2. First deposit lock handling (30 working days)
  SELECT EXISTS(SELECT 1 FROM public.user_withdrawal_locks WHERE user_id = approved_order.user_id AND lock_type = 'FIRST_DEPOSIT') INTO first_lock_exists;
  SELECT COALESCE(deposit_lock_working_days, 30) INTO lock_days FROM public.system_settings WHERE id = 'global_config';
  IF NOT first_lock_exists THEN
    INSERT INTO public.user_withdrawal_locks (user_id, lock_type, source_id, principal_amount, approved_at, lock_start_date, lock_days, unlock_date)
    VALUES (
      approved_order.user_id,
      'FIRST_DEPOSIT',
      approved_order.id::text,
      approved_order.amount,
      approved_order.approved_at,
      approved_order.approved_at::date,
      COALESCE(lock_days, 30),
      public.add_working_days(approved_order.approved_at::date, COALESCE(lock_days, 30))
    );
    UPDATE public.profiles
    SET first_deposit_approved_at = approved_order.approved_at,
        deposit_unlock_at = public.add_working_days(approved_order.approved_at::date, COALESCE(lock_days, 30)),
        locked_deposit = COALESCE(locked_deposit, 0) + approved_order.amount
    WHERE id = approved_order.user_id;
  END IF;

  -- 3. Update payment gateway transaction status
  IF approved_order.payment_transaction_id IS NOT NULL THEN
    UPDATE public.payment_gateway_transactions
    SET status = 'Approved',
        reviewed_at = NOW(),
        admin_note = NULLIF(TRIM(COALESCE(review_note, '')), '')
    WHERE id = approved_order.payment_transaction_id;
  END IF;

  -- 4. User's financial ledger entry for deposit
  INSERT INTO public.financial_ledger (user_id, event_type, amount, currency, locked_after, reference_id, reason, created_by)
  VALUES (
    approved_order.user_id,
    'DEPOSIT_LOCKED',
    approved_order.amount,
    COALESCE(approved_order.currency, 'USD'),
    approved_order.amount,
    approved_order.id::text,
    'Approved deposit order',
    auth.uid()
  );

  -- 5. Successful Referral Commission Processing
  ref_code := approved_order.referral_id;
  IF ref_code IS NULL AND approved_order.admin_note LIKE 'Ref: %' THEN
    ref_code := TRIM(SUBSTRING(approved_order.admin_note FROM 6));
  END IF;

  IF ref_code IS NOT NULL AND ref_code <> approved_order.user_id AND approved_order.amount > 0 THEN
    SELECT * INTO referrer_row FROM public.profiles WHERE (id = ref_code OR email = ref_code) LIMIT 1;
    IF referrer_row.id IS NOT NULL AND referrer_row.id <> approved_order.user_id THEN
      SELECT COALESCE(lvl1_commission, 15) INTO commission_pct FROM public.system_settings WHERE id = 'global_config';
      commission_val := ROUND((approved_order.amount * (commission_pct / 100.0)), 2);

      IF commission_val > 0 THEN
        -- A. Credit commission to referrer
        UPDATE public.profiles
        SET referral_earned = COALESCE(referral_earned, 0) + commission_val,
            balance = COALESCE(balance, 0) + commission_val
        WHERE id = referrer_row.id;

        -- B. Referrer's financial ledger
        INSERT INTO public.financial_ledger (user_id, event_type, amount, currency, reference_id, reason, created_by)
        VALUES (
          referrer_row.id,
          'REFERRAL_COMMISSION',
          commission_val,
          COALESCE(approved_order.currency, 'USD'),
          'REF-DEP-' || approved_order.id::text,
          'Level 1 (' || commission_pct::text || '%) referral reward from partner ' || approved_order.user_id,
          auth.uid()
        );

        -- C. Record in referral_network
        INSERT INTO public.referral_network (referrer_id, referred_id, level, commission_earned)
        VALUES (referrer_row.id, approved_order.user_id, 1, commission_val);

        -- D. Record in referral_commission_locks
        INSERT INTO public.referral_commission_locks (referrer_id, referred_user_id, referral_id, commission_amount, status)
        VALUES (referrer_row.id, approved_order.user_id, ref_code, commission_val, 'COMPLETED');
      END IF;
    END IF;
  END IF;

  RETURN approved_order;
END;
$$;
