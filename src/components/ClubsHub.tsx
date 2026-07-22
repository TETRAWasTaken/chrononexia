// src/components/ClubsHub.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, Terminal as TermIcon, Code, ChevronDown, Sparkles } from "lucide-react";
import { CLUBS_DATA } from "../data/clubs";

interface ClubsHubProps {
  onScrollToEra: (eraId: string) => void;
}

export default function ClubsHub({ onScrollToEra }: ClubsHubProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroScrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);


  // Hub Content animations (fades in and then fades out near scroll exit)
  const hubOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.8, 0.95], [0, 1, 1, 0]);
  const hubY = useTransform(scrollYProgress, [0.3, 0.45], [40, 0]);

  // Cards staggered layers animations (opacity + scale + dynamic slide translation)
  const card1Opacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const card1Scale = useTransform(scrollYProgress, [0.4, 0.55], [0.85, 1]);
  const card1Y = useTransform(scrollYProgress, [0.4, 0.55], [60, 0]);

  const card2Opacity = useTransform(scrollYProgress, [0.48, 0.63], [0, 1]);
  const card2Scale = useTransform(scrollYProgress, [0.48, 0.63], [0.85, 1]);
  const card2Y = useTransform(scrollYProgress, [0.48, 0.63], [60, 0]);

  const card3Opacity = useTransform(scrollYProgress, [0.56, 0.71], [0, 1]);
  const card3Scale = useTransform(scrollYProgress, [0.56, 0.71], [0.85, 1]);
  const card3Y = useTransform(scrollYProgress, [0.56, 0.71], [60, 0]);

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.72, 0.85, 0.9, 0.95], [0, 1, 1, 0]);

  const cardTransforms = [
    { opacity: card1Opacity, scale: card1Scale, y: card1Y },
    { opacity: card2Opacity, scale: card2Scale, y: card2Y },
    { opacity: card3Opacity, scale: card3Scale, y: card3Y },
  ];

  const icons = {
    terminal: TermIcon,
    code: Code,
    cpu: Cpu,
  };

  return (
    <div ref={containerRef} className="relative w-full h-[220vh] bg-transparent z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6">
        
        {/* ========================================== */}
        {/* PHASE 1: HERO CONTAINER                    */}
        {/* ========================================== */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="flex flex-col items-center text-center pointer-events-none select-none"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span className="font-rajdhani text-xs sm:text-sm tracking-[0.3em] text-cyan-200 uppercase">
              One Point. Every Era.
            </span>
          </div>

          <h1 className="font-grotesk font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] text-hero-text">
            Chrono
            <span className="bg-clip-text text-transparent bg-nexus-gradient">
              Nexia
            </span>
          </h1>

          <p className="font-rajdhani text-lg sm:text-xl md:text-2xl mt-6 max-w-2xl text-slate-300">
            Every age of computing collapses into a single nexus.
            <br className="hidden sm:block" />
            Scroll to travel through time.
          </p>
        </motion.div>


        {/* ========================================== */}
        {/* PHASE 2: CLUBS HUB LAYOUT                  */}
        {/* ========================================== */}
        <motion.div
          style={{ opacity: hubOpacity, y: hubY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 max-w-6xl mx-auto pointer-events-auto"
        >
          {/* Hub Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border border-cyan-400/30 bg-cyan-400/5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-grotesk text-[10px] sm:text-xs tracking-[0.2em] text-cyan-200 uppercase">
                SYSTEM INTERFACE // SELECT ERA
              </span>
            </div>
            <h2 className="font-grotesk font-bold text-3xl sm:text-5xl tracking-tight text-hero-text">
              Choose Your
              <span className="bg-clip-text text-transparent bg-nexus-gradient ml-2 sm:ml-3">
                Pavilion
              </span>
            </h2>
            <p className="font-rajdhani text-sm sm:text-base text-slate-400 mt-2 max-w-md mx-auto">
              Select a club to dynamically transition to their chronological events pavilion.
            </p>
          </div>

          {/* Staggered Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
            {CLUBS_DATA.map((club, idx) => {
              const Icon = icons[club.iconName];
              const transform = cardTransforms[idx];
              const onClick = () => onScrollToEra(club.id);

              return (
                <motion.div
                  key={club.id}
                  style={transform}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/10 bg-nexus-card backdrop-blur-xl group transition-all duration-300 cursor-pointer"
                  onClick={onClick}
                >
                  <div>
                    {/* Club Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-nexus-gradient-soft border border-white/5">
                        <Icon className="w-5 h-5 text-cyan-300" strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] tracking-wider px-2 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-slate-400">
                        {club.codename}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-grotesk font-bold text-xl text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {club.name}
                    </h3>
                    <p className="font-rajdhani text-xs text-cyan-200/70 tracking-wide mt-1 mb-4">
                      {club.tagline}
                    </p>
                    <p className="font-rajdhani text-sm text-slate-400 leading-relaxed">
                      {club.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick();
                    }}
                    aria-label={`Enter ${club.name} Pavilion`}
                    className="mt-8 w-full font-grotesk font-semibold text-xs tracking-wider py-3 border border-cyan-400/30 text-cyan-300 bg-cyan-400/5 hover:bg-nexus-gradient hover:text-white hover:border-transparent rounded-xl transition-all duration-300 shadow-sm"
                  >
                    ENTER PAVILION
                  </button>

                  {/* Card Glow Highlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${club.glowColor}, transparent 70%)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Hero scroll initiate indicator */}
        <motion.div
          style={{ opacity: heroScrollIndicatorOpacity }}
          className="absolute bottom-10 flex flex-col items-center gap-3 pointer-events-none z-10"
        >
          <span className="font-rajdhani text-[10px] tracking-[0.3em] text-cyan-300 uppercase animate-pulse">
            Scroll to Initiate
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400/50 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-0 w-full h-[30%] bg-cyan-300"
            />
          </div>
        </motion.div>

        {/* Phase scroll exit indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-6 flex flex-col items-center gap-1.5 pointer-events-none z-10"
        >
          <span className="font-rajdhani text-[10px] tracking-[0.25em] text-cyan-300 uppercase">
            Scroll for Timeline
          </span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </motion.div>

      </div>
    </div>
  );
}
