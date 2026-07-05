// src/components/ClubPavilionSection.tsx
import { forwardRef, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, Terminal, Code, Cpu } from "lucide-react";
import { type ClubInfo } from "../data/clubs";

interface ClubPavilionSectionProps {
  club: ClubInfo;
  isLast?: boolean;
}

const ClubPavilionSection = forwardRef<HTMLDivElement, ClubPavilionSectionProps>(
  ({ club, isLast = false }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const { scrollYProgress } = useScroll({
      target: localRef,
      offset: ["start end", "end start"],
    });

    const opacity = useTransform(
      scrollYProgress,
      isLast ? [0, 0.25] : [0, 0.25, 0.75, 1],
      isLast ? [0, 1] : [0, 1, 1, 0]
    );
    const scale = useTransform(
      scrollYProgress,
      isLast ? [0, 0.25] : [0, 0.25, 0.75, 1],
      isLast ? [0.95, 1] : [0.95, 1, 1, 0.95]
    );
    const y = useTransform(
      scrollYProgress,
      isLast ? [0, 0.25] : [0, 0.25, 0.75, 1],
      isLast ? [100, 0] : [100, 0, 0, -100]
    );

    const icons = {
      terminal: Terminal,
      code: Code,
      cpu: Cpu,
    };
    const Icon = icons[club.iconName];

    return (
      <section
        ref={setRefs}
        id={club.id}
        className={`relative min-h-screen py-24 px-5 sm:px-10 overflow-hidden flex flex-col justify-center bg-transparent ${
          club.id === "present" ? "text-slate-800" : "text-slate-200"
        }`}
      >
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 max-w-5xl mx-auto w-full"
        >
          {/* Header Block */}
          <div className="mb-12">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border ${club.badgeStyle}`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{club.codename}</span>
            </div>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 ${
              club.id === "past"
                ? "text-term-amber font-vt323"
                : club.id === "present"
                ? "text-deepslate font-inter"
                : "text-hero-text font-grotesk"
            }`}>
              {club.name}
            </h2>
            <p className={`text-base sm:text-lg max-w-2xl ${
              club.id === "past"
                ? "text-term-green/80 font-mono"
                : club.id === "present"
                ? "text-slate-600 font-inter"
                : "text-slate-400 font-rajdhani"
            }`}>
              {club.description}
            </p>
          </div>

          {/* Standard Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {club.events.map((event, idx) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group ${club.cardStyle} ${club.textStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${club.badgeStyle}`}>
                      {event.extra}
                    </span>
                    <span className="text-xs sm:text-sm font-medium flex items-center gap-1 opacity-75">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 leading-snug ${
                    club.id === "past"
                      ? "text-term-amber font-vt323"
                      : club.id === "present"
                      ? "text-deepslate font-inter"
                      : "text-slate-100 font-grotesk"
                  }`}>
                    {event.title}
                  </h3>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-center gap-1.5 text-sm opacity-80">
                    <MapPin className="w-4 h-4" />
                    <span>{event.room}</span>
                  </div>
                  <button 
                    aria-label={`RSVP for ${event.title}`}
                    className={`w-full text-xs sm:text-sm tracking-wider py-2.5 rounded-xl transition-all duration-150 ${club.btnStyle}`}
                  >
                    {club.id === "past" ? "ACKNOWLEDGE" : "RSVP"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  }
);

ClubPavilionSection.displayName = "ClubPavilionSection";
export default ClubPavilionSection;
