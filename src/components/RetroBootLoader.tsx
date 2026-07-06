// src/components/RetroBootLoader.tsx
// Plays a CRT terminal boot sequence animation when mounted,
// then reveals its children once "BOOT COMPLETE" is reached.

import { useState, useEffect, useRef } from "react";

const BOOT_LINES = [
  { text: "BIOS v2.4.1 — ChronoNexia Systems Corp.", delay: 0 },
  { text: "Copyright (C) 1983, All Rights Reserved.", delay: 80 },
  { text: "", delay: 160 },
  { text: "Memory Test............... [ 640K OK ]", delay: 260 },
  { text: "Loading EPOCH-01 kernel........", delay: 420 },
  { text: "", delay: 600 },
  { text: "IRQ  0 — System Timer     [ OK ]", delay: 700 },
  { text: "IRQ  1 — Keyboard Ctrl    [ OK ]", delay: 820 },
  { text: "IRQ  3 — COM2: 9600 Baud  [ OK ]", delay: 940 },
  { text: "IRQ  6 — Floppy Disk Ctrl [ OK ]", delay: 1060 },
  { text: "IRQ 14 — Hard Disk Ctrl   [ OK ]", delay: 1180 },
  { text: "", delay: 1320 },
  { text: "Mounting /dev/hda1 (FAT12)... DONE", delay: 1440 },
  { text: "Loading RETRO.SYS ...............", delay: 1600 },
  { text: "Loading EVENTS.DAT ...............", delay: 1800 },
  { text: "", delay: 1960 },
  { text: "██████████████████████████  100%", delay: 2100, isBar: true },
  { text: "", delay: 2300 },
  { text: "▶  BOOT COMPLETE — ENTERING EPOCH 01", delay: 2450, isFinal: true },
];

interface RetroBootLoaderProps {
  children: React.ReactNode;
}

export default function RetroBootLoader({ children }: RetroBootLoaderProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [booting, setBooting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Trigger the boot sequence only once, when the section first scrolls into view
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !booting) {
          setBooting(true);
          observerRef.current?.disconnect();

          BOOT_LINES.forEach((line, i) => {
            const t = setTimeout(() => {
              setVisibleLines((v) => Math.max(v, i + 1));
              if (line.isFinal) {
                // After final line, wait a beat then reveal content
                const t2 = setTimeout(() => setDone(true), 700);
                timerRef.current.push(t2);
              }
            }, line.delay);
            timerRef.current.push(t);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observerRef.current.observe(ref.current);

    return () => {
      observerRef.current?.disconnect();
      timerRef.current.forEach(clearTimeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref} className="w-full">
      {/* Terminal boot screen — shown until done */}
      {!done && (
        <div
          className="font-mono text-term-green text-sm leading-relaxed px-2 py-4 min-h-[340px]"
          aria-live="polite"
          aria-label="System boot sequence"
        >
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`retro-boot-line ${
                line.isFinal
                  ? "text-term-amber font-bold tracking-widest mt-2 animate-pulse"
                  : line.isBar
                  ? "text-term-green tracking-widest"
                  : ""
              }`}
            >
              {line.text || "\u00A0" /* nbsp for blank lines */}
            </div>
          ))}
          {/* Blinking cursor on last line */}
          {!done && booting && (
            <span className="inline-block w-2 h-4 bg-term-green align-middle ml-0.5 animate-[blink_0.9s_step-end_infinite]" />
          )}
        </div>
      )}

      {/* Actual content — revealed after boot */}
      <div
        className={`transition-all duration-700 ${
          done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
