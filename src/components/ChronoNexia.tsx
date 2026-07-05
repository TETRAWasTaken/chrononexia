// src/components/ChronoNexia.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import type { Era } from "../data/schedule";
import Chronometer from "./Chronometer";
import ClubsHub from "./ClubsHub";
import PastSection from "./PastSection";
import PresentSection from "./PresentSection";
import FutureSection from "./FutureSection";
import Footer from "./Footer";

interface SectionRef {
  ref: React.RefObject<HTMLDivElement>;
  id: Era;
}

export default function ChronoNexia() {
  const [era, setEra] = useState<Era>("hero");

  const heroHubRef = useRef<HTMLDivElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);
  const presentRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);

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
    const sections: SectionRef[] = [
      { ref: heroHubRef, id: "hero" },
      { ref: pastRef, id: "past" },
      { ref: presentRef, id: "present" },
      { ref: futureRef, id: "future" },
    ];

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
          if (best.target === heroHubRef.current) {
            const progress = hubScrollProgress.get();
            setEra(progress < 0.35 ? "hero" : "hub");
          } else {
            const match = sections.find((s) => s.ref.current === best!.target);
            if (match) setEra(match.id);
          }
        }
      },
      { threshold: [0.15, 0.5, 0.8], rootMargin: "0px" }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, [hubScrollProgress]);

  const scrollToPast = () => {
    pastRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPresent = () => {
    presentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFuture = () => {
    futureRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-nexus-gradient origin-left z-50"
        style={{ scaleX }}
      />

      {/* Fixed Backdrop Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 select-none overflow-hidden">
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
          className="absolute inset-0 bg-offwhite"
        />

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

      <Chronometer era={era} />
      <div ref={heroHubRef}>
        <ClubsHub
          onScrollToPast={scrollToPast}
          onScrollToPresent={scrollToPresent}
          onScrollToFuture={scrollToFuture}
        />
      </div>
      <PastSection ref={pastRef} />
      <PresentSection ref={presentRef} />
      <FutureSection ref={futureRef} />
      <Footer />
    </div>
  );
}
