// src/components/ClubPavilionSection.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Clock, MapPin, Terminal, Code, Cpu } from "lucide-react";
import { type ClubInfo, type ClubEvent } from "../data/clubs";
import RetroBootLoader from "./RetroBootLoader";

interface ClubPavilionSectionProps {
  club: ClubInfo;
  isLast?: boolean;
  onSelectClub: (club: { id: string; name: string; era: "past" | "present" | "future" }) => void;
}

interface EventCardProps {
  event: ClubEvent;
  index: number;
  total: number;
  parentScrollYProgress: MotionValue<number>;
  club: ClubInfo;
  onSelectClub: (club: { id: string; name: string; era: "past" | "present" | "future" }) => void;
}

function EventCard({
  event,
  index,
  total,
  parentScrollYProgress,
  club,
  onSelectClub,
}: EventCardProps) {
  // Distribute start scroll triggers across 0.2 to 0.6 range based on index
  const cardProgressStart = 0.2 + (index / total) * 0.4;

  // Stagger direction: alternate left/right/center entry
  const xOffset = index % 3 === 0 ? -40 : index % 3 === 2 ? 40 : 0;
  const yOffset = index % 3 === 1 ? 50 : 30;

  // Opacity: fade in and stay visible (the parent div manages section exit fade-out)
  const opacity = useTransform(
    parentScrollYProgress,
    [cardProgressStart - 0.08, cardProgressStart],
    [0, 1]
  );

  const x = useTransform(
    parentScrollYProgress,
    [cardProgressStart - 0.08, cardProgressStart],
    [xOffset, 0]
  );

  const y = useTransform(
    parentScrollYProgress,
    [cardProgressStart - 0.08, cardProgressStart],
    [yOffset, 0]
  );

  const scale = useTransform(
    parentScrollYProgress,
    [cardProgressStart - 0.08, cardProgressStart],
    [0.92, 1]
  );

  const handleCardClick = () => {
    onSelectClub({
      id: event.clubId || event.title.toLowerCase().replace(/\s+/g, "-"),
      name: event.title,
      era: club.id
    });
  };

  return (
    <motion.div
      style={{ opacity, x, y, scale }}
      onClick={handleCardClick}
      whileHover={{
        y: -6,
        scale: 1.025,
        boxShadow:
          club.id === "past"
            ? "0 10px 25px -10px rgba(51, 255, 0, 0.25)"
            : club.id === "present"
            ? "0 15px 30px -10px rgba(37, 99, 235, 0.15)"
            : "0 20px 45px -10px rgba(176, 38, 255, 0.25)",
        transition: { duration: 0.25, ease: "easeOut" }
      }}
      className={`relative overflow-hidden flex flex-col justify-between cursor-pointer group ${club.cardStyle} ${club.textStyle}`}
    >
      <div>
        <div className="flex items-start justify-between mb-4 gap-3">
          {event.logo ? (
            <div className="w-14 h-14 rounded-xl bg-slate-900/90 p-2 border border-slate-700/60 shadow-md flex items-center justify-center overflow-hidden shrink-0 group-hover:border-cyan-400/60 transition-colors duration-300">
              <img
                src={event.logo}
                alt={`${event.title} logo`}
                className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${club.badgeStyle}`}>
              {event.extra}
            </span>
          )}

          <div className="flex flex-col items-end gap-1">
            {event.logo && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${club.badgeStyle}`}>
                {event.extra}
              </span>
            )}
            <span className="text-xs sm:text-sm font-medium flex items-center gap-1 opacity-75">
              <Clock className="w-3.5 h-3.5" />
              {event.time}
            </span>
          </div>
        </div>

        <h3 className={`text-lg sm:text-xl font-semibold mb-3 leading-snug ${
          club.id === "past"
            ? "text-term-amber font-vt323 text-2xl"
            : club.id === "present"
            ? "text-slate-100 font-inter"
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
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          aria-label={`View portal for ${event.title}`}
          className={`w-full text-xs sm:text-sm tracking-wider py-2.5 rounded-xl transition-all duration-150 ${club.btnStyle}`}
        >
          {club.id === "past" ? "ENTER ARCHIVE" : "VIEW PORTAL"}
        </button>
      </div>
    </motion.div>
  );
}

export default function ClubPavilionSection({ club, isLast = false, onSelectClub }: ClubPavilionSectionProps) {
  const localRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start end", "end start"],
  });

  // Header/Title animations
  const headerOpacity = useTransform(
    scrollYProgress,
    isLast ? [0, 0.2] : [0, 0.2, 0.8, 0.95],
    isLast ? [0, 1] : [0, 1, 1, 0]
  );
  
  const headerScale = useTransform(
    scrollYProgress,
    isLast ? [0, 0.2] : [0, 0.2, 0.8, 0.95],
    isLast ? [0.95, 1] : [0.95, 1, 1, 0.95]
  );

  const headerY = useTransform(
    scrollYProgress,
    isLast ? [0, 0.2] : [0, 0.2, 0.8, 0.95],
    isLast ? [50, 0] : [50, 0, 0, -50]
  );

  const icons = {
    terminal: Terminal,
    code: Code,
    cpu: Cpu,
  };
  const Icon = icons[club.iconName];

  return (
    <section
      ref={localRef}
      id={club.id}
      className={`relative z-10 min-h-[150vh] py-32 px-5 sm:px-10 overflow-hidden flex flex-col justify-center bg-transparent text-slate-200`}
    >
      <motion.div
        style={{ opacity: headerOpacity, scale: headerScale, y: headerY }}
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
              ? "text-slate-100 font-inter"
              : "text-hero-text font-grotesk"
          }`}>
            {club.name}
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl ${
            club.id === "past"
              ? "text-term-green/80 font-mono"
              : club.id === "present"
              ? "text-slate-400 font-inter"
              : "text-slate-400 font-rajdhani"
          }`}>
            {club.description}
          </p>
        </div>

        {/* Standard Event Cards Grid — for Past era, wrapped in retro boot loader */}
        {club.id === "past" ? (
          <RetroBootLoader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {club.events.map((event, idx) => (
                <EventCard
                  key={event.title}
                  event={event}
                  index={idx}
                  total={club.events.length}
                  parentScrollYProgress={scrollYProgress}
                  club={club}
                  onSelectClub={onSelectClub}
                />
              ))}
            </div>
          </RetroBootLoader>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {club.events.map((event, idx) => (
              <EventCard
                key={event.title}
                event={event}
                index={idx}
                total={club.events.length}
                parentScrollYProgress={scrollYProgress}
                club={club}
                onSelectClub={onSelectClub}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
