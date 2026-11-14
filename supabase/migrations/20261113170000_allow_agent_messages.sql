-- Allow human admin replies in the support message thread.
alter table public.ai_chat_messages
  drop constraint if exists ai_chat_messages_sender_type_check;

alter table public.ai_chat_messages
  add constraint ai_chat_messages_sender_type_check
  check (sender_type in ('USER', 'AI', 'AGENT', 'SYSTEM'));
