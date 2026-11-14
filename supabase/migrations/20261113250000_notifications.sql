create table if not exists public.notifications (
  id bigserial primary key,
  recipient_id text,
  recipient_type text default 'USER',
  category text default 'SYSTEM',
  title text default 'Notification',
  message text default '',
  related_id text,
  related_type text,
  is_read boolean default false,
  created_at timestamptz default now(),
  read_at timestamptz
);
alter table public.notifications add column if not exists recipient_id text;
alter table public.notifications add column if not exists recipient_type text default 'USER';
alter table public.notifications add column if not exists category text default 'SYSTEM';
alter table public.notifications add column if not exists title text default 'Notification';
alter table public.notifications add column if not exists message text default '';
alter table public.notifications add column if not exists related_id text;
alter table public.notifications add column if not exists related_type text;
alter table public.notifications add column if not exists is_read boolean default false;
alter table public.notifications add column if not exists read_at timestamptz;
alter table public.notifications enable row level security;
drop policy if exists "Public notifications access" on public.notifications;
create policy "Public notifications access" on public.notifications for all using (true);
create index if not exists notifications_recipient_idx on public.notifications(recipient_type, recipient_id, created_at desc);
create index if not exists notifications_unread_idx on public.notifications(is_read, created_at desc);
