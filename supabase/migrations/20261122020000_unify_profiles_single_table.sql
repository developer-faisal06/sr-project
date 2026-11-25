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
declare
  cols text := '';
begin
  if to_regclass('public.user_kyc_profiles') is not null then
    -- Build dynamic SET clause based on columns that actually exist in user_kyc_profiles
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='user_kyc_profiles' and column_name='legal_name') then
      cols := cols || 'legal_name = coalesce(p.legal_name, k.legal_name), ';
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='user_kyc_profiles' and column_name='document_type') then
      cols := cols || 'document_type = coalesce(p.document_type, k.document_type), ';
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='user_kyc_profiles' and column_name='document_number') then
      cols := cols || 'document_number = coalesce(p.document_number, k.document_number), ';
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='user_kyc_profiles' and column_name='date_of_birth') then
      cols := cols || 'date_of_birth = coalesce(p.date_of_birth, k.date_of_birth), ';
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='user_kyc_profiles' and column_name='kyc_status') then
      cols := cols || 'kyc_status = coalesce(p.kyc_status, k.kyc_status, ''VERIFIED''), ';
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='user_kyc_profiles' and column_name='country') then
      cols := cols || 'country = coalesce(p.country, k.country, ''Bangladesh''), ';
    end if;

    -- Only execute if we have columns to update
    if length(cols) > 0 then
      cols := rtrim(cols, ', ');
      execute 'update public.profiles p set ' || cols || ' from public.user_kyc_profiles k where p.id = k.user_id';
    end if;
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
