alter table public.system_settings add column if not exists support_center_title text default 'Support & Help Center';
alter table public.system_settings add column if not exists support_center_subtitle text default 'We are here to help you with your account, payments and investments.';
alter table public.system_settings add column if not exists support_center_badge text default '24/7 Assistance';
alter table public.system_settings add column if not exists support_center_response_time text default 'Usually replies within 5 minutes';
alter table public.system_settings add column if not exists support_center_online_text text default 'Support Online';
alter table public.system_settings add column if not exists support_center_offline_text text default 'Support Offline';
alter table public.system_settings add column if not exists support_center_enabled boolean default true;
alter table public.system_settings add column if not exists support_overview_enabled boolean default true;
alter table public.system_settings add column if not exists support_ticket_form_enabled boolean default true;
alter table public.system_settings add column if not exists support_my_tickets_enabled boolean default true;
alter table public.system_settings add column if not exists support_live_chat_enabled boolean default true;
alter table public.system_settings add column if not exists support_faq_enabled boolean default true;
alter table public.system_settings add column if not exists support_contact_enabled boolean default true;
alter table public.system_settings add column if not exists support_quick_actions_enabled boolean default true;
alter table public.system_settings add column if not exists support_section_order jsonb default '["overview","new-ticket","my-tickets","live-support","faq","contact"]'::jsonb;

create table if not exists public.support_center_quick_actions (
  id bigserial primary key,
  label text not null,
  description text,
  icon text default 'Headphones',
  color text default 'blue',
  target_tab text not null,
  enabled boolean default true,
  sort_order integer default 1,
  created_at timestamptz default now()
);
alter table public.support_center_quick_actions enable row level security;
drop policy if exists "Public all support_center_quick_actions" on public.support_center_quick_actions;
create policy "Public all support_center_quick_actions" on public.support_center_quick_actions for all using (true);

insert into public.support_center_quick_actions (label, description, icon, color, target_tab, sort_order)
select * from (values
  ('Open a Ticket', 'Get help from our support team', 'Ticket', 'amber', 'new-ticket', 1),
  ('My Tickets', 'Track your support history', 'MessagesSquare', 'blue', 'my-tickets', 2),
  ('Live Support', 'Chat with support now', 'Headphones', 'emerald', 'live-support', 3),
  ('Browse FAQ', 'Find quick answers', 'BookOpen', 'purple', 'faq', 4)
) as defaults(label, description, icon, color, target_tab, sort_order)
where not exists (select 1 from public.support_center_quick_actions);
