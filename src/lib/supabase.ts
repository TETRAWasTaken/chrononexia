import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Production defaults (used if .env is missing in root or not injected via CI/CD build)
const DEFAULT_SUPABASE_URL = "https://eralwgjyyjdzokshkssn.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_YKtyKJcqCsBsiVGA1j3jDw_BmjDiuZu";

const supabaseUrl: string =
  import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;

// Supports modern publishable key, legacy anon key, or project fallback default
const supabasePublishableKey: string =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY;

if (!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY && !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.info(
    "ℹ️ [Supabase BaaS]: No .env key detected; using default project credentials."
  );
}

/**
 * Global Supabase client instance for ChronoNexia BaaS architecture.
 * Communicates directly with Supabase REST API and Database endpoints.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabasePublishableKey
);

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabasePublishableKey);
};
