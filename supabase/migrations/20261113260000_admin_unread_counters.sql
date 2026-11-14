alter table public.support_tickets add column if not exists unread_for_admin integer default 0;
alter table public.support_tickets add column if not exists unread_for_user integer default 0;
alter table public.contact_messages add column if not exists is_read boolean default false;
