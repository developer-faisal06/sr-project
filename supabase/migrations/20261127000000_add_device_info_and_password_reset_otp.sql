-- ============================================================
-- SR Investment: Device Info Tracking & Password Reset Email OTP
-- ============================================================

-- 1. Add device_info column to investment_orders and payment_gateway_transactions
alter table public.investment_orders add column if not exists device_info text;
alter table public.payment_gateway_transactions add column if not exists device_info text;

-- 2. Function to verify Password Reset OTP for unauthenticated / anon visitors
create or replace function public.verify_password_reset_otp(target_email text, target_otp text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  user_rec record;
begin
  if target_email is null or trim(target_email) = '' or target_otp is null or trim(target_otp) = '' then
    return jsonb_build_object('success', false, 'message', 'Email and OTP code are required.');
  end if;

  select * into user_rec from public.profiles where lower(email) = lower(trim(target_email)) limit 1;
  if user_rec.id is null then
    return jsonb_build_object('success', false, 'message', 'No account found with this email address.');
  end if;

  if user_rec.email_otp = trim(target_otp) and (user_rec.email_otp_expires_at is null or now() <= user_rec.email_otp_expires_at) then
    update public.profiles set
      email_otp = null,
      email_otp_expires_at = null,
      email_verified = true
    where id = user_rec.id;

    return jsonb_build_object('success', true, 'message', 'OTP verified successfully.');
  else
    return jsonb_build_object('success', false, 'message', 'Invalid or expired OTP code.');
  end if;
end;
$$;

revoke all on function public.verify_password_reset_otp from public;
grant execute on function public.verify_password_reset_otp to anon, authenticated;
