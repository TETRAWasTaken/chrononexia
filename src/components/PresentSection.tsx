// src/components/PresentSection.tsx
import { forwardRef } from "react";
import { CLUBS_DATA } from "../data/clubs";
import ClubPavilionSection from "./ClubPavilionSection";

const PresentSection = forwardRef<HTMLDivElement>((_props, ref) => {
  const club = CLUBS_DATA.find((c) => c.id === "present")!;
  return <ClubPavilionSection club={club} ref={ref} />;
});

PresentSection.displayName = "PresentSection";
export default PresentSection;
