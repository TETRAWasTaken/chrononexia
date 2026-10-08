// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

/**
 * Custom Vite plugin to copy web-ready assets to dist/src/assets during production build.
 * Filters out unused multi-megabyte DSLR raw camera dumps in Photoshoot to keep the
 * total deployment bundle well under Azure Static Web Apps' 250 MB size threshold.
 */
function copySrcAssetsPlugin() {
  return {
    name: "copy-src-assets",
    closeBundle() {
      const srcAssets = path.resolve(process.cwd(), "src/assets");
      const distSrcAssets = path.resolve(process.cwd(), "dist/src/assets");

      if (fs.existsSync(srcAssets)) {
        fs.cpSync(srcAssets, distSrcAssets, {
          recursive: true,
          filter: (src) => {
            // If it's a file inside Photoshoot, only include web-ready photos (<= 1MB)
            // This includes all 35 team member images while skipping 130+ unused 6MB raw camera files
            if (src.includes("Photoshoot") && !fs.statSync(src).isDirectory()) {
              const size = fs.statSync(src).size;
              return size <= 1024 * 1024;
            }
            return true;
          },
        });
        console.log("✅ Successfully copied web-ready assets to dist/src/assets.");
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files if present, merged with system environment
  const env = loadEnv(mode, process.cwd(), "");

  const defaultUrl = "https://eralwgjyyjdzokshkssn.supabase.co";
  const defaultKey = "sb_publishable_YKtyKJcqCsBsiVGA1j3jDw_BmjDiuZu";

  const resolvedUrl =
    env.VITE_SUPABASE_URL ||
    env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    defaultUrl;

  const resolvedKey =
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    env.VITE_SUPABASE_ANON_KEY ||
    env.SUPABASE_PUBLISHABLE_KEY ||
    env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    defaultKey;

  return {
    plugins: [react(), copySrcAssetsPlugin()],
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(resolvedUrl),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(resolvedKey),
    },
  };
});
