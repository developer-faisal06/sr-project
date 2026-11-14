alter table public.support_tickets add column if not exists visitor_type text default 'LOGGED_USER';
