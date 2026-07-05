// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Hero / Future — "The Nexus" + "Cybernetic"
        void: "#050510",
        cyan: {
          300: "#5CF4FF",
          400: "#00F0FF",
        },
        purple: {
          300: "#C76BFF",
          400: "#B026FF",
        },
        // Past — "Legacy Systems"
        charcoal: "#1E1E1E",
        "term-amber": "#FFB000",
        "term-green": "#33FF00",
        // Present — "Silicon Clean"
        offwhite: "#F8F9FA",
        deepslate: "#0F172A",
        techblue: "#2563EB",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
        vt323: ["VT323", "monospace"],
        inter: ["Inter", "sans-serif"],
        mono: ["Courier New", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
