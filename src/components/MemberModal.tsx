// src/components/MemberModal.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quote, GraduationCap, ShieldCheck, Sparkles, UserCheck, Crown, BookOpen, Building2, Award } from "lucide-react";
import { TeamMember } from "./SymbitechIntro";

interface MemberModalProps {
  member: TeamMember | null;
  badgeGlow?: string;
  onClose: () => void;
}

function getInitials(name: string): string {
  if (!name) return "OC";
  const clean = name.replace(/^Dr\.?\s+/i, "");
  const parts = clean.trim().split(/\s+/);
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

  // Detect Member Category
  const isAdvisory = member
    ? /director|advisory/i.test(member.position || "") ||
      /advisory/i.test(member.academic_year || "") ||
      /director|dd\s/i.test(member.name || "")
    : false;

  const isFaculty = member && !isAdvisory
    ? /faculty/i.test(member.position || "") ||
      /faculty/i.test(member.academic_year || "") ||
      /^dr\b/i.test(member.name || "")
    : false;

  const roleTheme = isAdvisory
    ? {
        badgeText: "Advisory Board",
        statusText: "Institutional Advisory",
        statusBorder: "border-amber-400/30 bg-amber-400/10 text-amber-300",
        footerText: "ChronoNexia Advisory Board",
        footerIcon: Crown,
        pillBorder: "border-amber-400/30 bg-amber-400/10 text-amber-300",
        pillIcon: Award,
        metaIcon: Building2,
        accentBorder: "border-amber-500/30",
        accentGlow: "bg-amber-500/10",
        accentText: "text-amber-400",
      }
    : isFaculty
    ? {
        badgeText: "Faculty Mentor",
        statusText: "Organizing Faculty",
        statusBorder: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
        footerText: "ChronoNexia Faculty Organizing Committee",
        footerIcon: BookOpen,
        pillBorder: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
        pillIcon: GraduationCap,
        metaIcon: BookOpen,
        accentBorder: "border-indigo-500/30",
        accentGlow: "bg-indigo-500/10",
        accentText: "text-indigo-400",
      }
    : {
        badgeText: "Symbitech OC",
        statusText: "Verified OC",
        statusBorder: "border-cyan-400/30 bg-slate-950/80 text-cyan-300",
        footerText: "ChronoNexia Organizing Committee",
        footerIcon: Sparkles,
        pillBorder: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
        pillIcon: ShieldCheck,
        metaIcon: GraduationCap,
        accentBorder: "border-cyan-500/20",
        accentGlow: "bg-cyan-500/5",
        accentText: "text-cyan-400",
      };

  const StatusIcon = isAdvisory ? Award : isFaculty ? GraduationCap : UserCheck;
  const FooterIcon = roleTheme.footerIcon;
  const PillIcon = roleTheme.pillIcon;
  const MetaIcon = roleTheme.metaIcon;

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
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl sm:max-w-2xl bg-slate-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden"
          >
            {/* Ambient Background Glow Effect */}
            <div
              className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br ${badgeGlow} opacity-20 blur-3xl pointer-events-none -mr-20 -mt-20`}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors duration-200 z-10"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
              {/* Profile Image / Initials Avatar */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-2xl bg-slate-950 flex items-center justify-center">
                {photoSrc && !imgError ? (
                  <img
                    src={photoSrc}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr ${badgeGlow}`}>
                    <span className="font-grotesk font-extrabold text-4xl sm:text-5xl text-white tracking-wider">
                      {initials}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 mt-2">
                      {roleTheme.badgeText}
                    </span>
                  </div>
                )}

                {/* Status Badge */}
                <div className={`absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full border backdrop-blur-md text-[10px] font-mono ${roleTheme.statusBorder}`}>
                  <StatusIcon className={`w-3 h-3 ${roleTheme.accentText}`} />
                  <span>{roleTheme.statusText}</span>
                </div>
              </div>

              {/* Member Metadata & Information */}
              <div className="flex flex-col min-w-0 flex-1 text-center md:text-left pr-6 sm:pr-8">
                {/* Designation Pill */}
                <div className={`inline-flex items-center gap-1.5 self-center md:self-start px-3 py-1 rounded-full border mb-2 ${roleTheme.pillBorder}`}>
                  <PillIcon className="w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                    {member.position}
                  </span>
                </div>

                {/* Full Name */}
                <h3 className="font-grotesk font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {member.name}
                </h3>

                {/* Academic Year / Affiliation */}
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-300 mt-1">
                  <MetaIcon className={`w-4 h-4 ${roleTheme.accentText} shrink-0`} />
                  <span className="font-rajdhani text-sm font-semibold tracking-wide">
                    {member.academic_year}
                  </span>
                </div>

                {/* Quote / Commentary */}
                {member.comment && member.comment.trim() !== "" && (
                  <div className={`mt-4 p-3.5 rounded-xl border relative ${roleTheme.accentBorder} ${roleTheme.accentGlow}`}>
                    <div className="flex items-start gap-2">
                      <Quote className={`w-4 h-4 ${roleTheme.accentText} shrink-0 mt-0.5`} />
                      <p className="font-rajdhani text-xs sm:text-sm italic text-slate-200 leading-relaxed">
                        "{member.comment}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Description / Bio */}
                {member.description && member.description.trim() !== "" && (
                  <div className="mt-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1.5">
                      Biography & Role
                    </span>
                    <p className="font-rajdhani text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
                      {member.description}
                    </p>
                  </div>
                )}

                {/* Footer Badge */}
                <div className="mt-5 flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-slate-400">
                  <FooterIcon className={`w-3.5 h-3.5 ${roleTheme.accentText}`} />
                  <span>{roleTheme.footerText}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
