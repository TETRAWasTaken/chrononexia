import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string =
  import.meta.env.VITE_SUPABASE_URL || "https://eralwgjyyjdzokshkssn.supabase.co";

// Supports both the new Supabase "Publishable" key convention and the legacy "anon" key convention
const supabasePublishableKey: string =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "";

if (!supabasePublishableKey) {
  console.warn(
    "⚠️ [Supabase BaaS]: Neither VITE_SUPABASE_PUBLISHABLE_KEY nor VITE_SUPABASE_ANON_KEY is defined in .env.\n" +
      "Direct Supabase REST API requests require a publishable key to authenticate."
  );
}

/**
 * Global Supabase client instance for ChronoNexia BaaS architecture.
 * Communicates directly with Supabase REST API and Database endpoints.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabasePublishableKey || "dummy-publishable-key-placeholder"
);

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabasePublishableKey &&
      supabasePublishableKey !== "dummy-publishable-key-placeholder"
  );
};
