import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseAnonKey, supabaseUrl } from '../config';
import type { Database } from '../../types/supabase';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set({
              name,
              value,
              ...options,
            })
          );
        } catch {
          // In server components cookies() may be read-only; ignore set errors there.
        }
      },
    },
  });
}
