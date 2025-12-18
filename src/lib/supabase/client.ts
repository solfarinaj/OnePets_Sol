import { createBrowserClient } from '@supabase/ssr';
import { supabaseAnonKey, supabaseUrl } from '../config';
import type { Database } from '../../types/supabase';

export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
