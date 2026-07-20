// src/components/ChronoNexia.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import type { Era } from "../data/schedule";
import { CLUBS_DATA } from "../data/clubs";
import Chronometer from "./Chronometer";
import ClubsHub from "./ClubsHub";
import ClubPavilionSection from "./ClubPavilionSection";
import NexusGraphBackground from "./NexusGraphBackground";
import SponsorsSection from "./SponsorsSection";
import Footer from "./Footer";
import SymbitechIntro from "./SymbitechIntro";

interface ChronoNexiaProps {
  onSelectClub: (club: { id: string; name: string; era: "past" | "present" | "future" }) => void;
  onWhySponsor: () => void;
}

export default function ChronoNexia({ onSelectClub, onWhySponsor }: ChronoNexiaProps) {
  const [era, setEra] = useState<Era>("hero");
  const heroHubRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollYProgress: hubScrollProgress } = useScroll({
    target: heroHubRef,
    offset: ["start start", "end end"],
  });

  const eraRef = useRef<Era>(era);
  useEffect(() => {
    eraRef.current = era;
  }, [era]);

  useMotionValueEvent(hubScrollProgress, "change", (latest) => {
    if (eraRef.current === "hero" || eraRef.current === "hub") {
      if (latest < 0.35) {
        setEra("hero");
      } else {
        setEra("hub");
      }
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        }
        if (best) {
          const id = best.target.id;
          if (id === "hero-hub") {
            const progress = hubScrollProgress.get();
            setEra(progress < 0.35 ? "hero" : "hub");
          } else if (id) {
            setEra(id as Era);
          }
        }
      },
      { threshold: [0.15, 0.5, 0.8], rootMargin: "0px" }
    );

    const symbitechEl = document.getElementById("symbitech");
    if (symbitechEl) observer.observe(symbitechEl);

    const heroHubEl = document.getElementById("hero-hub");
    if (heroHubEl) observer.observe(heroHubEl);

    CLUBS_DATA.forEach((club) => {
      const el = document.getElementById(club.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hubScrollProgress]);

  const scrollToEra = (eraId: string) => {
    const el = document.getElementById(eraId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const indicatorTop = useTransform(scrollYProgress, [0, 1], ["0%", "98%"]);

  return (
    <div className="relative w-full">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-nexus-gradient origin-left z-50"
        style={{ scaleX }}
      />

      {/* Global Dynamic Node Network Background */}
      <NexusGraphBackground />

      {/* Fixed Backdrop Layer */}
      <div className="fixed inset-0 pointer-events-none z-[-20] select-none overflow-hidden">
        {/* Symbitech Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: era === "symbitech" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-void"
        >
          <div className="absolute inset-0 opacity-[0.06] bg-grid-cyan" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-future-glow blur-[60px] opacity-70" />
        </motion.div>

        {/* Hero Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: era === "hero" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-void"
        >
          <div className="absolute inset-0 opacity-[0.07] bg-grid-cyan" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-hero-glow blur-[40px]" />
        </motion.div>

        {/* Hub Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: era === "hub" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-void"
        >
          <div className="absolute inset-0 opacity-[0.05] bg-grid-cyan" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-hero-glow blur-[60px] opacity-80" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-future-glow blur-[60px] opacity-60" />
        </motion.div>

        {/* Past Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: era === "past" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-charcoal"
        >
          <div className="absolute inset-0 opacity-[0.12] mix-blend-screen bg-scanlines" />
          <div className="absolute inset-0 opacity-[0.04] bg-crt-vignette" />
        </motion.div>

        {/* Present Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: era === "present" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-void"
        >
          <div className="absolute inset-0 opacity-[0.04] bg-grid-cyan" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[80px] opacity-30" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)" }} />
        </motion.div>


        {/* Future Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: era === "future" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-void"
        >
          <div className="absolute inset-0 opacity-[0.06] bg-grid-purple" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-future-glow blur-[50px]" />
        </motion.div>
      </div>

      {/* Persistent Vertical Timeline Thread Sidebar */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-6 z-40 pointer-events-none">
        <div className="relative w-[1px] h-[240px] bg-white/10 flex flex-col justify-between items-center py-2">
          {/* Vertical progress fill */}
          <motion.div
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-nexus-gradient"
          />
          
          {/* Moving Indicator Node */}
          <motion.div
            style={{ 
              top: indicatorTop,
              boxShadow: era === "past" ? "0 0 10px #33ff00" : era === "present" ? "0 0 10px #2563eb" : era === "future" ? "0 0 10px #b026ff" : era === "symbitech" ? "0 0 10px #b026ff" : "0 0 10px #00f0ff"
            }}
            className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-10 transition-all duration-300 ${
              era === "past" ? "bg-term-green" : era === "present" ? "bg-techblue" : era === "future" || era === "symbitech" ? "bg-purple-400" : "bg-cyan-300"
            }`}
          />

          {/* Label anchors */}
          <div className="absolute right-4 top-[3%] flex items-center gap-2">
            <span className={`text-[10px] tracking-[0.2em] font-rajdhani font-semibold transition-all duration-300 ${
              era === "symbitech" ? "text-purple-300 scale-105" : "text-slate-500 opacity-60"
            }`}>SYMBI</span>
          </div>
          <div className="absolute right-4 top-[26%] flex items-center gap-2">
            <span className={`text-[10px] tracking-[0.2em] font-rajdhani font-semibold transition-all duration-300 ${
              era === "hero" || era === "hub" ? "text-cyan-300 scale-105" : "text-slate-500 opacity-60"
            }`}>NEXUS</span>
          </div>
          <div className="absolute right-4 top-[49%] flex items-center gap-2">
            <span className={`text-[10px] tracking-[0.2em] font-mono transition-all duration-300 ${
              era === "past" ? "text-term-green scale-105" : "text-slate-500 opacity-60"
            }`}>PAST</span>
          </div>
          <div className="absolute right-4 top-[72%] flex items-center gap-2">
            <span className={`text-[10px] tracking-[0.2em] font-inter transition-all duration-300 ${
              era === "present" ? "text-techblue scale-105 font-bold" : "text-slate-500 opacity-60"
            }`}>PRESENT</span>
          </div>
          <div className="absolute right-4 top-[95%] flex items-center gap-2">
            <span className={`text-[10px] tracking-[0.2em] font-grotesk transition-all duration-300 ${
              era === "future" ? "text-purple-300 scale-105 font-bold" : "text-slate-500 opacity-60"
            }`}>FUTURE</span>
          </div>
        </div>
      </div>

      <Chronometer era={era} />

      <div id="symbitech" className="relative z-10">
        <SymbitechIntro />
        <SponsorsSection onWhySponsor={onWhySponsor} />
      </div>
      
      <div id="hero-hub" ref={heroHubRef} className="relative z-10">
        <ClubsHub onScrollToEra={scrollToEra} />
      </div>

      {CLUBS_DATA.map((club, idx) => (
        <ClubPavilionSection
          key={club.id}
          club={club}
          isLast={idx === CLUBS_DATA.length - 1}
          onSelectClub={onSelectClub}
        />
      ))}

      <Footer />
    </div>
  );
}
