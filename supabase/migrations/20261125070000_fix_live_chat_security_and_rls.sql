-- ============================================================
-- SR Investment: Fix Live Chat Tables & RLS Policies for Public/Authenticated Access
-- ============================================================

-- 1. Ensure ai_chat_conversations and ai_chat_messages have RLS disabled or open public policies
alter table public.ai_chat_conversations disable row level security;
alter table public.ai_chat_messages disable row level security;

-- Drop any restrictive policies
drop policy if exists "Public all ai_chat_conversations" on public.ai_chat_conversations;
drop policy if exists "Public all ai_chat_messages" on public.ai_chat_messages;

create policy "Public all ai_chat_conversations" on public.ai_chat_conversations for all using (true) with check (true);
create policy "Public all ai_chat_messages" on public.ai_chat_messages for all using (true) with check (true);

alter table public.ai_chat_conversations enable row level security;
alter table public.ai_chat_messages enable row level security;

-- 2. Ensure sender_type check constraint includes 'AGENT'
alter table public.ai_chat_messages drop constraint if exists ai_chat_messages_sender_type_check;
alter table public.ai_chat_messages add constraint ai_chat_messages_sender_type_check check (sender_type in ('USER', 'AI', 'AGENT', 'SYSTEM'));
