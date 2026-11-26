import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase client for server‑side middleware (service role not needed for read‑only checks)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes – allow without auth
  const publicRoutes = ['/', '/about', '/contact', '/terms', '/privacy', '/api'];
  if (publicRoutes.some((r) => pathname.startsWith(r))) return NextResponse.next();

  // Check Supabase session cookie
  const cookie = request.cookies.get('sb-access-token'); // default Supabase cookie name
  if (!cookie) {
    // No auth – redirect to home (or a login page if you have one)
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Verify token (light check – supabase.auth.getUser can be used in server environment)
  try {
    const { data, error } = await supabase.auth.getUser(cookie.value);
    if (error || !data?.user) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    // User is authenticated – allow
    return NextResponse.next();
  } catch (e) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}

export async function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'], // protect these routes
};
