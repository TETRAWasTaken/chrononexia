// src/components/PastSection.tsx
import { forwardRef } from "react";
import { CLUBS_DATA } from "../data/clubs";
import ClubPavilionSection from "./ClubPavilionSection";

const PastSection = forwardRef<HTMLDivElement>((_props, ref) => {
  const club = CLUBS_DATA.find((c) => c.id === "past")!;
  return <ClubPavilionSection club={club} ref={ref} />;
});

PastSection.displayName = "PastSection";
export default PastSection;
