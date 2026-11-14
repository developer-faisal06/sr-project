alter table public.system_settings add column if not exists support_logo_url text;
alter table public.system_settings add column if not exists support_ai_avatar_url text;
alter table public.system_settings add column if not exists support_agent_avatar_url text;
alter table public.system_settings add column if not exists support_widget_avatar_url text;
alter table public.system_settings add column if not exists live_support_notifications_enabled boolean default true;
alter table public.system_settings add column if not exists live_support_custom_amount_enabled boolean default true;
alter table public.investment_plans add column if not exists duration text;
alter table public.investment_plans add column if not exists description text;
alter table public.investment_plans add column if not exists enabled boolean default true;
alter table public.investment_plans add column if not exists custom_amount_enabled boolean default false;
alter table public.investment_plans add column if not exists min_amount numeric;
alter table public.investment_plans add column if not exists max_amount numeric;
alter table public.contact_messages add column if not exists is_read boolean default false;
alter table public.contact_messages add column if not exists is_archived boolean default false;
alter table public.contact_messages add column if not exists updated_at timestamptz default now();

create table if not exists public.contact_message_replies (
  id bigserial primary key,
  contact_message_id bigint references public.contact_messages(id) on delete cascade not null,
  sender_type text not null check (sender_type in ('ADMIN','SYSTEM')),
  sender_id text,
  content text not null,
  message_status text default 'SENT',
  created_at timestamptz default now()
);
alter table public.contact_message_replies enable row level security;
drop policy if exists "Public all contact_message_replies" on public.contact_message_replies;
create policy "Public all contact_message_replies" on public.contact_message_replies for all using (true);
