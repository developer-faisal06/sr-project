-- ============================================================
-- SR Investment: Brand Email "SR INVESTMENT", Verification Flags & Phone OTP
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Ensure verification columns exist on public.profiles
alter table public.profiles add column if not exists email_verified boolean default false;
alter table public.profiles add column if not exists phone_verified boolean default false;
alter table public.profiles add column if not exists phone_otp text;
alter table public.profiles add column if not exists phone_otp_expires_at timestamptz;

-- 2. Update default email sender name in system_settings
update public.system_settings
set email_from_name = 'SR INVESTMENT',
    email_from_email = 'no-reply@srinvestment.com'
where id = 'global_config';

-- 3. Function to send/generate Phone Verification OTP
create or replace function public.send_phone_verification_otp(target_phone text)
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
  end if;

  if target_user_id is not null then
    update public.profiles set
      phone = target_phone,
      phone_otp = generated_otp,
      phone_otp_expires_at = now() + interval '10 minutes',
      phone_verified = false
    where id = target_user_id;
  end if;

  return jsonb_build_object(
    'success', true,
    'message', 'OTP generated for verification',
    'otp', generated_otp,
    'phone', target_phone
  );
end;
$$;

-- 4. Function to verify Phone OTP
create or replace function public.verify_phone_otp(target_otp text)
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

  if user_rec.phone_otp = trim(target_otp) and (user_rec.phone_otp_expires_at is null or now() <= user_rec.phone_otp_expires_at) then
    update public.profiles set
      phone_verified = true,
      phone_otp = null,
      phone_otp_expires_at = null
    where id = user_rec.id;

    return jsonb_build_object('success', true, 'message', 'Phone number successfully verified!');
  else
    return jsonb_build_object('success', false, 'message', 'Invalid or expired OTP code');
  end if;
end;
$$;

revoke all on function public.send_phone_verification_otp from public;
grant execute on function public.send_phone_verification_otp to authenticated, anon;

revoke all on function public.verify_phone_otp from public;
grant execute on function public.verify_phone_otp to authenticated;
