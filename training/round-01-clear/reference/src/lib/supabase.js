import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn('Supabase runtime environment variables are not configured yet.');
}

export const supabase = createClient(url || 'http://localhost.invalid', anonKey || 'runtime-placeholder');
