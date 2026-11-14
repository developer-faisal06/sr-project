-- Seed default AI provider rows for the Live Support Control admin panel.
insert into public.ai_provider_settings (id, provider, model, secret_name, available_models)
values
  ('ai_provider_gemini', 'gemini', 'gemini-2.0-flash', 'sr_ai_gemini_key', '[]'::jsonb),
  ('ai_provider_openrouter', 'openrouter', 'google/gemini-2.0-flash-001', 'sr_ai_openrouter_key', '[]'::jsonb),
  ('ai_provider_claude', 'claude', 'claude-sonnet-4-20250514', 'sr_ai_claude_key', '[]'::jsonb)
on conflict (id) do nothing;