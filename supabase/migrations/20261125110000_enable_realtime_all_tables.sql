-- ============================================================
-- SR Investment: Enable Realtime for all core tables & Replica Identity FULL
-- ============================================================

do $$
begin
  -- 1. Ensure tables are in supabase_realtime publication
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'profiles') then
    alter publication supabase_realtime add table public.profiles;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'investment_orders') then
    alter publication supabase_realtime add table public.investment_orders;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'payment_gateway_transactions') then
    alter publication supabase_realtime add table public.payment_gateway_transactions;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'withdrawals') then
    alter publication supabase_realtime add table public.withdrawals;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'ai_chat_messages') then
    alter publication supabase_realtime add table public.ai_chat_messages;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'ai_chat_conversations') then
    alter publication supabase_realtime add table public.ai_chat_conversations;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'notifications') then
    alter publication supabase_realtime add table public.notifications;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'user_payout_accounts') then
    alter publication supabase_realtime add table public.user_payout_accounts;
  end if;
end $$;

-- 2. Ensure REPLICA IDENTITY FULL for complete row payloads on update/delete events
alter table public.profiles replica identity full;
alter table public.investment_orders replica identity full;
alter table public.payment_gateway_transactions replica identity full;
alter table public.withdrawals replica identity full;
alter table public.ai_chat_messages replica identity full;
alter table public.ai_chat_conversations replica identity full;
alter table public.notifications replica identity full;
alter table public.user_payout_accounts replica identity full;
