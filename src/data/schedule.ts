// src/data/schedule.ts
import cessLogo from "../assets/CESS/CESS LOGO.png";
import edcLogo from "../assets/EDC/EDC Club Logo.jpg";
import epicLogo from "../assets/EPIC/Epic logo.jpg";
import mesaLogo from "../assets/MESA/MESA_Logo.png";
import matheletesLogo from "../assets/Matheletes/Matheletes No bg.png";
import secLogo from "../assets/SEC/SEC logo.jpeg";
import varsityCareLogo from "../assets/V@rSITy Care/V@rSITyCareLogo.png";

import acmLogo from "../assets/ACM/png_20230615_110316_0000 (1).png";
import codexLogo from "../assets/CodeX/CodeX Dark Mode.png";
import fossLogo from "../assets/Foss Club/Horizontal Stacked Logo Dark Mode.png";
import gdscLogo from "../assets/GDSC/Logo_Darkmode.png";
import ieeeLogo from "../assets/IEEE/IEEE STUDENT BRANCH.png";

import aiClubLogo from "../assets/AI Club/AIClubLogo.png";
import antarikshLogo from "../assets/ANTARIKSH/ANTARIKSH_LOGO.png";
import arvrLogo from "../assets/ARVR /DARKMODE.png";
import rotonityLogo from "../assets/Rotonity/Rotonity Logo.png";
import sqcLogo from "../assets/SQC/SQC-default-logo.png";

export type Era = "symbitech" | "hero" | "hub" | "past" | "present" | "future";

export interface PastEvent {
  time: string;
  title: string;
  room: string;
  code: string;
  logo: string;
  id: string;
}

export interface PresentEvent {
  time: string;
  title: string;
  room: string;
  speaker: string;
  tag: string;
  logo: string;
  id: string;
}

export type FutureIconName = "cpu" | "zap" | "radio" | "sparkles" | "rocket";

export interface FutureEvent {
  time: string;
  title: string;
  room: string;
  icon: FutureIconName;
  logo: string;
  id: string;
}

// EPOCH 1: Foundations & Fundamentals (Legacy & Bedrock Clubs)
export const PAST_SCHEDULE: PastEvent[] = [
  {
    time: "EPOCH-01",
    title: "Civil Engineering Student Society (CESS)",
    room: "Civil Block",
    code: "0x01",
    logo: cessLogo,
    id: "cess",
  },
  {
    time: "EPOCH-01",
    title: "Electronics Design Club (EDC)",
    room: "Electronics Lab",
    code: "0x02",
    logo: edcLogo,
    id: "edc",
  },
  {
    time: "EPOCH-01",
    title: "EPIC Club",
    room: "Block A — Room 101",
    code: "0x03",
    logo: epicLogo,
    id: "epic",
  },
  {
    time: "EPOCH-01",
    title: "Mechanical Engineering Students Association (MESA)",
    room: "Block B — Seminar Hall",
    code: "0x04",
    logo: mesaLogo,
    id: "mesa",
  },
  {
    time: "EPOCH-01",
    title: "Matheletes Club",
    room: "Math Wing",
    code: "0x05",
    logo: matheletesLogo,
    id: "matheletes",
  },
  {
    time: "EPOCH-01",
    title: "Symbiosis Entrepreneurship Club (SEC)",
    room: "Incubation Centre",
    code: "0x06",
    logo: secLogo,
    id: "sec",
  },
  {
    time: "EPOCH-01",
    title: "V@rSITy Care",
    room: "Student Welfare Office",
    code: "0x07",
    logo: varsityCareLogo,
    id: "varsity-care",
  },
];

// EPOCH 2: Dev, Tech & Open Source (Silicon & Software Clubs)
export const PRESENT_SCHEDULE: PresentEvent[] = [
  {
    time: "EPOCH-02",
    title: "ACM Student Chapter",
    room: "CS Lab 1",
    speaker: "Computing Society",
    tag: "Tech",
    logo: acmLogo,
    id: "acm",
  },
  {
    time: "EPOCH-02",
    title: "CodeX Club",
    room: "CS Lab 2",
    speaker: "Competitive Coding",
    tag: "Code",
    logo: codexLogo,
    id: "codex",
  },
  {
    time: "EPOCH-02",
    title: "FOSS Club",
    room: "Open Source Lounge",
    speaker: "Open Source",
    tag: "FOSS",
    logo: fossLogo,
    id: "foss",
  },
  {
    time: "EPOCH-02",
    title: "Google Developer Student Club (GDSC)",
    room: "Innovation Hub",
    speaker: "Google DSC",
    tag: "Dev",
    logo: gdscLogo,
    id: "gdsc",
  },
  {
    time: "EPOCH-02",
    title: "IEEE SIT Student Branch",
    room: "Electronics Block",
    speaker: "IEEE Chapter",
    tag: "IEEE",
    logo: ieeeLogo,
    id: "ieee",
  },
];

// EPOCH 3: AI, Robotics & Frontier Tech (Quantum & Emerging Tech Clubs)
export const FUTURE_SCHEDULE: FutureEvent[] = [
  {
    time: "EPOCH-03",
    title: "AI Club",
    room: "AI Research Lab",
    icon: "cpu",
    logo: aiClubLogo,
    id: "ai-club",
  },
  {
    time: "EPOCH-03",
    title: "Antariksh Club",
    room: "Space Systems Lab",
    icon: "rocket",
    logo: antarikshLogo,
    id: "antariksh",
  },
  {
    time: "EPOCH-03",
    title: "AR/VR Club",
    room: "Immersion Studio",
    icon: "sparkles",
    logo: arvrLogo,
    id: "arvr",
  },
  {
    time: "EPOCH-03",
    title: "Rotonity Club",
    room: "Robotics Workshop",
    icon: "zap",
    logo: rotonityLogo,
    id: "rotonity",
  },
  {
    time: "EPOCH-03",
    title: "Symbiosis Quantum Club (SQC)",
    room: "Quantum Lab",
    icon: "cpu",
    logo: sqcLogo,
    id: "sqc",
  },
];
