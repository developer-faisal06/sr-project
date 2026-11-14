create table if not exists public.system_settings (
  id text primary key default 'global_config',
  ai_chatbot_enabled boolean default true,
  ai_guest_access_enabled boolean default true,
  ai_logged_in_access_enabled boolean default true,
  ai_provider text default 'gemini',
  ai_model text default 'gemini-2.0-flash',
  ai_secret_name text default 'sr_ai_gemini_key',
  ai_system_prompt text default 'You are SR Investment Live Support. Never request passwords, OTPs, private keys, or payment secrets. Never guarantee profits. Transfer uncertain cases to human support.',
  notice_text text default 'Demo mode only.',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

insert into public.system_settings (
  id,
  ai_chatbot_enabled,
  ai_guest_access_enabled,
  ai_logged_in_access_enabled,
  ai_provider,
  ai_model,
  ai_secret_name,
  ai_system_prompt
)
values (
  'global_config',
  true,
  true,
  true,
  'gemini',
  'gemini-2.0-flash',
  'sr_ai_gemini_key',
  'You are SR Investment Live Support. Never request passwords, OTPs, private keys, or payment secrets. Never guarantee profits. Transfer uncertain cases to human support.'
)
on conflict (id) do nothing;

create table if not exists public.ai_chat_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id text null,
  guest_token text null,
  title text default 'Live Support Conversation',
  status text default 'OPEN',
  handoff_requested boolean default false,
  handoff_reason text null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.ai_chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.ai_chat_conversations(id) on delete cascade,
  sender_type text not null check (sender_type in ('USER','AI','SYSTEM')),
  content text not null,
  provider text null,
  model text null,
  created_at timestamptz default now()
);

create table if not exists public.ai_knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default 'General FAQ',
  content text not null,
  status text default 'PUBLISHED' check (status in ('DRAFT','PUBLISHED','ARCHIVED')),
  is_public boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id text null,
  subject text not null,
  category text default 'Live Chat',
  priority text default 'NORMAL',
  status text default 'OPEN',
  created_at timestamptz default now()
);

create table if not exists public.ai_provider_settings (
  id text primary key,
  provider text not null,
  model text not null,
  secret_name text,
  available_models jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Default provider rows so the admin "Live Support Control" panel has a current
-- provider/model/secret_name to edit even before the admin selects one.
insert into public.ai_provider_settings (id, provider, model, secret_name, available_models)
values
  ('ai_provider_gemini', 'gemini', 'gemini-2.0-flash', 'sr_ai_gemini_key', '[]'::jsonb),
  ('ai_provider_openrouter', 'openrouter', 'google/gemini-2.0-flash-001', 'sr_ai_openrouter_key', '[]'::jsonb),
  ('ai_provider_claude', 'claude', 'claude-sonnet-4-20250514', 'sr_ai_claude_key', '[]'::jsonb)
on conflict (id) do nothing;
