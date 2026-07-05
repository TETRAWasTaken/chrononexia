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
  { time: "09:00", title: "BOOT SEQUENCE // OPENING CEREMONY", room: "MAIN HALL", code: "0x01" },
  { time: "10:30", title: "PUNCH CARD PROGRAMMING WORKSHOP", room: "LAB-A", code: "0x02" },
  { time: "12:00", title: "RETRO HACKATHON: 8-BIT EDITION", room: "ARCADE WING", code: "0x03" },
  { time: "14:00", title: "ASSEMBLY LANGUAGE DEATHMATCH", room: "LAB-B", code: "0x04" },
  { time: "16:00", title: "VINTAGE HARDWARE TEARDOWN", room: "WORKSHOP-1", code: "0x05" },
  { time: "18:30", title: "LAN PARTY: DOOM '93", room: "MAIN HALL", code: "0x06" },
];

export const PRESENT_SCHEDULE: PresentEvent[] = [
  {
    time: "09:00",
    title: "Keynote: Building at Scale",
    room: "Auditorium",
    speaker: "Industry Panel",
    tag: "Talk",
  },
  {
    time: "10:30",
    title: "Cloud-Native Architecture Lab",
    room: "Studio 2",
    speaker: "Hands-on Workshop",
    tag: "Workshop",
  },
  {
    time: "12:00",
    title: "Product Design Sprint",
    room: "Innovation Hub",
    speaker: "Cross-team Challenge",
    tag: "Sprint",
  },
  {
    time: "14:00",
    title: "AI/ML Applications Showcase",
    room: "Demo Floor",
    speaker: "Open Exhibits",
    tag: "Showcase",
  },
  {
    time: "16:00",
    title: "Open Source Contribution Hour",
    room: "Studio 1",
    speaker: "Community-led",
    tag: "Community",
  },
  {
    time: "18:00",
    title: "Networking Mixer & Demo Night",
    room: "Sky Lounge",
    speaker: "All Attendees",
    tag: "Social",
  },
];

export const FUTURE_SCHEDULE: FutureEvent[] = [
  { time: "09:00", title: "Quantum Computing Frontiers", room: "Nexus Core", icon: "cpu" },
  { time: "11:00", title: "Neural Interface Demonstrations", room: "Bio-Lab Sigma", icon: "zap" },
  { time: "13:00", title: "Autonomous Systems Arena", room: "Outer Ring", icon: "radio" },
  { time: "15:00", title: "Synthetic Intelligence Symposium", room: "Nexus Core", icon: "sparkles" },
  { time: "17:00", title: "The Convergence: Closing Address", room: "Main Stage", icon: "rocket" },
];
