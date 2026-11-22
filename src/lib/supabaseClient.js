import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ufqdmcejmdowhqwnluom.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_BCYpSJU69dGXmTikIXRe6A_Ekr8GTGS';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
}

