import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, User, Users, Quote } from "lucide-react";
import { getTeamDataCached } from "../utils/apiCache";
import MemberModal from "./MemberModal";
import symbiLogo from "../assets/SYMBITECH/logo.png";

export interface TeamMember {
  name: string;
  position: string;
  academic_year: string;
  comment?: string | null;
  description?: string | null;
  image_url?: string | null;
}

interface TeamData {
  festHeads: TeamMember[];
  headsAndCoheads: TeamMember[];
  executives: TeamMember[];
}

const GLIMPSES = [
  {
    title: "The ByteArena Hackathon",
    year: "Symbitech '25",
    desc: "48 hours of intense hacking, red bull, and breakthrough ideas.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Robo-Wars Showdown",
    year: "Symbitech '25",
    desc: "Heavyweight steel gladiators clashing in the arena of destiny.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Frontier Tech Keynotes",
    year: "Symbitech '25",
    desc: "Visions of quantum supremacy, neural mesh, and space expansion.",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Cosmic Pro Night",
    year: "Symbitech '25",
    desc: "Closing the cybernetic era with lights, bass, and thousands of voices.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
  },
];

function getInitials(name: string): string {
  if (!name) return "OC";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function SymbitechIntro() {
  const [teamData, setTeamData] = useState<TeamData>({
    festHeads: [],
    headsAndCoheads: [],
    executives: [],
  });
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<{ member: TeamMember; badgeGlow: string } | null>(null);

  useEffect(() => {
    getTeamDataCached()
      .then((data) => {
        setTeamData({
          festHeads: data.festHeads || [],
          headsAndCoheads: data.headsAndCoheads || [],
          executives: data.executives || [],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Database fetch error:", err);
        setDbError("Database connection unavailable. Ensure PostgreSQL database is running.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-transparent z-10 pt-24 pb-20 px-4 sm:px-6 md:px-8">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-hero-glow blur-[60px] opacity-40 pointer-events-none z-[-1]" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* ========================================== */}
        {/* SECTION 1: SYMBI TECH LOGO & HERO TITLE  */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* SymbiTech Official Logo */}
          <div className="relative w-48 sm:w-56 h-48 sm:h-56 mb-6 group cursor-pointer flex items-center justify-center">
            <img
              src={symbiLogo}
              alt="SymbiTech Official Logo"
              className="w-full h-full object-cover rounded-full relative z-10 [mask-image:radial-gradient(circle_at_center,black_58%,transparent_95%)] filter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span className="font-rajdhani text-xs tracking-[0.25em] text-blue-200 uppercase">
              Symbiosis Institute of Technology
            </span>
          </div>

          <h2 className="font-grotesk font-extrabold text-5xl sm:text-6xl tracking-tight text-white mb-6">
            SYMBI
            <span className="bg-clip-text text-transparent bg-nexus-gradient ml-2">
              TECH
            </span>
          </h2>

          <p className="font-rajdhani text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Symbitech is the flagship national technical festival of Symbiosis Institute of Technology. 
            It is a melting pot of creativity, engineering, and digital art where students showcase technical prowess, 
            battle in cutting-edge robotics, build decentralized protocols, and engineer novel solutions. 
            This year, we welcome you to <strong className="text-cyan-300">ChronoNexia</strong> — the temporal nexus 
            collapsing computational history into a single point.
          </p>
        </motion.div>

        {/* ========================================== */}
        {/* SECTION 2: GLIMPSES OF SYMBI TECH         */}
        {/* ========================================== */}
        <div className="w-full mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="font-grotesk font-bold text-2xl sm:text-3xl text-white">
              Glimpses of Symbitech 25-26
            </h3>
            <div className="w-16 h-1 bg-nexus-gradient mx-auto mt-3 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {GLIMPSES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/10 bg-nexus-card overflow-hidden backdrop-blur-md group transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent z-10 transition-colors duration-300" />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 z-20 text-[9px] tracking-wider px-2 py-0.5 rounded-full border border-cyan-400/30 bg-black/60 font-mono text-cyan-300">
                    {item.year}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-grotesk font-semibold text-base text-slate-100 group-hover:text-cyan-300 transition-colors duration-250">
                    {item.title}
                  </h4>
                  <p className="font-rajdhani text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION 3: ORGANIZING TEAM                */}
        {/* ========================================== */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="font-grotesk font-bold text-2xl sm:text-3xl text-white">
              The Organizing Team
            </h3>
            <p className="font-rajdhani text-sm text-slate-400 mt-2">
              The creative minds and engineers behind Symbitech
            </p>
            <div className="w-16 h-1 bg-nexus-gradient mx-auto mt-3 rounded-full" />
          </motion.div>

          {loading && (
            <div className="text-center py-10">
              <p className="font-rajdhani text-cyan-300 animate-pulse text-sm">
                Querying PostgreSQL database...
              </p>
            </div>
          )}

          {dbError && (
            <div className="max-w-md mx-auto p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-center mb-10">
              <p className="font-rajdhani text-red-300 text-sm">{dbError}</p>
            </div>
          )}

          {/* 1. FEST HEADS SECTION */}
          {teamData.festHeads.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
                <User className="w-4 h-4 text-cyan-400" />
                <h4 className="font-grotesk font-semibold text-sm text-slate-200 uppercase tracking-widest">
                  Fest Heads
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamData.festHeads.map((member, idx) => (
                  <TeamCard
                    key={idx}
                    member={member}
                    index={idx}
                    badgeGlow="from-cyan-500 to-blue-600"
                    onClick={() => setSelectedMember({ member, badgeGlow: "from-cyan-500 to-blue-600" })}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 2. EXECUTIVES SECTION */}
          {teamData.executives.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <h4 className="font-grotesk font-semibold text-sm text-slate-200 uppercase tracking-widest">
                  Executive Committee
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamData.executives.map((member, idx) => (
                  <TeamCard
                    key={idx}
                    member={member}
                    index={idx}
                    badgeGlow="from-emerald-500 to-teal-600"
                    onClick={() => setSelectedMember({ member, badgeGlow: "from-emerald-500 to-teal-600" })}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. HEADS & CO-HEADS SECTION */}
          {teamData.headsAndCoheads.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
                <Users className="w-4 h-4 text-purple-400" />
                <h4 className="font-grotesk font-semibold text-sm text-slate-200 uppercase tracking-widest">
                  Heads & Co-Heads
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamData.headsAndCoheads.map((member, idx) => (
                  <TeamCard
                    key={idx}
                    member={member}
                    index={idx}
                    badgeGlow="from-purple-500 to-pink-600"
                    onClick={() => setSelectedMember({ member, badgeGlow: "from-purple-500 to-pink-600" })}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Member Modal Template */}
      <MemberModal
        member={selectedMember?.member || null}
        badgeGlow={selectedMember?.badgeGlow}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
  badgeGlow: string;
  onClick: () => void;
}

function TeamCard({ member, index, badgeGlow, onClick }: TeamCardProps) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(member.name);
  const rawSrc = member.image_url
    ? member.image_url.startsWith("/")
      ? member.image_url
      : `/${member.image_url}`
    : null;
  const photoSrc = rawSrc ? encodeURI(rawSrc) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="relative p-5 rounded-2xl border border-white/10 bg-nexus-card backdrop-blur-md overflow-hidden group flex flex-col justify-between transition-all duration-300 shadow-lg hover:border-cyan-500/30 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Glowing Avatar Container */}
        <div className="relative w-14 h-14 rounded-full shrink-0 flex items-center justify-center font-bold text-sm tracking-wider text-white overflow-hidden shadow-inner bg-slate-900 border border-white/15 group-hover:border-cyan-400/50 transition-colors duration-300">
          {photoSrc && !imgError ? (
            <img
              src={photoSrc}
              alt={member.name}
              className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-tr ${badgeGlow}`}>
              <span className="relative z-10 font-grotesk font-bold text-white text-sm">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] tracking-wider text-cyan-400 font-mono uppercase truncate font-semibold">
            {member.position}
          </span>
          <h5 className="font-grotesk font-bold text-slate-100 group-hover:text-cyan-300 transition-colors duration-250 text-base leading-snug truncate">
            {member.name}
          </h5>
          <span className="font-rajdhani text-xs text-slate-400 mt-0.5 font-medium">
            {member.academic_year}
          </span>
        </div>
      </div>

      {/* Yearbook Quote / Comment */}
      {member.comment && member.comment.trim() !== "" && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-start gap-2">
          <Quote className="w-3.5 h-3.5 text-cyan-400/60 shrink-0 mt-0.5" />
          <p className="font-rajdhani text-xs italic text-slate-300/80 line-clamp-2 leading-relaxed">
            "{member.comment}"
          </p>
        </div>
      )}

      {/* Subtle Background Glow */}
      <div className="absolute right-0 bottom-0 w-24 h-24 rounded-full bg-cyan-400/5 blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
