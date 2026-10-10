// src/App.tsx
import { useState } from "react";
import ChronoNexia from "./components/ChronoNexia";
import ClubDetailsPage from "./components/ClubDetailsPage";

interface SelectedClubInfo {
  id: string;
  name: string;
  era: "past" | "present" | "future";
}

function App() {
  const [selectedClub, setSelectedClub] = useState<SelectedClubInfo | null>(null);

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
    />
  );
}

export default App;
