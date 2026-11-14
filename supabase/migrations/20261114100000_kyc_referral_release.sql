-- KYC, verification flags, communication settings, referral auto-lock and scheduled release.
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists phone_verified boolean default false;
alter table public.profiles add column if not exists email_verified boolean default false;
alter table public.profiles add column if not exists mfa_enabled boolean default false;
alter table public.profiles add column if not exists kyc_status text default 'NOT_STARTED' check (kyc_status in ('NOT_STARTED','DRAFT','SUBMITTED','UNDER_REVIEW','APPROVED','REJECTED','RESUBMISSION_REQUIRED','EXPIRED'));
alter table public.profiles add column if not exists risk_level text default 'LOW' check (risk_level in ('LOW','MEDIUM','HIGH','CRITICAL'));
alter table public.profiles add column if not exists last_login_at timestamptz;
alter table public.profiles add column if not exists notification_preferences jsonb default '{}'::jsonb;

alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists temp_password text;
alter table public.system_settings add column if not exists email_provider text default 'custom';
alter table public.system_settings add column if not exists email_provider_secret_name text;
alter table public.system_settings add column if not exists email_host text;
alter table public.system_settings add column if not exists email_port integer default 587;
alter table public.system_settings add column if not exists email_encryption text default 'TLS';
alter table public.system_settings add column if not exists email_from_name text;
alter table public.system_settings add column if not exists email_from_email text;
alter table public.system_settings add column if not exists email_fallback_provider text;
alter table public.system_settings add column if not exists sms_provider text default 'twilio';
alter table public.system_settings add column if not exists sms_provider_secret_name text;
alter table public.system_settings add column if not exists sms_sender_id text;
alter table public.system_settings add column if not exists sms_country_code text default 'BD';
alter table public.system_settings add column if not exists sms_rate_limit_per_day integer default 10;

create table if not exists public.user_kyc_profiles (
  user_id text primary key references public.profiles(id) on delete cascade,
  legal_name text,
  date_of_birth date,
  nationality text,
  country text,
  address_line text,
  city text,
  state text,
  postal_code text,
  tax_residency text,
  source_of_funds text,
  source_of_income text,
  kyc_status text not null default 'NOT_STARTED' check (kyc_status in ('NOT_STARTED','DRAFT','SUBMITTED','UNDER_REVIEW','APPROVED','REJECTED','RESUBMISSION_REQUIRED','EXPIRED')),
  reviewer_id uuid,
  review_note text,
  rejection_reason text,
  submitted_at timestamptz,
  approved_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_kyc_documents (
  id bigserial primary key,
  kyc_profile_id text not null references public.user_kyc_profiles(user_id) on delete cascade,
  user_id text not null references public.profiles(id) on delete cascade,
  doc_type text not null check (doc_type in ('PASSPORT','NATIONAL_ID_FRONT','NATIONAL_ID_BACK','DRIVING_LICENSE','PROOF_OF_ADDRESS','BANK_STATEMENT','SELFIE','SOURCE_OF_FUNDS','OTHER')),
  storage_path text not null,
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED','RESUBMISSION_REQUIRED')),
  reviewer_note text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.user_kyc_reviews (
  id bigserial primary key,
  user_id text not null references public.profiles(id) on delete cascade,
  reviewer_id uuid not null,
  action text not null,
  old_status text,
  new_status text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.notification_templates (
  id text primary key,
  channel text not null check (channel in ('EMAIL','SMS','IN_APP')),
  event_type text not null,
  subject text default '',
  body text default '',
  enabled boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.email_delivery_logs (
  id bigserial primary key,
  recipient_id text,
  recipient_email text,
  template_id text,
  event_type text,
  subject text,
  provider text,
  message_id text,
  status text not null default 'QUEUED' check (status in ('QUEUED','SENT','DELIVERED','FAILED','BOUNCED','COMPLAINT')),
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.sms_delivery_logs (
  id bigserial primary key,
  recipient_id text,
  recipient_phone text,
  template_id text,
  event_type text,
  provider text,
  message_sid text,
  status text not null default 'QUEUED' check (status in ('QUEUED','SENT','DELIVERED','FAILED','BOUNCED')),
  error_message text,
  created_at timestamptz not null default now()
);

create or replace function public.create_referral_commission_lock_on_signup()
returns trigger language plpgsql security definer set search_path = public as $$
declare referrer_id text; default_commission numeric := 0;
begin
  select id into referrer_id from public.profiles where lower(email) = lower(coalesce(new.raw_user_meta_data->>'referred_by',''));
  if referrer_id is not null and referrer_id <> new.id then
    perform public.create_referral_commission_lock(referrer_id, new.id, default_commission, new.id::text);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_referral_commission_lock on auth.users;
create trigger trg_referral_commission_lock after insert on auth.users for each row execute function public.create_referral_commission_lock_on_signup();

create or replace function public.release_due_working_day_locks()
returns integer language plpgsql security definer set search_path = public as $$
declare released integer := 0; lock_row record;
begin
  perform public.refresh_working_day_lock_counters();
  for lock_row in select * from public.user_withdrawal_locks where status = 'ELIGIBLE' and unlock_date is not null and current_date >= unlock_date loop
    update public.user_withdrawal_locks set status = 'RELEASED', released_at = now(), updated_at = now() where id = lock_row.id;
    update public.profiles set locked_deposit = greatest(coalesce(locked_deposit,0) - coalesce(lock_row.principal_amount,0),0), locked_profit = greatest(coalesce(locked_profit,0) - coalesce(lock_row.profit_amount,0),0), withdrawable_balance = coalesce(withdrawable_balance, balance, 0) + coalesce(lock_row.principal_amount,0) + coalesce(lock_row.profit_amount,0) where id = lock_row.user_id;
    insert into public.financial_ledger (user_id,event_type,amount,currency,reference_id,reason,created_by) values (lock_row.user_id,'LOCK_RELEASED',coalesce(lock_row.principal_amount,0)+coalesce(lock_row.profit_amount,0),'USD',lock_row.id::text,'Working-day lock released',null);
    insert into public.notifications (recipient_id,recipient_type,category,event_type,title,message,related_id,related_type) values (lock_row.user_id,'USER','WITHDRAWAL','LOCK_RELEASED','Withdrawal Lock Released','Your working-day lock has been released and eligible funds are withdrawable.',lock_row.id::text,'LOCK');
    released := released + 1;
  end loop;
  update public.referral_commission_locks set status = 'ELIGIBLE' where status in ('PENDING','LOCKED') and unlock_date is not null and current_date >= unlock_date;
  return released;
end;
$$;
