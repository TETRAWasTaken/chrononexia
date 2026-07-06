// src/data/schedule.ts

export type Era = "hero" | "hub" | "past" | "present" | "future";

export interface PastEvent {
  time: string;
  title: string;
  room: string;
  code: string;
}

export interface PresentEvent {
  time: string;
  title: string;
  room: string;
  speaker: string;
  tag: string;
}

export type FutureIconName = "cpu" | "zap" | "radio" | "sparkles" | "rocket";

export interface FutureEvent {
  time: string;
  title: string;
  room: string;
  icon: FutureIconName;
}

export const PAST_SCHEDULE: PastEvent[] = [
  { time: "EPOCH-01", title: "Symbiosis Economic Club", room: "Block A — Room 101", code: "0x01" },
  { time: "EPOCH-01", title: "Electronics Design Club", room: "Electronics Lab", code: "0x02" },
  { time: "EPOCH-01", title: "Mathelete Club", room: "Math Wing", code: "0x03" },
  { time: "EPOCH-01", title: "Civil Engineering Society", room: "Civil Block", code: "0x04" },
  { time: "EPOCH-01", title: "MESA", room: "Block B — Seminar Hall", code: "0x05" },
  { time: "EPOCH-01", title: "Brushes & Pixels", room: "Art Studio", code: "0x06" },
];

export const PRESENT_SCHEDULE: PresentEvent[] = [
  {
    time: "EPOCH-02",
    title: "ACM Student Chapter",
    room: "CS Lab 1",
    speaker: "Computing Society",
    tag: "Tech",
  },
  {
    time: "EPOCH-02",
    title: "CBC Club",
    room: "Block C — Room 203",
    speaker: "Business & Commerce",
    tag: "Business",
  },
  {
    time: "EPOCH-02",
    title: "Google Developer Students Club",
    room: "Innovation Hub",
    speaker: "Google DSC",
    tag: "Dev",
  },
  {
    time: "EPOCH-02",
    title: "Codex Club",
    room: "CS Lab 2",
    speaker: "Competitive Coding",
    tag: "Code",
  },
  {
    time: "EPOCH-02",
    title: "FOSS Club",
    room: "Open Source Lounge",
    speaker: "Open Source",
    tag: "FOSS",
  },
  {
    time: "EPOCH-02",
    title: "RPA Club",
    room: "Automation Lab",
    speaker: "Robotic Process Automation",
    tag: "Automation",
  },
  {
    time: "EPOCH-02",
    title: "IEEE SIT Student Branch",
    room: "Electronics Block",
    speaker: "IEEE Chapter",
    tag: "IEEE",
  },
];

export const FUTURE_SCHEDULE: FutureEvent[] = [
  { time: "EPOCH-03", title: "AI Club", room: "AI Research Lab", icon: "cpu" },
  { time: "EPOCH-03", title: "Rotonity Club", room: "Robotics Workshop", icon: "zap" },
  { time: "EPOCH-03", title: "AR/VR Club", room: "Immersion Studio", icon: "sparkles" },
  { time: "EPOCH-03", title: "Robotics & Automation Club", room: "Automation Bay", icon: "radio" },
  { time: "EPOCH-03", title: "Antriksh Club", room: "Space Systems Lab", icon: "rocket" },
  { time: "EPOCH-03", title: "Symbiosis Quantum Club", room: "Quantum Lab", icon: "cpu" },
];

