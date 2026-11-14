alter table public.support_tickets add column if not exists user_name text;
alter table public.support_tickets add column if not exists user_email text;
alter table public.support_tickets add column if not exists user_avatar_url text;
