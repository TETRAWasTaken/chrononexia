// src/components/PitchDeckPage.tsx
// Theme evolves across 4 epochs as you scroll — mirroring ChronoNexia's era system:
//   nexus  → void + cyan/purple grid  (Hero, About)
//   past   → charcoal + scanlines + terminal-green/amber  (Institute, Legacy)
//   present→ void + blue silicon glow  (Opportunity, Audience, Events, Visibility)
//   future → void + purple dominant + vivid cyan  (Tiers, Partners, Steps, CTA)

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "../styles/pitchdeck.css";

// ── Types ─────────────────────────────────────────────────────────────────────
type Epoch = "nexus" | "past" | "present" | "future";

interface PitchDeckPageProps {
  onBack: () => void;
}

// ── Section → Epoch map ────────────────────────────────────────────────────────
const SECTION_EPOCHS: Record<string, Epoch> = {
  "pd-hero":       "nexus",
  "pd-about":      "nexus",
  "pd-institute":  "past",
  "pd-legacy":     "past",
  "pd-opportunity":"present",
  "pd-audience":   "present",
  "pd-events":     "present",
  "pd-visibility": "present",
  "pd-tiers":      "future",
  "pd-partners":   "future",
  "pd-steps":      "future",
  "pd-contact":    "future",
};

// ── Per-epoch color tokens ─────────────────────────────────────────────────────
const EPOCH_STYLE = {
  nexus: {
    accent1: "#00f0ff",
    accent2: "#2563eb",
    gradient: "linear-gradient(90deg, #00f0ff, #2563eb)",
    eyebrow: "rgba(0,240,255,0.95)",
    eyebrowBorder: "rgba(0,240,255,0.3)",
    eyebrowBg: "rgba(0,240,255,0.08)",
    divider: "linear-gradient(90deg, #00f0ff, #2563eb)",
    cardBorder: "rgba(255,255,255,0.12)",
    cardBg: "rgba(255,255,255,0.04)",
    sub: "#cbd5e1", // Bright readable slate-300
  },
  past: {
    accent1: "#33ff00",
    accent2: "#ffb000",
    gradient: "linear-gradient(90deg, #33ff00, #ffb000)",
    eyebrow: "rgba(51,255,0,0.95)",
    eyebrowBorder: "rgba(51,255,0,0.35)",
    eyebrowBg: "rgba(51,255,0,0.08)",
    divider: "linear-gradient(90deg, #33ff00, #ffb000)",
    cardBorder: "rgba(51,255,0,0.2)",
    cardBg: "rgba(51,255,0,0.04)",
    sub: "#b4d8a8", // Bright terminal green-tinted text
  },
  present: {
    accent1: "#2563eb",
    accent2: "#06b6d4",
    gradient: "linear-gradient(90deg, #38bdf8, #06b6d4)",
    eyebrow: "rgba(56,189,248,0.95)",
    eyebrowBorder: "rgba(56,189,248,0.35)",
    eyebrowBg: "rgba(56,189,248,0.08)",
    divider: "linear-gradient(90deg, #38bdf8, #06b6d4)",
    cardBorder: "rgba(56,189,248,0.2)",
    cardBg: "rgba(37,99,235,0.05)",
    sub: "#cbd5e1", // Bright readable slate-300
  },
  future: {
    accent1: "#2563eb",
    accent2: "#00f0ff",
    gradient: "linear-gradient(90deg, #2563eb, #00f0ff)",
    eyebrow: "rgba(37,99,235,0.95)",
    eyebrowBorder: "rgba(37,99,235,0.35)",
    eyebrowBg: "rgba(37,99,235,0.08)",
    divider: "linear-gradient(90deg, #2563eb, #00f0ff)",
    cardBorder: "rgba(37,99,235,0.2)",
    cardBg: "rgba(37,99,235,0.05)",
    sub: "#e2e8f0", // Bright readable slate-200
  },
} as const;

// ── Animated Counter Hook ──────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  value, suffix = "", label, delay = 0, epoch,
}: { value: number; suffix?: string; label: string; delay?: number; epoch: Epoch }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(value, 2000, inView);
  const s = EPOCH_STYLE[epoch];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="pd-stat-card"
      style={{ borderColor: s.cardBorder, background: s.cardBg }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="pd-stat-number" style={{ background: s.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {count}{suffix}
      </div>
      <div className="pd-stat-label" style={{ color: s.sub }}>{label}</div>
    </motion.div>
  );
}

// ── Section Heading ────────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, accent, sub, epoch }: {
  eyebrow: string; title: string; accent?: string; sub?: string; epoch: Epoch;
}) {
  const s = EPOCH_STYLE[epoch];
  const isPast = epoch === "past";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="pd-eyebrow"
        style={{ color: s.eyebrow, borderColor: s.eyebrowBorder, background: s.eyebrowBg,
                 fontFamily: isPast ? "'VT323', monospace" : undefined, fontSize: isPast ? "0.9rem" : undefined }}
      >
        {isPast ? "█ " : "⬡ "}{eyebrow}
      </div>
      <h2
        className="pd-h2"
        style={{ fontFamily: isPast ? "'VT323', monospace" : undefined,
                 fontSize: isPast ? "clamp(2.5rem,6vw,4.5rem)" : undefined, letterSpacing: isPast ? "0.05em" : undefined }}
      >
        {title}{" "}
        {accent && (
          <span style={{ background: s.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {accent}
          </span>
        )}
      </h2>
      {sub && (
        <p style={{ fontFamily: isPast ? "'Courier New', monospace" : "Rajdhani, sans-serif",
                    color: s.sub, fontSize: "1rem", lineHeight: 1.7, maxWidth: "680px" }}>
          {sub}
        </p>
      )}
      <div className="pd-divider" style={{ background: s.divider }} />
    </motion.div>
  );
}

// ── Pillar Card ────────────────────────────────────────────────────────────────
function PillarCard({ num, title, desc, delay, epoch }: {
  num: string; title: string; desc: string; delay: number; epoch: Epoch;
}) {
  const s = EPOCH_STYLE[epoch];
  const isPast = epoch === "past";

  return (
    <motion.div
      className="pd-pillar"
      style={{ borderColor: s.cardBorder, background: s.cardBg }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="pd-pillar-num" style={{
        fontFamily: isPast ? "'VT323', monospace" : undefined,
        fontSize: isPast ? "3rem" : undefined,
        color: s.accent1,
        opacity: 0.35,
      }}>{num}</div>
      <div className="pd-pillar-title" style={{ fontFamily: isPast ? "'Courier New', monospace" : undefined }}>{title}</div>
      <div className="pd-pillar-desc" style={{ color: s.sub, fontFamily: isPast ? "'Courier New', monospace" : undefined }}>{desc}</div>
    </motion.div>
  );
}

// ── Bar Chart (Canvas) ─────────────────────────────────────────────────────────
function TierBarChart({ epoch }: { epoch: Epoch }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const s = EPOCH_STYLE[epoch];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bars = [
      { label: "Title", value: 150000, color: s.accent1 },
      { label: "Platinum", value: 50000, color: s.accent2 },
      { label: "Gold", value: 30000, color: epoch === "past" ? "#ffb000" : epoch === "present" ? "#06b6d4" : "#c76bff" },
      { label: "Silver", value: 20000, color: "#cbd5e1" },
    ];

    const W = canvas.width, H = canvas.height;
    const maxVal = 150000, barW = 44, gap = 28, paddingLeft = 20, paddingBottom = 48;
    const chartH = H - paddingBottom - 20;
    let startTime: number | null = null;

    function draw(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      ctx!.clearRect(0, 0, W, H);

      ctx!.strokeStyle = "rgba(255,255,255,0.08)";
      ctx!.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = 20 + chartH - (i / 4) * chartH;
        ctx!.beginPath(); ctx!.moveTo(paddingLeft, y); ctx!.lineTo(W - 10, y); ctx!.stroke();
      }

      bars.forEach((bar, i) => {
        const x = paddingLeft + i * (barW + gap);
        const bh = (bar.value / maxVal) * chartH * eased;
        const y = 20 + chartH - bh;
        const grd = ctx!.createLinearGradient(x, y, x, 20 + chartH);
        grd.addColorStop(0, bar.color);
        grd.addColorStop(1, bar.color + "22");
        ctx!.shadowBlur = 12; ctx!.shadowColor = bar.color;
        ctx!.fillStyle = grd;
        ctx!.beginPath(); ctx!.roundRect(x, y, barW, bh, [6, 6, 0, 0]); ctx!.fill();
        ctx!.shadowBlur = 0;
        ctx!.fillStyle = "rgba(226,232,240,0.9)";
        ctx!.font = "bold 11px 'Rajdhani', sans-serif";
        ctx!.textAlign = "center";
        ctx!.fillText(bar.label, x + barW / 2, H - 30);
        if (progress > 0.7) {
          ctx!.fillStyle = bar.color;
          ctx!.font = "bold 11px 'Space Grotesk', sans-serif";
          ctx!.fillText("₹" + (bar.value / 1000).toFixed(0) + "k", x + barW / 2, y - 6);
        }
      });

      if (progress < 1) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }, [inView, s.accent1, s.accent2, epoch]);

  return (
    <div ref={wrapRef} className="pd-canvas-wrap" style={{ borderColor: s.cardBorder, background: s.cardBg }}>
      <div className="pd-canvas-label" style={{ color: s.sub }}>Sponsorship Tiers</div>
      <canvas ref={canvasRef} width={300} height={220} />
    </div>
  );
}

// ── Doughnut Chart ─────────────────────────────────────────────────────────────
function AudienceDonut({ epoch }: { epoch: Epoch }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const s = EPOCH_STYLE[epoch];

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const segments = [
      { label: "Engineering UG", pct: 55, color: s.accent1 },
      { label: "AI / ML UG", pct: 20, color: s.accent2 },
      { label: "Faculty & Mentors", pct: 15, color: epoch === "present" ? "#34d399" : "#ffb000" },
      { label: "Industry & Alumni", pct: 10, color: epoch === "present" ? "#f59e0b" : "#33ff00" },
    ];

    const cx = canvas.width / 2, cy = canvas.height / 2 - 10, R = 80, r = 48;
    let startAngle = -Math.PI / 2, startTime: number | null = null;

    function draw(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 1600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      let angle = startAngle;
      segments.forEach((seg) => {
        const sweep = (seg.pct / 100) * 2 * Math.PI * eased;
        ctx!.beginPath(); ctx!.moveTo(cx, cy); ctx!.arc(cx, cy, R, angle, angle + sweep); ctx!.closePath();
        ctx!.shadowBlur = 10; ctx!.shadowColor = seg.color;
        ctx!.fillStyle = seg.color; ctx!.fill(); ctx!.shadowBlur = 0;
        angle += sweep;
      });

      ctx!.beginPath(); ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fillStyle = "#050510"; ctx!.fill();

      if (progress > 0.8) {
        ctx!.fillStyle = s.accent1;
        ctx!.font = "bold 16px 'Space Grotesk'"; ctx!.textAlign = "center";
        ctx!.fillText("600-700", cx, cy - 2);
        ctx!.fillStyle = "#cbd5e1";
        ctx!.font = "10px 'Rajdhani'"; ctx!.fillText("FOOTFALL", cx, cy + 14);
      }

      if (progress > 0.9) {
        segments.forEach((seg, i) => {
          const ly = canvas!.height - 64 + i * 14;
          ctx!.fillStyle = seg.color; ctx!.beginPath(); ctx!.arc(12, ly, 4, 0, Math.PI * 2); ctx!.fill();
          ctx!.fillStyle = "#cbd5e1"; ctx!.font = "11px 'Rajdhani'"; ctx!.textAlign = "left";
          ctx!.fillText(`${seg.label} (${seg.pct}%)`, 22, ly + 4);
        });
      }

      if (progress < 1) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }, [inView, s.accent1, s.accent2, epoch]);

  return (
    <div ref={wrapRef} className="pd-canvas-wrap" style={{ borderColor: s.cardBorder, background: s.cardBg }}>
      <div className="pd-canvas-label" style={{ color: s.sub }}>Audience Breakdown</div>
      <canvas ref={canvasRef} width={300} height={280} />
    </div>
  );
}

// ── Floating Particles ─────────────────────────────────────────────────────────
function Particles({ epoch }: { epoch: Epoch }) {
  const s = EPOCH_STYLE[epoch];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="pd-particle" style={{
          left: `${(i * 37 + 7) % 100}%`,
          bottom: `-${(i * 11) % 20}%`,
          width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
          background: i % 2 === 0 ? s.accent1 : s.accent2,
          opacity: 0.25 + (i % 4) * 0.08,
          animationDuration: `${8 + (i % 6) * 2}s`,
          animationDelay: `${(i % 8)}s`,
          transition: "background 1.2s ease",
        }} />
      ))}
    </div>
  );
}

// ── Fixed Background Overlays — identical to ChronoNexia's backdrop system ────
function EpochBackdrop({ epoch }: { epoch: Epoch }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* NEXUS: void + cyan grid + hero glow (Hero, About) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: epoch === "nexus" ? 1 : 0 }}
        transition={{ duration: 1.0 }}
        style={{ background: "#050510" }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(0,240,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.05) 1px,transparent 1px)",
          backgroundSize: "56px 56px", opacity: 0.8,
        }} />
        <div className="absolute" style={{
          top: "25%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,235,0.22) 0%,rgba(0,240,255,0.08) 45%,transparent 70%)",
          filter: "blur(40px)",
        }} />
      </motion.div>

      {/* PAST: charcoal + scanlines + terminal-green ambient (Institute, Legacy) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: epoch === "past" ? 1 : 0 }}
        transition={{ duration: 1.0 }}
        style={{ background: "#1a1c14" }}
      >
        {/* scanlines */}
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(0deg,rgba(51,255,0,0.04) 0px,transparent 1px,transparent 3px)",
          opacity: 0.9,
        }} />
        {/* terminal green ambient glow */}
        <div className="absolute" style={{
          top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(51,255,0,0.08) 0%,rgba(255,176,0,0.04) 50%,transparent 70%)",
          filter: "blur(60px)",
        }} />
        {/* CRT vignette */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,0.5) 100%)",
        }} />
      </motion.div>

      {/* PRESENT: void + silicon blue glow (Opportunity, Audience, Events, Visibility) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: epoch === "present" ? 1 : 0 }}
        transition={{ duration: 1.0 }}
        style={{ background: "#050510" }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute" style={{
          top: "33%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,235,0.18) 0%,rgba(6,182,212,0.08) 50%,transparent 70%)",
          filter: "blur(80px)", opacity: 0.9,
        }} />
      </motion.div>

      {/* FUTURE: void + tech blue dominant + vivid cyan (Tiers, Partners, Steps, CTA) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: epoch === "future" ? 1 : 0 }}
        transition={{ duration: 1.0 }}
        style={{ background: "#050510" }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.05) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute" style={{
          bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(37,99,235,0.22) 0%,rgba(0,240,255,0.1) 50%,transparent 70%)",
          filter: "blur(55px)",
        }} />
        <div className="absolute" style={{
          top: "10%", right: "15%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(0,240,255,0.12) 0%,transparent 70%)",
          filter: "blur(50px)",
        }} />
      </motion.div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function PitchDeckPage({ onBack }: PitchDeckPageProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [epoch, setEpoch] = useState<Epoch>("nexus");
  const epochRef = useRef<Epoch>("nexus");

  // Track which section is in view → derive epoch
  useEffect(() => {
    const ids = Object.keys(SECTION_EPOCHS);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const next = SECTION_EPOCHS[id];
            if (next !== epochRef.current) {
              epochRef.current = next;
              setEpoch(next);
            }
          }
        },
        { threshold: 0.3, rootMargin: "0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const s = EPOCH_STYLE[epoch];

  return (
    <div className="pd-page" style={{ position: "relative" }}>

      {/* ── Fixed backdrop layers (identical to ChronoNexia system) ── */}
      <EpochBackdrop epoch={epoch} />

      {/* ── Particles inherit epoch accent color ── */}
      <Particles epoch={epoch} />

      {/* ── Scroll progress bar (epoch-colored) ── */}
      <motion.div
        className="pd-progress-bar"
        style={{ scaleX, background: s.gradient }}
      />

      {/* ── Back button ── */}
      <button
        className="pd-back-btn"
        onClick={onBack}
        id="pd-back-btn"
        style={{ color: s.accent1, borderColor: `${s.accent1}50`, transition: "color 1s, border-color 1s" }}
      >
        ← Back to Site
      </button>

      {/* Epoch indicator dot (top-right, like ChronoNexia sidebar) */}
      <motion.div
        style={{
          position: "fixed", top: "1.25rem", right: "1.25rem",
          width: 10, height: 10, borderRadius: "50%",
          background: s.accent1,
          boxShadow: `0 0 12px ${s.accent1}`,
          zIndex: 100, transition: "background 1s ease, box-shadow 1s ease",
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* ================================================================ */}
      {/* SLIDE 1 — HERO  [epoch: nexus]                                   */}
      {/* ================================================================ */}
      <section className="pd-hero" id="pd-hero" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          <div className="pd-hero-badge">◈ SPONSORSHIP PROPOSAL · 2026 EDITION</div>

          <h1 className="pd-hero-title">
            SYMBI<span style={{ background: "linear-gradient(90deg,#00f0ff,#b026ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>TECH</span>
            <br />
            <span style={{ fontSize: "0.4em", color: "#cbd5e1", fontWeight: 700, WebkitTextFillColor: "#cbd5e1" }}>2026</span>
          </h1>

          <p className="pd-hero-sub" style={{ color: "#e2e8f0" }}>
            The Flagship Technical Festival of Symbiosis Institute of Technology, Pune —
            Re-accredited by NAAC with an 'A++' Grade · Category-I by UGC
          </p>

          <div className="pd-hero-tags">
            {[
              { key: "Format", val: "2-Day National-Level Fest" },
              { key: "Location", val: "SIT Campus, Lavale, Pune" },
              { key: "University", val: "Symbiosis International" },
            ].map((t) => (
              <div className="pd-hero-tag" key={t.key}>
                <span className="pd-hero-tag-key" style={{ color: "#00f0ff" }}>{t.key}</span>
                <span style={{ color: "#f1f5f9" }}>{t.val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="pd-scroll-hint">
          <span>Scroll to explore</span>
          <div className="pd-scroll-chevron" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 2 — ABOUT  [epoch: nexus]                                  */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-about">
          <SectionHeading eyebrow="About the Fest" title="More than a tech fest —" accent="an institutional legacy"
            sub="SymbiTech is the annual flagship technical festival of Symbiosis Institute of Technology (SIT), Pune — a two-day, multi-department showcase of innovation." epoch="nexus" />

          <div className="pd-stats-grid">
            <StatCard value={2500} suffix="+" label="Participants (single edition)" delay={0} epoch="nexus" />
            <StatCard value={2022} suffix="" label="National-Level Relaunch Year" delay={0.1} epoch="nexus" />
            <StatCard value={6} suffix="" label="Departments Co-hosting" delay={0.2} epoch="nexus" />
            <StatCard value={25} suffix="+" label="Competitions & Workshops" delay={0.3} epoch="nexus" />
          </div>

          <div className="pd-pillars">
            {[
              { num: "01", title: "Technical", desc: "Hackathons, coding contests, robotics & engineering challenges that push boundaries." },
              { num: "02", title: "Managerial", desc: "Event leadership, sponsorship, and operations experience for students." },
              { num: "03", title: "Industry-facing", desc: "Exhibitions, talks, and mentorship from corporate & R&D partners." },
            ].map((p, i) => <PillarCard key={p.num} {...p} delay={i * 0.12} epoch="nexus" />)}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 3 — HOST INSTITUTE  [epoch: past]                          */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-institute">
          <SectionHeading eyebrow="THE HOST INSTITUTE" title="Symbiosis Institute" accent="of Technology, Pune"
            sub="SIT is the flagship engineering institute under Symbiosis International (Deemed University), set on the scenic campus in Lavale, Pune." epoch="past" />

          <div className="pd-dept-grid">
            {[
              { icon: "💻", name: "Computer Science & IT" },
              { icon: "🤖", name: "AI & Machine Learning" },
              { icon: "📡", name: "Electronics & Telecom" },
              { icon: "⚙️", name: "Mechanical Engineering" },
              { icon: "🏗️", name: "Civil Engineering" },
              { icon: "🦾", name: "Robotics & Automation" },
            ].map((d, i) => (
              <motion.div key={d.name} className="pd-dept-card"
                style={{ borderColor: EPOCH_STYLE.past.cardBorder, background: EPOCH_STYLE.past.cardBg }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="pd-dept-icon" style={{ borderColor: EPOCH_STYLE.past.cardBorder, background: EPOCH_STYLE.past.cardBg }}>{d.icon}</div>
                <div className="pd-dept-name" style={{ fontFamily: "'Courier New',monospace", color: "#e2e8f0" }}>{d.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 4 — LEGACY TIMELINE  [epoch: past]                         */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-legacy">
          <SectionHeading eyebrow="LEGACY" title="A festival that keeps" accent="scaling up" epoch="past" />

          <div className="pd-timeline">
            {[
              { year: "2022", heading: "First National-Level Edition", desc: "2000+ participants. Principal sponsor: Bajaj Finserv Health. Guests included DRDO's Dr. Shailendra Gade." },
              { year: "2023", heading: '"Ecogenesis"', desc: "When Technology Meets Sustainability. Held 20–21 September, spotlighting green-tech innovation." },
              { year: "2025", heading: "Latest Edition", desc: "Held 24–25 January. Inaugurated by Dr. Ketan Kotecha with industry AI leadership in attendance." },
              { year: "2026", heading: "This Edition →", desc: "Bigger footprint, more verticals, and a refreshed sponsor experience." },
            ].map((item, i) => (
              <motion.div key={item.year} className="pd-timeline-item"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="pd-timeline-dot" style={{ background: EPOCH_STYLE.past.gradient, boxShadow: `0 0 12px ${EPOCH_STYLE.past.accent1}` }} />
                <div className="pd-timeline-card" style={{ borderColor: EPOCH_STYLE.past.cardBorder, background: EPOCH_STYLE.past.cardBg }}>
                  <div className="pd-timeline-year" style={{
                    color: EPOCH_STYLE.past.accent1,
                    fontFamily: "'VT323',monospace",
                    fontSize: "2.2rem",
                  }}>{item.year}</div>
                  <div className="pd-timeline-heading" style={{ fontFamily: "'Courier New',monospace", color: "#f1f5f9" }}>{item.heading}</div>
                  <div className="pd-timeline-desc" style={{ color: EPOCH_STYLE.past.sub, fontFamily: "'Courier New',monospace", fontSize: "0.88rem" }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 5 — THE OPPORTUNITY  [epoch: present]                       */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-opportunity">
          <SectionHeading eyebrow="The Opportunity" title="Why partner with" accent="SymbiTech" epoch={epoch} />
          <div className="pd-pillars">
            {[
              { num: "1", title: "Direct Access to Future Talent", desc: "Engage engineering, CS, and AI/ML students early — for hiring pipelines, internships, and campus programs." },
              { num: "2", title: "High-Intent, Tech-Fluent Audience", desc: "Attendees actively participate in hackathons and competitions built around your product category." },
              { num: "3", title: "Multi-Format Brand Visibility", desc: "On-ground branding, stage mentions, digital promotion, and exhibition space in one package." },
              { num: "4", title: "Proven Institutional Legacy", desc: "A fest with multi-year track record, NAAC A++ backing, and consistent national-level participation." },
            ].map((p, i) => (
              <motion.div key={p.num} className="pd-pillar"
                style={{ borderColor: s.cardBorder, background: s.cardBg }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="pd-pillar-num" style={{ color: s.accent1, opacity: 0.35 }}>{p.num}</div>
                <div className="pd-pillar-title" style={{ color: "#f8fafc" }}>{p.title}</div>
                <div className="pd-pillar-desc" style={{ color: s.sub }}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 6 — AUDIENCE & REACH  [epoch: present]                     */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-audience">
          <SectionHeading eyebrow="Audience & Reach" title="Who you'll be" accent="in front of" epoch={epoch} />

          <div className="pd-chart-wrap">
            <AudienceDonut epoch={epoch} />
            <div style={{ maxWidth: "400px" }}>
              <div className="pd-stats-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <StatCard value={700} suffix="+" label="Footfall over 2 days" delay={0} epoch={epoch} />
                <StatCard value={25} suffix="+" label="Competitions & Workshops" delay={0.1} epoch={epoch} />
                <StatCard value={6} suffix="" label="Departments Involved" delay={0.2} epoch={epoch} />
                <StatCard value={2} suffix=" Days" label="On-Campus Fest Format" delay={0.3} epoch={epoch} />
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                style={{ padding: "1.25rem", borderRadius: "12px", border: `1px solid ${s.cardBorder}`, background: s.cardBg, marginTop: "1rem" }}
              >
                <p style={{ fontFamily: "Rajdhani,sans-serif", fontSize: "0.9rem", color: s.sub, lineHeight: 1.7 }}>
                  <span style={{ color: s.accent1 }}>◈</span> Engineering & AI/ML undergraduates from SIT and visiting colleges<br />
                  <span style={{ color: s.accent1 }}>◈</span> Hackathon participants with hands-on project experience<br />
                  <span style={{ color: s.accent1 }}>◈</span> Faculty, mentors, and department heads across six disciplines<br />
                  <span style={{ color: s.accent1 }}>◈</span> Industry guests, alumni, and media
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 7 — EVENTS  [epoch: present]                               */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-events">
          <SectionHeading eyebrow="What Happens on Ground" title="Marquee events across" accent="six verticals" epoch={epoch} />

          <div className="pd-events-grid">
            {[
              { icon: "🤖", title: "Robotics & Automation", items: ["RoboRace — autonomous & RC robot navigation challenge"] },
              { icon: "🏗️", title: "Civil Engineering", items: ["Bridge design contests", "Crane-o-Mania", "Smart City model-making"] },
              { icon: "💻", title: "Coding & CS", items: ["CodeWars", "CodeRush", "Competitive programming rounds"] },
              { icon: "🗣️", title: "Diplomacy & Ideation", items: ["Tech MUN", "Cross-disciplinary case challenges"] },
              { icon: "🧩", title: "Puzzles & Gaming", items: ["Decrypt treasure hunt", "PuzzleMania", "LAN gaming"] },
              { icon: "🏢", title: "Industry Exhibition", items: ["Product showcases and demos from corporate & R&D partners"] },
            ].map((ev, i) => (
              <motion.div key={ev.title} className="pd-event-card"
                style={{ borderColor: s.cardBorder, background: s.cardBg }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="pd-event-icon" style={{ borderColor: s.cardBorder, background: s.cardBg }}>{ev.icon}</div>
                <div className="pd-event-title" style={{ color: "#f8fafc" }}>{ev.title}</div>
                <div className="pd-event-items">
                  {ev.items.map((it) => (
                    <div key={it} className="pd-event-item" style={{ color: s.sub }}>
                      <span style={{ color: s.accent1, marginRight: "0.25rem" }}>›</span>{it}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 8 — VISIBILITY PACKAGE  [epoch: present]                   */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-visibility">
          <SectionHeading eyebrow="Visibility Package" title="Where your brand" accent="shows up"
            sub="Every sponsorship package delivers multi-channel exposure across the entire event lifecycle." epoch={epoch} />

          <div className="pd-visibility-grid">
            {[
              { phase: "🌐 Before the Fest", cls: "pd-vis-before", items: ["Logo on website & registration portal","Social media promotion across event pages","Mentions in press releases & college bulletins"] },
              { phase: "🎤 During the Fest", cls: "pd-vis-during", items: ["Stage backdrop & banner placement","Exhibition booth / product demo space","Announcer mentions during inauguration & finals"] },
              { phase: "📊 After the Fest",  cls: "pd-vis-after",  items: ["Feature in the post-event report","Photo & video coverage credit","Access to participant contact list (with consent)"] },
            ].map((col, i) => (
              <motion.div key={col.phase} className={`pd-vis-col ${col.cls}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="pd-vis-header">{col.phase}</div>
                <div className="pd-vis-body">
                  {col.items.map((item) => (
                    <div key={item} className="pd-vis-item">
                      <div className="pd-vis-check">✓</div>{item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 9 — SPONSORSHIP TIERS  [epoch: future]                     */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-tiers">
          <SectionHeading eyebrow="Partnership Options" title="Sponsorship" accent="Tiers"
            sub="Choose the package that fits your goals. Early partners get priority on branding placement and category exclusivity." epoch={epoch} />

          <div className="pd-chart-wrap" style={{ marginBottom: "2.5rem" }}>
            <TierBarChart epoch={epoch} />
          </div>

          <div className="pd-tiers-grid">
            {[
              { cls: "title-tier",    badge: "👑 Title Sponsor",  price: "₹1,50,000", sub: "All-inclusive package",
                benefits: [{ text: "Logo placement — title billing", inc: true },{ text: "Logo on all marketing collateral", inc: true },
                  { text: "Premium exhibition / branding space", inc: true },{ text: "Stage mentions", inc: true },
                  { text: "Social media features", inc: true },{ text: "Complimentary passes", inc: true }] },
              { cls: "platinum-tier", badge: "💎 Platinum",        price: "₹50,000",  sub: "Premium visibility",
                benefits: [{ text: "Logo placement — title billing", inc: false },{ text: "Logo on all marketing collateral", inc: true },
                  { text: "Standard exhibition / branding space", inc: true },{ text: "Stage mentions", inc: true },
                  { text: "Social media features", inc: true },{ text: "Complimentary passes", inc: true }] },
              { cls: "gold-tier",     badge: "🥇 Gold",            price: "₹30,000",  sub: "Brand presence",
                benefits: [{ text: "Logo placement — title billing", inc: false },{ text: "Logo on all marketing collateral", inc: true },
                  { text: "Standard exhibition / branding space", inc: true },{ text: "Stage mentions", inc: false },
                  { text: "Social media features", inc: true },{ text: "Complimentary passes", inc: true }] },
              { cls: "silver-tier",   badge: "🥈 Silver",          price: "₹20,000",  sub: "Digital presence",
                benefits: [{ text: "Logo placement — title billing", inc: false },{ text: "Logo on all marketing collateral", inc: false },
                  { text: "Exhibition / branding space", inc: false },{ text: "Stage mentions", inc: false },
                  { text: "Social media features", inc: true },{ text: "Complimentary passes", inc: true }] },
            ].map((tier, i) => (
              <motion.div key={tier.cls} className={`pd-tier-card ${tier.cls}`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="pd-tier-badge">{tier.badge}</div>
                <div>
                  <div className="pd-tier-price">{tier.price}</div>
                  <div className="pd-tier-price-sub">{tier.sub}</div>
                </div>
                <div className="pd-tier-benefits">
                  {tier.benefits.map((b) => (
                    <div key={b.text} className={`pd-tier-benefit ${b.inc ? "included" : ""}`}>
                      <div className={`pd-benefit-dot ${b.inc ? "" : "excluded"}`} />{b.text}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="pd-food-banner"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span>🍽️</span>
            <span><strong>Food Companies:</strong> Special stall registration fee of ₹5,000–₹6,000 with complimentary coupons provided.</span>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 10 — IN GOOD COMPANY  [epoch: future]                      */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-partners">
          <SectionHeading eyebrow="In Good Company" title="Organizations that have" accent="partnered with SymbiTech" epoch={epoch} />

          <div className="pd-pillars" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
            {[
              { name: "Bajaj Finserv Health", year: "2022", emoji: "🏥" },
              { name: "DRDO", year: "2022", emoji: "🔬" },
              { name: "Industry Partners", year: "2023", emoji: "🏭" },
              { name: "AI Leadership", year: "2025", emoji: "🤖" },
            ].map((p, i) => (
              <motion.div key={p.name} className="pd-pillar"
                style={{ textAlign: "center", alignItems: "center", display: "flex", flexDirection: "column", gap: "0.5rem",
                         borderColor: s.cardBorder, background: s.cardBg }}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div style={{ fontSize: "2.5rem" }}>{p.emoji}</div>
                <div className="pd-pillar-title" style={{ color: "#f8fafc" }}>{p.name}</div>
                <div style={{ fontFamily: "'VT323',monospace", color: s.accent1, fontSize: "1.3rem" }}>{p.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 11 — NEXT STEPS  [epoch: future]                           */}
      {/* ================================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="pd-section" id="pd-steps">
          <SectionHeading eyebrow="Next Steps" title="How to come" accent="on board" epoch={epoch} />

          <div className="pd-steps">
            {[
              { num: "01", title: "Choose a Tier", desc: "Pick the sponsorship package that fits your goals and budget." },
              { num: "02", title: "Confirm & Sign", desc: "Sign the sponsorship agreement and complete the commitment." },
              { num: "03", title: "We Activate", desc: "Our team builds your branding and marketing plan into the event." },
              { num: "04", title: "Fest Days", desc: "Your brand goes live on-ground and across all our channels." },
            ].map((step, i) => (
              <motion.div key={step.num} className="pd-step"
                style={{ borderColor: s.cardBorder, background: s.cardBg }}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="pd-step-num"
                  style={{ background: `linear-gradient(135deg,${s.accent1}20,${s.accent2}20)`, border: `1px solid ${s.accent1}35`, color: s.accent1 }}>
                  {step.num}
                </div>
                <div className="pd-step-title">{step.title}</div>
                <div className="pd-step-desc" style={{ color: s.sub }}>{step.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div className="pd-urgency"
            style={{ borderColor: `${s.accent2}30`, background: `${s.accent2}08` }}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
          >
            ⚡ <strong style={{ color: s.accent1 }}>Interested? Let's talk timelines.</strong> We're finalizing our sponsor roster before the event.{" "}
            <strong style={{ color: s.accent2 }}>Early partners get priority</strong> on branding placement and category exclusivity.
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SLIDE 12 — CTA / CONTACT  [epoch: future]                        */}
      {/* ================================================================ */}
      <section className="pd-cta" id="pd-contact" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div className="pd-eyebrow" style={{ color: s.eyebrow, borderColor: s.eyebrowBorder, background: s.eyebrowBg }}>
            ⬡ Let's Connect
          </div>
          <h2 className="pd-h2" style={{ textAlign: "center" }}>
            Let's build{" "}
            <span style={{ background: s.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              SymbiTech 2026
            </span>
            <br />together.
          </h2>
          <p style={{ fontFamily: "Rajdhani,sans-serif", color: s.sub, maxWidth: "500px", lineHeight: 1.7, marginTop: "0.5rem" }}>
            SymbiTech · Symbiosis Institute of Technology, Pune
          </p>

          <div className="pd-contact-cards">
            {[
              { icon: "✉️", label: "Email",     val: "symbitech@sitpune.edu.in" },
              { icon: "🌐", label: "Website",   val: "symbitech.sitpune.edu.in" },
              { icon: "📸", label: "Instagram", val: "@symbitech" },
              { icon: "📞", label: "Phone",     val: "+91 20 6693 6900" },
            ].map((c) => (
              <div key={c.label} className="pd-contact-card"
                style={{ borderColor: s.cardBorder, background: s.cardBg, transition: "border-color 0.3s" }}
              >
                <span className="pd-contact-icon">{c.icon}</span>
                <div>
                  <div className="pd-contact-label" style={{ color: "#94a3b8" }}>{c.label}</div>
                  <div className="pd-contact-value" style={{ color: "#f8fafc" }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>

          <motion.button
            id="pd-back-cta-btn"
            className="sp-why-btn"
            style={{ marginTop: "2.5rem", borderColor: `${s.accent1}55`, color: s.accent1 }}
            onClick={onBack}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>← Return to ChronoNexia</span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
