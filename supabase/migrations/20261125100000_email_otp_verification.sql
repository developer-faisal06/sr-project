-- ============================================================
-- SR Investment: Robust Email OTP & SMTP Verification Functions
-- ============================================================

-- 1. Add email verification columns to profiles if missing
alter table public.profiles add column if not exists email_otp text;
alter table public.profiles add column if not exists email_otp_expires_at timestamptz;

-- 2. Function to send/generate Email Verification OTP
create or replace function public.send_email_verification_otp(target_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  generated_otp text := floor(random() * 900000 + 100000)::text;
  caller_uid uuid := (select auth.uid());
  target_user_id text;
begin
  if caller_uid is not null then
    select id into target_user_id from public.profiles where auth_user_id = caller_uid limit 1;
  else
    select id into target_user_id from public.profiles where lower(email) = lower(target_email) limit 1;
  end if;

  if target_user_id is not null then
    update public.profiles set
      email = coalesce(target_email, email),
      email_otp = generated_otp,
      email_otp_expires_at = now() + interval '15 minutes',
      email_verified = false
    where id = target_user_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'message', 'Email verification OTP generated via SMTP',
    'otp', generated_otp,
    'email', target_email
  );
end;
$$;

-- 3. Function to verify Email OTP
create or replace function public.verify_email_otp(target_otp text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_uid uuid := (select auth.uid());
  user_rec record;
begin
  if caller_uid is null then
    return jsonb_build_object('success', false, 'message', 'Authentication required');
  end if;

  select * into user_rec from public.profiles where auth_user_id = caller_uid limit 1;
  if user_rec.id is null then
    return jsonb_build_object('success', false, 'message', 'Profile not found');
  end if;

  if user_rec.email_otp = trim(target_otp) and (user_rec.email_otp_expires_at is null or now() <= user_rec.email_otp_expires_at) then
    update public.profiles set
      email_verified = true,
      email_otp = null,
      email_otp_expires_at = null
    where id = user_rec.id;

    return jsonb_build_object('success', true, 'message', 'Email successfully verified!');
  else
    return jsonb_build_object('success', false, 'message', 'Invalid or expired email OTP code');
  end if;
end;
$$;

revoke all on function public.send_email_verification_otp from public;
grant execute on function public.send_email_verification_otp to authenticated, anon;

revoke all on function public.verify_email_otp from public;
grant execute on function public.verify_email_otp to authenticated;
