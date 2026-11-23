-- ============================================================
-- SR Investment: Robust handle_new_auth_user trigger with exception handling
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, auth_user_id, name, email, role, status)
    VALUES (
      'SR' || upper(substr(replace(NEW.id::text, '-', ''), 1, 10)),
      NEW.id,
      COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
      lower(NEW.email),
      'user',
      'Active'
    )
    ON CONFLICT (email) DO UPDATE
      SET auth_user_id = EXCLUDED.auth_user_id,
          name = COALESCE(NULLIF(public.profiles.name, ''), EXCLUDED.name);
  EXCEPTION WHEN others THEN
    -- Prevent auth signup failure if profile insertion encounters constraint or RLS issues
    RAISE NOTICE 'Error in handle_new_auth_user trigger: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

REVOKE ALL ON FUNCTION public.handle_new_auth_user() FROM PUBLIC;
