// src/components/MemberModal.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quote, GraduationCap, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { TeamMember } from "./SymbitechIntro";

interface MemberModalProps {
  member: TeamMember | null;
  badgeGlow?: string;
  onClose: () => void;
}

function getInitials(name: string): string {
  if (!name) return "OC";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function MemberModal({ member, badgeGlow = "from-cyan-500 to-blue-600", onClose }: MemberModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [member, onClose]);

  const initials = member ? getInitials(member.name) : "OC";
  const rawSrc = member?.image_url
    ? member.image_url.startsWith("/")
      ? member.image_url
      : `/${member.image_url}`
    : null;
  const photoSrc = rawSrc ? encodeURI(rawSrc) : null;

  return (
    <AnimatePresence>
      {member && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 cursor-pointer"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-900/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.15)] z-50 overflow-hidden text-slate-100 backdrop-blur-2xl"
          >
            {/* Background Radial Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 z-0" />

            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close member details modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full border border-cyan-400/40 bg-slate-800/90 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/30 hover:scale-110 active:scale-95 transition-all duration-200 z-50 cursor-pointer shadow-xl flex items-center justify-center pointer-events-auto"
            >
              <X className="w-5 h-5 text-cyan-300 pointer-events-none" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start relative z-10">
              {/* Large Photograph View */}
              <div className="relative shrink-0 w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-400/40 bg-slate-950 group">
                {photoSrc && !imgError ? (
                  <img
                    src={photoSrc}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr ${badgeGlow}`}>
                    <span className="font-grotesk font-extrabold text-4xl sm:text-5xl text-white tracking-wider">
                      {initials}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 mt-2">
                      Symbitech OC
                    </span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyan-400/30 bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-cyan-300">
                  <UserCheck className="w-3 h-3 text-cyan-400" />
                  <span>Verified OC</span>
                </div>
              </div>

              {/* Member Metadata & Information */}
              <div className="flex flex-col min-w-0 flex-1 text-center md:text-left pr-6 sm:pr-8">
                {/* Designation Pill */}
                <div className="inline-flex items-center gap-1.5 self-center md:self-start px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider uppercase">
                    {member.position}
                  </span>
                </div>

                {/* Full Name */}
                <h3 className="font-grotesk font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {member.name}
                </h3>

                {/* Academic Year */}
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-300 mt-1">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-rajdhani text-sm font-semibold tracking-wide">
                    {member.academic_year}
                  </span>
                </div>

                {/* Yearbook Quote */}
                {member.comment && member.comment.trim() !== "" && (
                  <div className="mt-4 p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 relative">
                    <div className="flex items-start gap-2">
                      <Quote className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <p className="font-rajdhani text-xs sm:text-sm italic text-cyan-100 leading-relaxed">
                        "{member.comment}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Description / Bio */}
                {member.description && member.description.trim() !== "" && (
                  <div className="mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                      Member Biography
                    </span>
                    <p className="font-rajdhani text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
                      {member.description}
                    </p>
                  </div>
                )}

                {/* Footer Badge */}
                <div className="mt-5 flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ChronoNexia Organizing Committee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
