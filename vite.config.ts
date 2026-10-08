// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

/**
 * Custom Vite plugin to copy src/assets to dist/src/assets during production build.
 * Ensures dynamically-referenced database URLs (e.g. /src/assets/Photoshoot/IMG_5114.JPG)
 * are present in the final deployment distribution folder.
 */
function copySrcAssetsPlugin() {
  return {
    name: "copy-src-assets",
    closeBundle() {
      const srcAssets = path.resolve(process.cwd(), "src/assets");
      const distSrcAssets = path.resolve(process.cwd(), "dist/src/assets");
      const distAssetsPhotoshoot = path.resolve(process.cwd(), "dist/assets/Photoshoot");

      if (fs.existsSync(srcAssets)) {
        // Copy to dist/src/assets (matching /src/assets/... URLs from DB)
        fs.cpSync(srcAssets, distSrcAssets, { recursive: true });

        // Also ensure dist/assets/Photoshoot exists for /assets/Photoshoot/... URLs
        const photoshootSrc = path.join(srcAssets, "Photoshoot");
        if (fs.existsSync(photoshootSrc)) {
          fs.cpSync(photoshootSrc, distAssetsPhotoshoot, { recursive: true });
        }

        console.log("✅ Successfully copied src/assets to dist/src/assets for static deployment.");
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
