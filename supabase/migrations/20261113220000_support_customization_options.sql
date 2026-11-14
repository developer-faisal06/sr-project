alter table public.system_settings add column if not exists support_theme text default 'navy-gold';
alter table public.system_settings add column if not exists support_primary_color text default '#071738';
alter table public.system_settings add column if not exists support_accent_color text default '#fbbf24';
alter table public.system_settings add column if not exists support_header_color text default '#0e3b91';
alter table public.system_settings add column if not exists support_user_bubble_color text default '#fbbf24';
alter table public.system_settings add column if not exists support_agent_bubble_color text default '#0c265e';
alter table public.system_settings add column if not exists support_text_color text default '#f8fafc';
alter table public.system_settings add column if not exists support_widget_position text default 'bottom-right';
alter table public.system_settings add column if not exists support_widget_size text default 'standard';
alter table public.system_settings add column if not exists support_border_radius text default 'large';
alter table public.system_settings add column if not exists support_open_animation text default 'slide-up';
alter table public.system_settings add column if not exists support_message_animation text default 'fade';
alter table public.system_settings add column if not exists support_button_animation text default 'pulse';
alter table public.system_settings add column if not exists support_animation_speed text default 'normal';
alter table public.system_settings add column if not exists support_time_format text default '24-hour';
alter table public.system_settings add column if not exists support_date_format text default 'DD/MM/YYYY';
alter table public.system_settings add column if not exists support_language text default 'en';
alter table public.system_settings add column if not exists support_quick_replies_enabled boolean default true;
alter table public.system_settings add column if not exists support_typing_indicator_enabled boolean default true;
alter table public.system_settings add column if not exists support_auto_scroll_enabled boolean default true;
alter table public.system_settings add column if not exists support_realtime_enabled boolean default true;

create table if not exists public.support_quick_replies (
  id bigserial primary key,
  label text not null,
  message text not null,
  language_code text default 'en',
  enabled boolean default true,
  sort_order integer default 1,
  created_at timestamptz default now()
);
alter table public.support_quick_replies enable row level security;
drop policy if exists "Public all support_quick_replies" on public.support_quick_replies;
create policy "Public all support_quick_replies" on public.support_quick_replies for all using (true);
