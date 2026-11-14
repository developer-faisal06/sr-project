alter table public.support_tickets add column if not exists closed_at timestamptz;
alter table public.support_tickets add column if not exists closed_by text;
alter table public.support_ticket_messages add column if not exists read_by_admin boolean default false;
alter table public.support_ticket_messages add column if not exists read_by_user boolean default false;
