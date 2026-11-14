# SR Investment Live Support Setup Guide

This project already contains the live support UI and the backend Edge Function code, but the app shows this message because the Supabase Edge Function is not deployed and the required secret is not configured:

> Live Support server is not deployed. Deploy the live-support-chat Edge Function first.

## Why this happens

The frontend calls this function:

- `supabase.functions.invoke('live-support-chat', { body })`

The backend code is here:

- `supabase/functions/live-support-chat/index.ts`

That file requires:

- `GEMINI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

If the function is not deployed, the frontend throws the error above.

## Required setup

### 1) Login to Supabase CLI

Open terminal in the project root and run:

```bash
npx supabase login
```

### 2) Link your project

This project is already using this project reference:

```text
ufqdmcejmdowhqwnluom
```

Run:

```bash
npx supabase link --project-ref ufqdmcejmdowhqwnluom
```

### 3) Add Gemini secret

Add your Gemini API key to Supabase secrets:

```bash
npx supabase secrets set GEMINI_API_KEY=your_actual_gemini_key_here
```

If you want to set it in the dashboard instead, go to:

- Supabase Dashboard
- Project Settings
- Secrets
- Add `GEMINI_API_KEY`

### 4) Deploy the Edge Function

Run:

```bash
npx supabase functions deploy live-support-chat
```

### 5) Ensure database tables exist

Your schema file is already present:

- `supabase_schema.sql`

Run the SQL in Supabase SQL editor, or if your project already has those tables, then no extra work is required.

The live support flow depends on these tables:

- `system_settings`
- `ai_chat_conversations`
- `ai_chat_messages`
- `ai_knowledge_documents`
- `support_tickets`

### 6) Activate from admin panel

Open the app and go to:

- Admin Panel
- Live Support Control

Then:

- toggle AI ON
- choose provider/model
- save the system prompt
- publish FAQ documents

## Important note

The project already contains the UI and backend code. The missing step is deployment and secret setup on Supabase.

## Quick command sequence

Use this exact sequence after you have your Gemini API key:

```bash
cd e:\sr-investment-project
npx supabase login
npx supabase link --project-ref ufqdmcejmdowhqwnluom
npx supabase secrets set GEMINI_API_KEY=your_actual_gemini_key_here
npx supabase functions deploy live-support-chat
```

After that reload the app and the error should disappear.

## If deployment still fails

Check these things:

- you are logged in with `npx supabase login`
- your project reference is correct
- the `GEMINI_API_KEY` secret exists
- you are running commands from the project root
- the function folder exists: `supabase/functions/live-support-chat/index.ts`

## Repo references

- Frontend API call: `src/services/api.js`
- Admin UI: `src/components/admin/AiSupportControl.jsx`
- Edge function: `supabase/functions/live-support-chat/index.ts`
- Full schema: `supabase_schema.sql`
