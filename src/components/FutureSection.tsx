// src/components/FutureSection.tsx
import { forwardRef } from "react";
import { CLUBS_DATA } from "../data/clubs";
import ClubPavilionSection from "./ClubPavilionSection";

const FutureSection = forwardRef<HTMLDivElement>((_props, ref) => {
  const club = CLUBS_DATA.find((c) => c.id === "future")!;
  return <ClubPavilionSection club={club} ref={ref} isLast={true} />;
});

FutureSection.displayName = "FutureSection";
export default FutureSection;
