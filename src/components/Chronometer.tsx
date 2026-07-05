// src/components/Chronometer.tsx
import { AnimatePresence, motion } from "framer-motion";
import type { Era } from "../data/schedule";

interface ChronometerConfig {
  label: string;
  sub: string;
  fontClass: string;
  wrapperClass: string;
  glow: string;
}

const CONFIG: Record<Era, ChronometerConfig> = {
  hero: {
    label: "NEXUS",
    sub: "T+00:00:00",
    fontClass: "font-grotesk",
    wrapperClass: "border-cyan-400/40 text-cyan-300 bg-black/40",
    glow: "0 0 20px rgba(0,240,255,0.35)",
  },
  hub: {
    label: "TERMINAL",
    sub: "SELECT_EPOCH",
    fontClass: "font-grotesk",
    wrapperClass: "border-purple-400/40 text-purple-200 bg-black/40",
    glow: "0 0 20px rgba(176,38,255,0.35)",
  },
  past: {
    label: "EPOCH 01",
    sub: "REC-1987",
    fontClass: "font-vt323",
    wrapperClass: "border-[#33FF00]/50 text-[#33FF00] bg-black/60",
    glow: "0 0 12px rgba(51,255,0,0.4)",
  },
  present: {
    label: "EPOCH 02",
    sub: "LIVE · NOW",
    fontClass: "font-inter",
    wrapperClass: "border-blue-300 text-[#0F172A] bg-white/90",
    glow: "0 4px 20px rgba(37,99,235,0.18)",
  },
  future: {
    label: "EPOCH 03",
    sub: "T+∞",
    fontClass: "font-grotesk",
    wrapperClass: "border-purple-400/50 text-purple-200 bg-black/40",
    glow: "0 0 24px rgba(176,38,255,0.4)",
  },
};

interface ChronometerProps {
  era: Era;
}

export default function Chronometer({ era }: ChronometerProps) {
  const c = CONFIG[era];

  return (
    <div
      className="fixed top-5 right-4 sm:right-6 z-50 pointer-events-none select-none"
      aria-hidden="true"
    >
      <motion.div
        className={`flex flex-col items-end px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border backdrop-blur-md transition-colors duration-500 ${c.wrapperClass}`}
        animate={{ boxShadow: c.glow }}
        transition={{ duration: 0.6 }}
      >
        <div className="h-[14px] overflow-hidden flex items-center justify-end relative w-24">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${era}-label`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`absolute right-0 text-[10px] sm:text-xs tracking-[0.2em] ${c.fontClass}`}
            >
              {c.label}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="h-[20px] overflow-hidden flex items-center justify-end relative w-28 mt-0.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${era}-sub`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`absolute right-0 text-xs sm:text-sm tracking-widest ${c.fontClass} font-medium`}
            >
              {c.sub}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
