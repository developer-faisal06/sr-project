-- Fix: add RLS policies for the live support tables so the anon/publishable
-- key used by the frontend (and REST) can read/write the rows it needs.
alter table public.ai_provider_settings enable row level security;
alter table public.ai_chat_conversations enable row level security;
alter table public.ai_chat_messages enable row level security;
alter table public.ai_knowledge_documents enable row level security;
alter table public.support_tickets enable row level security;
alter table public.system_settings enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['ai_provider_settings','ai_chat_conversations','ai_chat_messages','ai_knowledge_documents','support_tickets','system_settings']
  loop
    execute format('drop policy if exists "Public all %1$s" on public.%1$s', t);
    execute format('create policy "Public all %1$s" on public.%1$s for all using (true)', t);
  end loop;
end $$;

-- Re-run the provider seed now that policies exist.
insert into public.ai_provider_settings (id, provider, model, secret_name, available_models)
values
  ('ai_provider_gemini', 'gemini', 'gemini-2.0-flash', 'sr_ai_gemini_key', '[]'::jsonb),
  ('ai_provider_openrouter', 'openrouter', 'google/gemini-2.0-flash-001', 'sr_ai_openrouter_key', '[]'::jsonb),
  ('ai_provider_claude', 'claude', 'claude-sonnet-4-20250514', 'sr_ai_claude_key', '[]'::jsonb)
on conflict (id) do nothing;