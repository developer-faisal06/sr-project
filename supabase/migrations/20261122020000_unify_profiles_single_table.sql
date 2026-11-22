-- ============================================================
-- SR Investment: Unify Profiles & KYC into Single public.profiles Table
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Add all KYC & extended fields directly to public.profiles table
alter table public.profiles add column if not exists legal_name text;
alter table public.profiles add column if not exists document_type text;
alter table public.profiles add column if not exists document_number text;
alter table public.profiles add column if not exists date_of_birth date;
alter table public.profiles add column if not exists kyc_status text default 'VERIFIED';
alter table public.profiles add column if not exists timezone text default 'Asia/Dhaka';
alter table public.profiles add column if not exists language text default 'en';
alter table public.profiles add column if not exists currency text default 'USD';
alter table public.profiles add column if not exists dashboard_preferences jsonb default '{}'::jsonb;
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists country text default 'Bangladesh';
alter table public.profiles add column if not exists active_capital numeric default 0;
alter table public.profiles add column if not exists today_profit numeric default 0;
alter table public.profiles add column if not exists total_profit numeric default 0;
alter table public.profiles add column if not exists last_profit_credited_date date;

-- 2. Migrate existing records from user_kyc_profiles into public.profiles if the table exists
do $$
begin
  if to_regclass('public.user_kyc_profiles') is not null then
    execute '
      update public.profiles p
      set legal_name = coalesce(p.legal_name, k.legal_name),
          document_type = coalesce(p.document_type, k.document_type),
          document_number = coalesce(p.document_number, k.document_number),
          date_of_birth = coalesce(p.date_of_birth, k.date_of_birth),
          kyc_status = coalesce(p.kyc_status, k.kyc_status, ''VERIFIED''),
          country = coalesce(p.country, k.country, ''Bangladesh'')
      from public.user_kyc_profiles k
      where p.id = k.user_id;
    ';
  end if;
end $$;

-- 3. Ensure realtime is active on public.profiles
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles') then
    alter publication supabase_realtime add table public.profiles;
  end if;
end $$;

alter table public.profiles replica identity full;

-- 4. Open clean public access policy for single table
alter table public.profiles enable row level security;
drop policy if exists "Public all profiles" on public.profiles;
create policy "Public all profiles" on public.profiles for all using (true) with check (true);
