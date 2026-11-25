-- ============================================================
-- SR Investment: User Saved Payout Accounts & Wallets Table
-- ============================================================

create table if not exists public.user_payout_accounts (
  id bigserial primary key,
  user_id text not null references public.profiles(id) on delete cascade,
  gateway_code text not null,
  account_name text not null,
  account_number text not null,
  network text,
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS and Realtime
alter table public.user_payout_accounts enable row level security;
alter table public.user_payout_accounts replica identity full;

drop policy if exists "Users manage own payout accounts" on public.user_payout_accounts;
create policy "Users manage own payout accounts" on public.user_payout_accounts
  for all to authenticated
  using (user_id = (select id from public.profiles where auth_user_id = auth.uid()))
  with check (user_id = (select id from public.profiles where auth_user_id = auth.uid()));

drop policy if exists "Public all payout accounts" on public.user_payout_accounts;
create policy "Public all payout accounts" on public.user_payout_accounts
  for all using (true) with check (true);

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'user_payout_accounts') then
    alter publication supabase_realtime add table public.user_payout_accounts;
  end if;
end $$;

create index if not exists user_payout_accounts_user_idx on public.user_payout_accounts(user_id);
