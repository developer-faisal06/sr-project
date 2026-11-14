import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Turn a raw Google API failure into a message the admin panel can actually act on.
function describeGeminiFailure(result: any, fallback: string) {
  const status = String(result?.error?.status || '');
  const message = String(result?.error?.message || fallback);

  if (/API key not valid|API_KEY_INVALID/i.test(message)) {
    return 'GEMINI_API_KEY is invalid or revoked. Create a new key at https://aistudio.google.com/apikey and update the Supabase secret.';
  }
  if (status === 'PERMISSION_DENIED' || status === 'UNAUTHENTICATED') {
    return `Gemini rejected this key (${status}). Check that the key is restricted to the Generative Language API. Details: ${message}`;
  }
  if (status === 'NOT_FOUND') {
    return `Gemini model not found. Update the "AI model" setting in Live Support Control. Details: ${message}`;
  }
  if (status === 'RESOURCE_EXHAUSTED') {
    return `Gemini quota exceeded for this key. Try another model or enable billing. Details: ${message}`;
  }
  return message;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await request.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      return json({ error: 'GEMINI_API_KEY secret is missing on the Supabase project. Run: npx supabase secrets set GEMINI_API_KEY=your_key' }, 400);
    }

    if (body.action === 'list_models') {
      const response = await fetch(`${GEMINI_BASE}/models?key=${apiKey}`);
      const result = await response.json();
      if (!response.ok) {
        return json({ error: describeGeminiFailure(result, 'Could not discover Gemini models.') }, 400);
      }
      const models = (result.models || [])
        .filter((model: any) => (model.supportedGenerationMethods || []).includes('generateContent'))
        .map((model: any) => ({
          name: model.name?.replace('models/', ''),
          displayName: model.displayName,
          inputTokenLimit: model.inputTokenLimit,
          outputTokenLimit: model.outputTokenLimit
        }));
      return json({ models });
    }

    const message = String(body.message || '').trim();
    const conversationId = body.conversation_id;
    if (!message || !conversationId) return json({ error: 'Message and conversation_id are required.' }, 400);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const handoffRequested = /\b(human|agent|person|representative|support team|talk to someone|real person)\b/i.test(message);
    if (handoffRequested) {
      await supabase.from('ai_chat_conversations').update({ status: 'WAITING_FOR_HUMAN', handoff_requested: true, handoff_reason: 'User requested human assistance', updated_at: new Date().toISOString() }).eq('id', conversationId);
      if (body.user_id) {
        await supabase.from('support_tickets').insert({ user_id: body.user_id, subject: 'Live Support Handoff', category: 'Live Chat', priority: 'NORMAL', status: 'OPEN' });
      }
    }

    const { data: settings, error: settingsError } = await supabase.from('system_settings').select('ai_chatbot_enabled, ai_system_prompt, ai_model').eq('id', 'global_config').maybeSingle();
    if (settingsError) return json({ error: `Could not read system_settings: ${settingsError.message}. Run the live support tables migration.` }, 400);
    if (settings?.ai_chatbot_enabled === false) return json({ error: 'Live Support is currently disabled. Enable it from Admin → Live Support Control.' }, 400);

    const { data: documents } = await supabase.from('ai_knowledge_documents').select('title, category, content').eq('status', 'PUBLISHED').eq('is_public', true).limit(20);
    const knowledge = (documents || []).map((doc) => `[${doc.category}] ${doc.title}\n${doc.content}`).join('\n\n');
    const systemPrompt = settings?.ai_system_prompt || 'You are SR Investment Live Support. Never request passwords, OTPs, private keys, or payment secrets. Never guarantee profits. Transfer uncertain cases to human support.';
    const model = settings?.ai_model || 'gemini-2.0-flash';
    const response = await fetch(`${GEMINI_BASE}/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nKnowledge:\n${knowledge}\n\nUser question:\n${message}` }] }] })
    });
    const result = await response.json();
    if (!response.ok) return json({ error: describeGeminiFailure(result, 'Gemini request failed.') }, 400);
    const answer = result?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || 'I could not generate an answer right now.';

    await supabase.from('ai_chat_messages').insert({ conversation_id: conversationId, sender_type: 'AI', content: answer, provider: 'gemini', model });
    return json({ answer, provider: 'gemini', model, handoff_requested: handoffRequested });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Live AI request failed.' }, 400);
  }
});
