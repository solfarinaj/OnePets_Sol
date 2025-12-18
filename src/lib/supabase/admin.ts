import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';
import { supabaseServiceRoleKey, supabaseUrl } from '../config';

if (!supabaseServiceRoleKey) {
  throw new Error(
    'Missing SUPABASE_SERVICE_ROLE_KEY. Set it in your server environment.'
  );
}

export const createAdminClient = () =>
  createClient<Database>(supabaseUrl, supabaseServiceRoleKey);
