alter table public.ai_chat_messages add column if not exists message_status text default 'SENT';
alter table public.ai_chat_messages add column if not exists delivered_at timestamptz;
alter table public.ai_chat_messages add column if not exists seen_at timestamptz;
alter table public.support_tickets add column if not exists updated_at timestamptz default now();
alter table public.support_tickets add column if not exists assigned_to text;
alter table public.support_tickets add column if not exists last_reply_at timestamptz;
alter table public.support_tickets add column if not exists user_name text;
alter table public.support_tickets add column if not exists user_email text;
alter table public.support_tickets add column if not exists user_avatar_url text;

create table if not exists public.support_ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id bigint references public.support_tickets(id) on delete cascade not null,
  sender_type text not null check (sender_type in ('USER','AGENT','SYSTEM')),
  sender_id text,
  content text not null,
  message_status text default 'SENT',
  created_at timestamptz default now()
);

alter table public.support_ticket_messages enable row level security;
drop policy if exists "Public all support_ticket_messages" on public.support_ticket_messages;
create policy "Public all support_ticket_messages" on public.support_ticket_messages for all using (true);
