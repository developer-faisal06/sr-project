-- Existing ai_chat_messages.id is BIGINT in this project. Reply references must
-- use the same type; UUID causes "invalid input syntax for type uuid" when an
-- existing numeric message ID is used.
alter table public.ai_chat_messages
  alter column reply_to_message_id type bigint
  using nullif(reply_to_message_id::text, '')::bigint;

alter table public.ai_chat_messages
  alter column thread_id type bigint
  using nullif(thread_id::text, '')::bigint;

create index if not exists ai_chat_messages_reply_to_message_id_idx
  on public.ai_chat_messages(reply_to_message_id);
