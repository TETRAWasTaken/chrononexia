import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { PAST_SCHEDULE, PRESENT_SCHEDULE, FUTURE_SCHEDULE } from "../data/schedule";

interface ClubDetailsPageProps {
  club: {
    id: string;
    name: string;
    era: "past" | "present" | "future";
  };
  onBack: () => void;
}

interface ClubDetailsData {
  id: string;
  name: string;
  eventName: string;
  eventDescription: string;
  learningOutcomes: string[];
  location: string;
  logo?: string;
}

const ALL_SCHEDULE = [...PAST_SCHEDULE, ...PRESENT_SCHEDULE, ...FUTURE_SCHEDULE];

export default function ClubDetailsPage({ club, onBack }: ClubDetailsPageProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ClubDetailsData | null>(null);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    // Resolve matching schedule entry to get logo image
    const normalizedId = club.id.toLowerCase();
    const matchedSchedule = ALL_SCHEDULE.find((s) => 
      s.id === normalizedId ||
      normalizedId.includes(s.id) ||
      s.id.includes(normalizedId) ||
      s.title.toLowerCase().includes(club.name.toLowerCase()) ||
      club.name.toLowerCase().includes(s.title.toLowerCase())
    );

    fetch(`/api/clubs/${club.id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Club ${club.id} not found in DB`);
        return r.json();
      })
      .then((details) => {
        if (isMounted) {
          setData({
            id: details.id || club.id,
            name: details.name || club.name,
            eventName: details.eventName || "",
            eventDescription: details.eventDescription || "",
            learningOutcomes: details.learningOutcomes || [],
            location: details.location || "",
            logo: matchedSchedule?.logo
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Database API fetch issue:", err.message);
        if (isMounted) {
          setData({
            id: club.id,
            name: club.name,
            eventName: "",
            eventDescription: "",
            learningOutcomes: [],
            location: "",
            logo: matchedSchedule?.logo
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [club]);

  // Dynamic Theme Styling configurations
  const themeClasses = {
    past: {
      bg: "bg-charcoal text-term-green font-mono selection:bg-term-green selection:text-black",
      panel: "border border-term-green bg-black font-mono shadow-[inset_0_0_20px_rgba(51,255,0,0.03)]",
      badge: "border border-term-green text-term-green rounded-none bg-term-green/5",
      btn: "border border-term-green text-term-green bg-transparent hover:bg-term-green hover:text-black rounded-none transition-all duration-150",
      accentText: "text-term-amber",
      accentBorder: "border-term-green",
      titleFont: "font-vt323 text-5xl tracking-normal text-term-amber",
      glow: "shadow-[0_0_25px_rgba(51,255,0,0.15)]",
      grid: "bg-scanlines opacity-[0.08]"
    },
    present: {
      bg: "bg-void text-slate-200 font-inter",
      panel: "bg-black/75 backdrop-blur-xl border border-slate-700/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] rounded-2xl",
      badge: "bg-techblue/10 text-techblue rounded-full px-3 py-1 text-xs border border-techblue/20",
      btn: "bg-techblue text-white hover:bg-blue-600 rounded-xl transition-all duration-150 shadow-md",
      accentText: "text-techblue",
      accentBorder: "border-techblue/30",
      titleFont: "font-inter font-extrabold text-4xl sm:text-5xl tracking-tight text-white",
      glow: "shadow-[0_0_35px_rgba(37,99,235,0.1)]",
      grid: "bg-grid-cyan opacity-[0.04]"
    },
    future: {
      bg: "bg-void text-slate-300 font-rajdhani selection:bg-purple-500 selection:text-white",
      panel: "future-card-mesh rounded-2xl border-none",
      badge: "bg-nexus-gradient-soft text-cyan-300 rounded-lg px-3 py-1 text-xs border border-cyan-400/20",
      btn: "bg-nexus-gradient text-white hover:brightness-110 rounded-xl transition-all duration-150 shadow-nexus-card",
      accentText: "text-blue-400",
      accentBorder: "border-blue-500/20",
      titleFont: "font-grotesk font-extrabold text-4xl sm:text-5xl tracking-tight text-hero-text",
      glow: "shadow-[0_0_40px_rgba(37,99,235,0.15)]",
      grid: "bg-grid-purple opacity-[0.06]"
    }
  };

  const style = themeClasses[club.era];

  if (loading) {
    return (
      <div className={`w-full min-h-screen flex flex-col items-center justify-center relative ${style.bg}`}>
        <div className={`absolute inset-0 z-[-1] pointer-events-none ${style.grid}`} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`w-12 h-12 rounded-full border-t-2 border-r-2 ${
            club.era === "past"
              ? "border-term-green"
              : club.era === "present"
              ? "border-techblue"
              : "border-blue-400"
          } border-b-transparent border-l-transparent mb-6`}
        />
        <h2
          className={`text-xl ${
            club.era === "past"
              ? "font-mono"
              : club.era === "future"
              ? "font-rajdhani text-2xl tracking-[0.2em]"
              : "font-inter font-semibold"
          }`}
        >
          {club.era === "past"
            ? "SYS // CONNECTING TO ARCHIVE..."
            : club.era === "future"
            ? "FETCHING QUANTUM NODE..."
            : "Synchronizing Club Registry..."}
        </h2>
      </div>
    );
  }

  const hasEventData = Boolean(data?.eventName || data?.eventDescription);

  return (
    <div className={`w-full min-h-screen pb-24 relative overflow-hidden ${style.bg}`}>
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 z-[-1] pointer-events-none ${style.grid}`} />

      {/* Decorative Aura Glow for Modern/Future */}
      {club.era !== "past" && (
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[90px] opacity-40 pointer-events-none z-[-1] ${
            club.era === "present" ? "bg-techblue/20" : "bg-future-glow"
          }`}
        />
      )}

      {/* Top Banner Navigation Bar */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4 flex items-center justify-between z-20 relative">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wider transition-all ${style.btn}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {club.era === "past" ? "SYS_BACK" : "Back to Timeline"}
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-8 sm:p-12 mb-8 ${style.panel} ${style.glow} relative overflow-hidden`}
        >
          {/* Subtle design decals */}
          {club.era === "past" && (
            <div className="absolute right-4 top-4 text-[10px] opacity-40">
              [EPOCH-REC // EVENT_CARD]
            </div>
          )}
          {club.era === "future" && (
            <div className="absolute right-6 top-6 animate-pulse">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
          )}

          <div className="space-y-8">
            {/* Club Logo Header */}
            <div className="flex items-center gap-6">
              {data?.logo && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900/90 p-3 border border-white/15 shadow-xl flex items-center justify-center shrink-0">
                  <img
                    src={data.logo}
                    alt={`${data.name} logo`}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
              )}
              <div>
                <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-1`}>
                  {club.era === "past" ? "SYS // CLUB_NAME" : "Club Name"}
                </span>
                <h1 className={`${style.titleFont}`}>
                  {data?.name}
                </h1>
              </div>
            </div>

            {hasEventData ? (
              <>
                {/* Event Name */}
                {data?.eventName && (
                  <div className={`pt-6 border-t ${style.accentBorder} opacity-90`}>
                    <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-1`}>
                      {club.era === "past" ? "SYS // EVENT_NAME" : "Event Name"}
                    </span>
                    <h2
                      className={`text-2xl sm:text-3xl font-extrabold text-white ${
                        club.era === "past" ? "font-mono" : club.era === "future" ? "font-grotesk" : "font-inter"
                      }`}
                    >
                      {data.eventName}
                    </h2>
                  </div>
                )}

                {/* Location */}
                {data?.location && (
                  <div className="flex items-center gap-3 text-sm opacity-90">
                    <MapPin className={`w-5 h-5 ${style.accentText}`} />
                    <div>
                      <span className="text-xs uppercase tracking-wider block opacity-50">Location</span>
                      <span className="font-semibold">{data.location}</span>
                    </div>
                  </div>
                )}

                {/* Event Description */}
                {data?.eventDescription && (
                  <div className={`pt-6 border-t ${style.accentBorder}`}>
                    <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-2`}>
                      {club.era === "past" ? "SYS // DESCRIPTION" : "Description"}
                    </span>
                    <p
                      className={`text-base sm:text-lg leading-relaxed opacity-90 ${
                        club.era === "past" ? "font-mono text-term-green/90" : club.era === "future" ? "font-rajdhani text-slate-300" : "text-slate-300"
                      }`}
                    >
                      {data.eventDescription}
                    </p>
                  </div>
                )}

                {/* Learning Outcomes */}
                {data?.learningOutcomes && data.learningOutcomes.length > 0 && (
                  <div className={`pt-6 border-t ${style.accentBorder}`}>
                    <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-3`}>
                      {club.era === "past" ? "SYS // LEARNING_OUTCOMES" : "Key Outcomes"}
                    </span>
                    <ul className="space-y-3">
                      {data.learningOutcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base opacity-90">
                          <span className={`inline-block w-2 h-2 rounded-full mt-2 shrink-0 ${
                            club.era === "past" ? "bg-term-green" : club.era === "present" ? "bg-techblue" : "bg-cyan-400"
                          }`} />
                          <span className={club.era === "past" ? "font-mono" : club.era === "future" ? "font-rajdhani text-slate-300" : "text-slate-200"}>
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className={`pt-6 border-t ${style.accentBorder} text-sm opacity-60 italic`}>
                No event record details found for this club in the database.
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
