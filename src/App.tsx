// src/App.tsx
import { useState } from "react";
import ChronoNexia from "./components/ChronoNexia";
import ClubDetailsPage from "./components/ClubDetailsPage";
import PitchDeckPage from "./components/PitchDeckPage";

interface SelectedClubInfo {
  id: string;
  name: string;
  era: "past" | "present" | "future";
}

type View = "main" | "pitchDeck";

function App() {
  const [view, setView] = useState<View>("main");
  const [selectedClub, setSelectedClub] = useState<SelectedClubInfo | null>(null);

  if (view === "pitchDeck") {
    return (
      <PitchDeckPage
        onBack={() => {
          setView("main");
          // Restore scroll position to sponsors section after returning
          setTimeout(() => {
            const el = document.getElementById("symbitech");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      />
    );
  }

  if (selectedClub) {
    return (
      <ClubDetailsPage
        club={selectedClub}
        onBack={() => setSelectedClub(null)}
      />
    );
  }

  return (
    <ChronoNexia
      onSelectClub={(club) => setSelectedClub(club)}
      onWhySponsor={() => {
        window.scrollTo(0, 0);
        setView("pitchDeck");
      }}
    />
  );
}

export default App;

