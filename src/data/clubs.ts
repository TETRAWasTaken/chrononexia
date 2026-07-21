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
  logo?: string;  // imported image logo URL
  clubId?: string;// unique club identifier
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
    name: "Foundations & Fundamentals",
    codename: "EPOCH-01 // LEGACY",
    tagline: "Economics, engineering, math, entrepreneurship & care clubs.",
    description: "The bedrock of student-led innovation. Seven foundational clubs spanning civil & electronics engineering, economics, mathematics, mechanical engineering, entrepreneurship, and varsity student care.",
    themeColor: "term-green",
    textStyle: "text-term-green font-mono",
    badgeStyle: "border border-term-green text-term-green font-mono rounded-none",
    cardStyle: "border border-term-green bg-black font-mono rounded-none shadow-[inset_0_0_15px_rgba(51,255,0,0.05)] p-6",
    borderColor: "border-term-green",
    btnStyle: "border border-term-green text-term-green bg-transparent hover:bg-term-green hover:text-black font-mono rounded-none transition-colors duration-150",
    glowColor: "rgba(51,255,0,0.4)",
    iconName: "terminal",
    events: PAST_SCHEDULE.map((e) => ({
      time: e.time,
      title: e.title,
      room: e.room,
      extra: `[${e.code}]`,
      logo: e.logo,
      clubId: e.id,
    })),
  },
  {
    id: "present",
    name: "Dev, Tech & Open Source",
    codename: "EPOCH-02 // SILICON",
    tagline: "ACM, Google DSC, IEEE, CodeX & FOSS clubs.",
    description: "The present of student-led software. Five tech clubs driving competitive coding, open source, cloud, developer communities, and industry-standard IEEE engineering.",
    themeColor: "techblue",
    textStyle: "text-slate-200 font-inter",
    badgeStyle: "bg-techblue/20 text-techblue font-inter rounded-full px-3 py-1 text-xs border border-techblue/30",
    cardStyle: "bg-black/70 backdrop-blur-md border border-slate-700/60 shadow-[0_8px_30px_rgba(37,99,235,0.08)] font-inter rounded-2xl p-8 hover:border-techblue/50 transition-all duration-300",
    borderColor: "border-techblue",
    btnStyle: "bg-techblue/90 text-white hover:bg-techblue font-inter py-3 rounded-xl shadow-sm transition-all duration-150",
    glowColor: "rgba(37,99,235,0.35)",
    iconName: "code",
    events: PRESENT_SCHEDULE.map((e) => ({
      time: e.time,
      title: e.title,
      room: e.room,
      extra: `${e.speaker} · ${e.tag}`,
      logo: e.logo,
      clubId: e.id,
    })),
  },
  {
    id: "future",
    name: "AI, Robotics & Frontier Tech",
    codename: "EPOCH-03 // QUANTUM",
    tagline: "AI, AR/VR, Antariksh space, Rotonity & Quantum clubs.",
    description: "The convergence of emerging technology. Five frontier clubs across artificial intelligence, augmented reality, robotics & automation, space systems, and quantum computing.",
    themeColor: "purple-400",
    textStyle: "text-slate-300 font-rajdhani",
    badgeStyle: "bg-nexus-gradient-soft text-cyan-300 font-rajdhani rounded-lg px-2.5 py-0.5",
    cardStyle: "future-card-mesh font-rajdhani p-8",
    borderColor: "border-purple-400",
    btnStyle: "bg-nexus-gradient text-white shadow-nexus-card hover:brightness-110 font-grotesk py-2.5 rounded-xl transition-all duration-150",
    glowColor: "rgba(176,38,255,0.4)",
    iconName: "cpu",
    events: FUTURE_SCHEDULE.map((e) => ({
      time: e.time,
      title: e.title,
      room: e.room,
      extra: e.icon,
      logo: e.logo,
      clubId: e.id,
    })),
  },
];
