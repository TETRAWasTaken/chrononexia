// src/components/SymbitechIntro.tsx
import { motion } from "framer-motion";
import { Sparkles, Shield, User, Users } from "lucide-react";

interface TeamMember {
  name: string;
  branch: string;
  role: string;
  initials: string;
  glow: string;
}

const EXECUTIVES: TeamMember[] = [
  { name: "Aarav Sharma", branch: "Computer Science & Engineering", role: "Executive Committee", initials: "AS", glow: "from-cyan-500 to-blue-500" },
  { name: "Diya Patel", branch: "Information Technology", role: "Executive Committee", initials: "DP", glow: "from-purple-500 to-pink-500" },
  { name: "Rohan Verma", branch: "Electronics & Telecommunication", role: "Executive Committee", initials: "RV", glow: "from-emerald-500 to-teal-500" },
  { name: "Sneha Reddy", branch: "Artificial Intelligence & ML", role: "Executive Committee", initials: "SR", glow: "from-amber-500 to-orange-500" },
];

const HEADS: TeamMember[] = [
  { name: "Kabir Malhotra", branch: "Computer Science & Engineering", role: "Fest Head", initials: "KM", glow: "from-cyan-400 to-purple-500" },
  { name: "Ananya Iyer", branch: "Robotics & Automation", role: "Fest Head", initials: "AI", glow: "from-fuchsia-500 to-pink-500" },
];

const CO_HEADS: TeamMember[] = [
  { name: "Vikram Singh", branch: "Information Technology", role: "Fest Co-Head", initials: "VS", glow: "from-blue-500 to-indigo-500" },
  { name: "Ishita Gupta", branch: "Electronics & Telecommunication", role: "Fest Co-Head", initials: "IG", glow: "from-violet-500 to-purple-500" },
];

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

export default function SymbitechIntro() {
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
          {/* Glowing Vector Placeholder Logo */}
          <div className="relative w-28 h-28 mb-6 group cursor-pointer">
            {/* Spinning/pulsing background glow */}
            <div className="absolute inset-0 rounded-3xl bg-nexus-gradient blur-xl opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500" />
            
            {/* Elegant futuristic SVG frame */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full relative z-10 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] animate-[spin_20s_linear_infinite] hover:animate-[spin_4s_linear_infinite] transition-all duration-300"
            >
              {/* Outer hexagonal border */}
              <polygon
                points="50,5 90,25 90,75 50,95 10,75 10,25"
                fill="none"
                stroke="url(#symbi-grad)"
                strokeWidth="3.5"
                strokeDasharray="6 3"
              />
              {/* Inner tech concentric ring */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.4" />
              
              {/* Center 'S' Nexus icon */}
              <path
                d="M38,38 C42,32 58,32 62,38 C65,42 60,46 50,50 C40,54 35,58 38,62 C42,68 58,68 62,62"
                fill="none"
                stroke="url(#symbi-grad-2)"
                strokeWidth="4.5"
                strokeLinecap="round"
              />

              {/* Definitions for Gradients */}
              <defs>
                <linearGradient id="symbi-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="symbi-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center dot flashing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 animate-ping z-20" />
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

          {/* 1. EXECUTIVES SECTION */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <h4 className="font-grotesk font-semibold text-lg text-slate-200 uppercase tracking-widest text-xs">
                Executive Committee
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXECUTIVES.map((member, idx) => (
                <TeamCard key={idx} member={member} index={idx} />
              ))}
            </div>
          </div>

          {/* 2. HEADS SECTION */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
              <User className="w-4 h-4 text-purple-400" />
              <h4 className="font-grotesk font-semibold text-lg text-slate-200 uppercase tracking-widest text-xs">
                Fest Heads
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {HEADS.map((member, idx) => (
                <TeamCard key={idx} member={member} index={idx} />
              ))}
            </div>
          </div>

          {/* 3. CO-HEADS SECTION */}
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <h4 className="font-grotesk font-semibold text-lg text-slate-200 uppercase tracking-widest text-xs">
                Fest Co-Heads
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {CO_HEADS.map((member, idx) => (
                <TeamCard key={idx} member={member} index={idx} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="relative p-5 rounded-xl border border-white/10 bg-nexus-card backdrop-blur-md overflow-hidden group flex items-center gap-4 transition-all duration-300"
    >
      {/* Glowing avatar container */}
      <div className="relative w-12 h-12 rounded-full shrink-0 flex items-center justify-center font-bold text-sm tracking-wider text-white overflow-hidden shadow-inner bg-black/40">
        <div className={`absolute inset-0 bg-gradient-to-tr ${member.glow} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
        <span className="relative z-10 font-grotesk">{member.initials}</span>
        {/* Glow border ring */}
        <div className={`absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300`} />
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-[9px] tracking-widest text-slate-500 font-mono uppercase">
          {member.role}
        </span>
        <h5 className="font-grotesk font-bold text-slate-200 group-hover:text-cyan-300 transition-colors duration-250 truncate">
          {member.name}
        </h5>
        <span className="font-rajdhani text-xs text-slate-400 truncate">
          {member.branch}
        </span>
      </div>

      {/* Background card highlight */}
      <div className="absolute right-0 bottom-0 w-24 h-24 rounded-full bg-cyan-400/5 blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
