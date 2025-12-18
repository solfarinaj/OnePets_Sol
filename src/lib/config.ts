/**
 * Centralized environment configuration for Supabase.
 * Uses static access to NEXT_PUBLIC_* for browser builds, with server fallbacks.
 */
const resolvedSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const resolvedSupabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!resolvedSupabaseUrl) {
  throw new Error(
    'Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (and SUPABASE_URL for server).'
  );
}

if (!resolvedSupabaseAnonKey) {
  throw new Error(
    'Missing Supabase anon key. Set NEXT_PUBLIC_SUPABASE_ANON_KEY (and SUPABASE_ANON_KEY for server).'
  );
}

export const supabaseUrl = resolvedSupabaseUrl;
export const supabaseAnonKey = resolvedSupabaseAnonKey;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const isDev = process.env.NODE_ENV !== 'production';
