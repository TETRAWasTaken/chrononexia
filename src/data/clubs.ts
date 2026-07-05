// src/data/clubs.ts
import {
  PAST_SCHEDULE,
  PRESENT_SCHEDULE,
  FUTURE_SCHEDULE,
} from "./schedule";

export interface ClubEvent {
  time: string;
  title: string;
  room: string;
  extra?: string; // used for custom tags, speakers, or identifiers
}

export interface ClubInfo {
  id: "past" | "present" | "future";
  name: string;
  codename: string;
  tagline: string;
  description: string;
  themeColor: string;     // Tailwind color class, e.g., "term-green"
  textStyle: string;      // text styles e.g. "text-term-green font-mono"
  badgeStyle: string;     // styles for tags
  cardStyle: string;      // card class names
  borderColor: string;    // border styling
  btnStyle: string;       // button styling
  glowColor: string;      // shadow glow styles
  iconName: "terminal" | "code" | "cpu";
  events: ClubEvent[];
}

export const CLUBS_DATA: ClubInfo[] = [
  {
    id: "past",
    name: "Retro Gaming & Systems",
    codename: "EPOCH-01 // RETRO",
    tagline: "Legacy systems and 8-bit arcade challenges.",
    description: "Step into the command-line era. Experience punch card builds, retro gaming deathmatches, and 8-bit assembly speedruns.",
    themeColor: "term-green",
    textStyle: "text-term-green font-mono",
    badgeStyle: "border-term-amber text-term-amber font-mono",
    cardStyle: "border-2 border-term-amber bg-black/35 font-mono",
    borderColor: "border-term-green",
    btnStyle: "border-2 border-term-green text-term-green hover:bg-term-green hover:text-black font-mono",
    glowColor: "rgba(51,255,0,0.4)",
    iconName: "terminal",
    events: PAST_SCHEDULE.map((e) => ({
      time: e.time,
      title: e.title,
      room: e.room,
      extra: `[${e.code}]`,
    })),
  },
  {
    id: "present",
    name: "Silicon Web & Dev Guild",
    codename: "EPOCH-02 // SILICON",
    tagline: "Modern fullstack and cloud architectures.",
    description: "The present of software engineering. Cloud deployment labs, open source contribution hours, and Vite/React scaling workshops.",
    themeColor: "techblue",
    textStyle: "text-slate-600 font-inter",
    badgeStyle: "bg-techblue/10 text-techblue font-inter",
    cardStyle: "bg-white/70 backdrop-blur-md border border-slate-900/10 font-inter shadow-sm hover:shadow-md transition-shadow",
    borderColor: "border-techblue",
    btnStyle: "bg-techblue text-white hover:bg-blue-700 font-inter",
    glowColor: "rgba(37,99,235,0.18)",
    iconName: "code",
    events: PRESENT_SCHEDULE.map((e) => ({
      time: e.time,
      title: e.title,
      room: e.room,
      extra: `${e.speaker} · ${e.tag}`,
    })),
  },
  {
    id: "future",
    name: "Quantum & AI Syndicate",
    codename: "EPOCH-03 // QUANTUM",
    tagline: "Quantum compute grids and cognitive models.",
    description: "The cutting edge of technology. Dive into neural networks, quantum computing hackathons, and autonomous systems.",
    themeColor: "purple-400",
    textStyle: "text-slate-400 font-rajdhani",
    badgeStyle: "bg-nexus-gradient-soft text-cyan-300 font-rajdhani",
    cardStyle: "future-card font-rajdhani",
    borderColor: "border-purple-400",
    btnStyle: "bg-nexus-gradient text-white shadow-nexus-card hover:scale-[1.02] font-grotesk",
    glowColor: "rgba(176,38,255,0.4)",
    iconName: "cpu",
    events: FUTURE_SCHEDULE.map((e) => ({
      time: e.time,
      title: e.title,
      room: e.room,
      extra: e.icon,
    })),
  },
];
