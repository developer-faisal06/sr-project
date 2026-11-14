-- Store user identity snapshots on support conversations so admin can identify
-- the sender even if the profile changes later.
alter table public.profiles add column if not exists avatar_url text;
alter table public.ai_chat_conversations add column if not exists user_name text;
alter table public.ai_chat_conversations add column if not exists user_email text;
alter table public.ai_chat_conversations add column if not exists user_avatar_url text;

-- Allow the frontend to save the authenticated user's own support identity.
-- Admins can read all profiles through the existing admin policy.
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles for select to authenticated
using (auth_user_id = (select auth.uid()) or (select private.is_admin()));
