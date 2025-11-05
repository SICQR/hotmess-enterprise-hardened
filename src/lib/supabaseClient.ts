import { createClient } from "@supabase/supabase-js";

/**
 * Initialise and export a Supabase client. The URL and anon key come from
 * environment variables so they can be configured without changing code.
 *
 * To use Supabase, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in
 * your .env file (see .env.example). Never commit secrets to the repo.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
