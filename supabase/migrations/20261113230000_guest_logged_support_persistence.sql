alter table public.ai_chat_conversations add column if not exists visitor_type text default 'GUEST';
alter table public.ai_chat_conversations add column if not exists last_message_at timestamptz;
alter table public.ai_chat_conversations add column if not exists unread_for_admin integer default 0;
alter table public.ai_chat_conversations add column if not exists unread_for_user integer default 0;
alter table public.ai_chat_messages add column if not exists sender_name text;
alter table public.ai_chat_messages add column if not exists sender_avatar_url text;
alter table public.ai_chat_messages add column if not exists reply_to_message_id uuid;
alter table public.ai_chat_messages add column if not exists quoted_content text;
alter table public.ai_chat_messages add column if not exists thread_id uuid;

-- Existing conversations are classified safely from their identity fields.
update public.ai_chat_conversations
set visitor_type = case when user_id is null then 'GUEST' else 'LOGGED_USER' end
where visitor_type is null or visitor_type = '';

-- Preserve conversations and allow the same guest conversation to be linked to a
-- logged-in profile after authentication; no logout cleanup is performed.
create index if not exists ai_chat_conversations_user_id_idx on public.ai_chat_conversations(user_id);
create index if not exists ai_chat_conversations_guest_token_idx on public.ai_chat_conversations(guest_token);
create index if not exists ai_chat_messages_reply_to_idx on public.ai_chat_messages(reply_to_message_id);
