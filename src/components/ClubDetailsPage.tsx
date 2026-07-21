import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { PAST_SCHEDULE, PRESENT_SCHEDULE, FUTURE_SCHEDULE } from "../data/schedule";

interface ClubDetailsPageProps {
  club: {
    id: string;
    name: string;
    era: "past" | "present" | "future";
  };
  onBack: () => void;
}

interface ClubDetailsData {
  id: string;
  name: string;
  eventName: string;
  eventDescription: string;
  learningOutcomes: string[];
  location: string;
  logo?: string;
}

const ALL_SCHEDULE = [...PAST_SCHEDULE, ...PRESENT_SCHEDULE, ...FUTURE_SCHEDULE];

const CLUB_MOCKED_EVENTS: Record<
  string,
  { eventName: string; eventDescription: string; learningOutcomes: string[]; location: string }
> = {
  // EPOCH 1: Foundations
  "cess": {
    eventName: "TrussForce: Structural Integrity & Civil Design Sprint",
    eventDescription: "A hands-on civil engineering competition where teams calculate force vectors and build eco-friendly bridge trusses subjected to real-time stress testing.",
    learningOutcomes: [
      "Analyzing tension, compression, and shear stresses in truss structures",
      "Optimizing material efficiency under high structural loads",
      "Applying green building principles to civil infrastructure"
    ],
    location: "Civil Block"
  },
  "edc": {
    eventName: "CircuitCraft: IoT Hardware & PCB Design Workshop",
    eventDescription: "A comprehensive, hands-on workshop focused on designing microchip schematics, simulating analog-to-digital signals, and fabricating printed circuit boards (PCBs).",
    learningOutcomes: [
      "Mastering EDA tools for schematic entry and PCB layout",
      "Understanding signal integrity, routing rules, and noise mitigation",
      "Hands-on experience with hardware soldering and oscilloscope testing"
    ],
    location: "Electronics Lab"
  },
  "epic": {
    eventName: "EcoGenesis: Macroeconomic & Fiscal Policy Summit",
    eventDescription: "A high-stakes economic simulation game where participants act as central bankers and economic policy makers to navigate simulated financial markets.",
    learningOutcomes: [
      "Understanding fiscal and monetary policy transmission mechanisms",
      "Analyzing economic indicators and market dependencies",
      "Strategic crisis management and financial decision-making"
    ],
    location: "Block A — Room 101"
  },
  "mesa": {
    eventName: "MechShift: 3D CAD Kinematics & Thermal Sprint",
    eventDescription: "A fast-paced mechanical design sprint where participants model high-performance gearboxes and run kinematic motion and heat transfer simulations.",
    learningOutcomes: [
      "Advanced parametric 3D modeling using industrial CAD software",
      "Analyzing gear ratios, torque transmission, and mechanical stress",
      "Simulating assembly constraints and kinematics of complex linkages"
    ],
    location: "Block B — Seminar Hall"
  },
  "matheletes": {
    eventName: "Mathlete Decathlon: Numeric & Logic Olympiad",
    eventDescription: "An intensive logic and mathematics tournament challenging participants with advanced problems in discrete structures, game theory, and number theory.",
    learningOutcomes: [
      "Applying game theory to strategic competitive scenarios",
      "Formulating mathematical proofs for complex algorithms",
      "Solving combinatorics and modular arithmetic puzzles quickly"
    ],
    location: "Math Wing"
  },
  "sec": {
    eventName: "VentureVault: Startup Pitch & Incubation Hack",
    eventDescription: "An entrepreneurial pitching arena where student founders formulate business models, perform unit economics analysis, and present to seed investors.",
    learningOutcomes: [
      "Formulating customer acquisition strategies and pitch narratives",
      "Understanding financial projections, burn rate, and valuation",
      "Developing lean canvas business models for tech startups"
    ],
    location: "Incubation Centre"
  },
  "varsity-care": {
    eventName: "CarePulse: Student Wellness & Community Outreach",
    eventDescription: "A student-centric welfare and social impact hackathon focused on mental health initiatives, peer mentoring networks, and campus community care.",
    learningOutcomes: [
      "Designing empathetic support programs for campus student welfare",
      "Managing social impact projects and volunteer networks",
      "Building peer engagement and community health awareness"
    ],
    location: "Student Welfare Office"
  },

  // EPOCH 2: Silicon / Tech
  "acm": {
    eventName: "ACM DevHack: 24-Hour Systems & App Hackathon",
    eventDescription: "The premier annual 24-hour hackathon where student developers build full-stack applications solving modern urban and educational problems.",
    learningOutcomes: [
      "Designing robust RESTful and GraphQL API architectures",
      "Implementing responsive frontend interfaces with React and TailwindCSS",
      "Deploying scalable serverless applications with database integrations"
    ],
    location: "CS Lab 1"
  },
  "codex": {
    eventName: "CodeRush: Extreme Algorithmic Programming Arena",
    eventDescription: "A highly competitive algorithmic coding contest featuring complex data structures, graph theory, and mathematical optimization problems.",
    learningOutcomes: [
      "Optimizing time and space complexity of computational algorithms",
      "Implementing complex data structures like segment trees and graphs",
      "Formulating dynamic programming solutions under strict time limits"
    ],
    location: "CS Lab 2"
  },
  "foss": {
    eventName: "Git-Init: Open Source Contribution & Linux Workflow",
    eventDescription: "An interactive workshop introducing students to the Linux command line environment, version control workflows, and submitting pull requests to open-source repositories.",
    learningOutcomes: [
      "Navigating the POSIX terminal and automating tasks via shell scripts",
      "Mastering Git branches, rebasing, and merge conflict resolution",
      "Contributing code and documentation to production open-source projects"
    ],
    location: "Open Source Lounge"
  },
  "gdsc": {
    eventName: "Google Cloud Study Jam & Kubernetes Deployment",
    eventDescription: "A practical laboratory session diving deep into containerizing applications, setting up CI/CD pipelines, and deploying microservices to Google Kubernetes Engine.",
    learningOutcomes: [
      "Containerizing applications using Docker configuration files",
      "Orchestrating multi-container systems with Kubernetes pods",
      "Configuring automated cloud load balancing and monitoring"
    ],
    location: "Innovation Hub"
  },
  "ieee": {
    eventName: "SignalSphere: Telemetry & Wireless Communication Labs",
    eventDescription: "Exploring modern telemetry, encoding RF waves, analyzing frequency domains, and setting up localized wireless communication setups.",
    learningOutcomes: [
      "Modulating and demodulating analog/digital signals across RF bands",
      "Using software-defined radio (SDR) platforms for frequency sweeps",
      "Understanding packet structure and telemetry transmission protocols"
    ],
    location: "Electronics Block"
  },

  // EPOCH 3: Quantum / Frontier Tech
  "ai-club": {
    eventName: "NeuralNexus: Finetuning LLMs & Agentic Workflows",
    eventDescription: "A technical hackathon where students build multi-agent AI systems, run retrieval-augmented generation (RAG) pipelines, and finetune specialized open-source models.",
    learningOutcomes: [
      "Implementing RAG vector embeddings and database search indexes",
      "Constructing autonomous multi-agent task delegation graphs",
      "Finetuning open-source model parameters for specific domain queries"
    ],
    location: "AI Research Lab"
  },
  "antariksh": {
    eventName: "StarLaunch: CanSat & Rocket Telemetry Workshop",
    eventDescription: "Building and launching miniature CanSat payloads to capture atmospheric pressure, altitude, and GPS coordinates, transmitting data in real time to ground stations.",
    learningOutcomes: [
      "Designing compact payload enclosures conforming to weight budgets",
      "Programming sensor suites to collect telemetry on a micro-controller",
      "Configuring long-range telemetry modules (LoRa) for real-time tracking"
    ],
    location: "Space Systems Lab"
  },
  "arvr": {
    eventName: "ImmersionSpace: Unity 3D Spatial Computing Hackathon",
    eventDescription: "A design sprint focused on building immersive augmented and virtual reality experiences using modern game engines and spatial headsets.",
    learningOutcomes: [
      "Developing interactive 3D spatial scenes using Unity or Unreal Engine",
      "Programming physics interactions for virtual reality hands",
      "Optimizing framerates and rendering budgets for mobile headsets"
    ],
    location: "Immersion Studio"
  },
  "rotonity": {
    eventName: "RoboFight: Combat Robotics & Automation Arena",
    eventDescription: "A high-octane engineering competition where student-built combat robots battle in an armored cage, testing mechanical durability and electronic control.",
    learningOutcomes: [
      "Designing robust mechanical chassis to withstand shock and impact",
      "Interfacing high-torque brushed/brushless motors with speed controllers",
      "Configuring secure radio-frequency telemetry links for real-time control"
    ],
    location: "Robotics Workshop"
  },
  "sqc": {
    eventName: "QuantumSphere: Simulating Superposition & Qubit Circuits",
    eventDescription: "A theoretical and practical lab using Python and Qiskit to construct quantum logic gates, simulate quantum entanglement, and explore quantum key distribution.",
    learningOutcomes: [
      "Understanding quantum logic gates (Hadamard, CNOT, Phase)",
      "Simulating quantum key distribution protocols and superposition states",
      "Running quantum circuit algorithms on cloud-based quantum simulator backends"
    ],
    location: "Quantum Lab"
  }
};

export default function ClubDetailsPage({ club, onBack }: ClubDetailsPageProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ClubDetailsData | null>(null);
  const [isPlaceholder, setIsPlaceholder] = useState(false);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;

    // Resolve matching schedule entry to get logo image
    const normalizedId = club.id.toLowerCase();
    const matchedSchedule = ALL_SCHEDULE.find((s) => 
      s.id === normalizedId ||
      normalizedId.includes(s.id) ||
      s.id.includes(normalizedId) ||
      s.title.toLowerCase().includes(club.name.toLowerCase()) ||
      club.name.toLowerCase().includes(s.title.toLowerCase())
    );

    // Fallback key search
    const key = Object.keys(CLUB_MOCKED_EVENTS).find(
      (k) => normalizedId.includes(k) || k.includes(normalizedId)
    ) || "acm";

    const details = CLUB_MOCKED_EVENTS[key] || {
      eventName: `${club.name} Event`,
      eventDescription: `An exclusive event organized by ${club.name} at ChronoNexia, bringing together students and mentors to explore the frontiers of tech.`,
      learningOutcomes: [
        "Understanding core concepts and methodologies of the domain",
        "Collaborating in teams to build innovative solutions",
        "Developing real-world problem-solving skills under professional guidance"
      ],
      location: "ChronoNexia Venue"
    };

    const applyFallback = () => {
      setIsPlaceholder(true);
      setData({
        id: club.id,
        name: club.name,
        eventName: details.eventName,
        eventDescription: details.eventDescription,
        learningOutcomes: details.learningOutcomes,
        location: details.location,
        logo: matchedSchedule?.logo
      });
      setLoading(false);
    };

    fetch(`/api/clubs/${club.id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Club ${club.id} not found in DB`);
        return r.json();
      })
      .then((details) => {
        if (isMounted) {
          setIsPlaceholder(false);
          setData({
            id: details.id || club.id,
            name: details.name || club.name,
            eventName: details.eventName || details.eventName,
            eventDescription: details.eventDescription || details.eventDescription,
            learningOutcomes: details.learningOutcomes || details.learningOutcomes,
            location: details.location || details.location,
            logo: matchedSchedule?.logo
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("HTTPS API fallback active. Error:", err.message);
        if (isMounted) {
          applyFallback();
        }
      });

    return () => {
      isMounted = false;
    };
  }, [club]);

  // Dynamic Theme Styling configurations
  const themeClasses = {
    past: {
      bg: "bg-charcoal text-term-green font-mono selection:bg-term-green selection:text-black",
      panel: "border border-term-green bg-black font-mono shadow-[inset_0_0_20px_rgba(51,255,0,0.03)]",
      badge: "border border-term-green text-term-green rounded-none bg-term-green/5",
      btn: "border border-term-green text-term-green bg-transparent hover:bg-term-green hover:text-black rounded-none transition-all duration-150",
      accentText: "text-term-amber",
      accentBorder: "border-term-green",
      titleFont: "font-vt323 text-5xl tracking-normal text-term-amber",
      glow: "shadow-[0_0_25px_rgba(51,255,0,0.15)]",
      grid: "bg-scanlines opacity-[0.08]"
    },
    present: {
      bg: "bg-void text-slate-200 font-inter",
      panel: "bg-black/75 backdrop-blur-xl border border-slate-700/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] rounded-2xl",
      badge: "bg-techblue/10 text-techblue rounded-full px-3 py-1 text-xs border border-techblue/20",
      btn: "bg-techblue text-white hover:bg-blue-600 rounded-xl transition-all duration-150 shadow-md",
      accentText: "text-techblue",
      accentBorder: "border-techblue/30",
      titleFont: "font-inter font-extrabold text-4xl sm:text-5xl tracking-tight text-white",
      glow: "shadow-[0_0_35px_rgba(37,99,235,0.1)]",
      grid: "bg-grid-cyan opacity-[0.04]"
    },
    future: {
      bg: "bg-void text-slate-300 font-rajdhani selection:bg-purple-500 selection:text-white",
      panel: "future-card-mesh rounded-2xl border-none",
      badge: "bg-nexus-gradient-soft text-cyan-300 rounded-lg px-3 py-1 text-xs border border-cyan-400/20",
      btn: "bg-nexus-gradient text-white hover:brightness-110 rounded-xl transition-all duration-150 shadow-nexus-card",
      accentText: "text-purple-400",
      accentBorder: "border-purple-500/20",
      titleFont: "font-grotesk font-extrabold text-4xl sm:text-5xl tracking-tight text-hero-text",
      glow: "shadow-[0_0_40px_rgba(176,38,255,0.15)]",
      grid: "bg-grid-purple opacity-[0.06]"
    }
  };

  const style = themeClasses[club.era];

  if (loading) {
    return (
      <div className={`w-full min-h-screen flex flex-col items-center justify-center relative ${style.bg}`}>
        <div className={`absolute inset-0 z-[-1] pointer-events-none ${style.grid}`} />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`w-12 h-12 rounded-full border-t-2 border-r-2 ${
            club.era === "past"
              ? "border-term-green"
              : club.era === "present"
              ? "border-techblue"
              : "border-purple-400"
          } border-b-transparent border-l-transparent mb-6`}
        />
        <h2
          className={`text-xl ${
            club.era === "past"
              ? "font-mono"
              : club.era === "future"
              ? "font-rajdhani text-2xl tracking-[0.2em]"
              : "font-inter font-semibold"
          }`}
        >
          {club.era === "past"
            ? "SYS // CONNECTING TO ARCHIVE..."
            : club.era === "future"
            ? "FETCHING QUANTUM NODE..."
            : "Synchronizing Club Registry..."}
        </h2>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen pb-24 relative overflow-hidden ${style.bg}`}>
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 z-[-1] pointer-events-none ${style.grid}`} />

      {/* Decorative Aura Glow for Modern/Future */}
      {club.era !== "past" && (
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[90px] opacity-40 pointer-events-none z-[-1] ${
            club.era === "present" ? "bg-techblue/20" : "bg-future-glow"
          }`}
        />
      )}

      {/* Top Banner Navigation Bar */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4 flex items-center justify-between z-20 relative">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wider transition-all ${style.btn}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {club.era === "past" ? "SYS_BACK" : "Back to Timeline"}
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-8 sm:p-12 mb-8 ${style.panel} ${style.glow} relative overflow-hidden`}
        >
          {/* Subtle design decals */}
          {club.era === "past" && (
            <div className="absolute right-4 top-4 text-[10px] opacity-40">
              [EPOCH-REC // EVENT_CARD]
            </div>
          )}
          {club.era === "future" && (
            <div className="absolute right-6 top-6 animate-pulse">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
          )}

          <div className="space-y-8">
            {isPlaceholder && (
              <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 leading-relaxed shadow-sm ${
                club.era === 'past' 
                  ? 'border-term-green/30 bg-black text-term-green font-mono' 
                  : club.era === 'present' 
                  ? 'border-blue-500/20 bg-blue-950/20 text-blue-400 font-inter' 
                  : 'border-purple-500/20 bg-purple-950/20 text-purple-400 font-rajdhani text-base'
              }`}>
                <span className="font-bold text-base leading-none select-none">⚠️</span>
                <div>
                  <strong className="block mb-0.5">Pre-loaded Offline Details</strong>
                  <span>Displaying event specifications from the ChronoNexia static cache.</span>
                </div>
              </div>
            )}

            {/* Club Logo Header */}
            <div className="flex items-center gap-6">
              {data?.logo && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900/90 p-3 border border-white/15 shadow-xl flex items-center justify-center shrink-0">
                  <img
                    src={data.logo}
                    alt={`${data.name} logo`}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
              )}
              <div>
                <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-1`}>
                  {club.era === "past" ? "SYS // CLUB_NAME" : "Club Name"}
                </span>
                <h1 className={`${style.titleFont}`}>
                  {data?.name}
                </h1>
              </div>
            </div>

            {/* Event Name */}
            <div className={`pt-6 border-t ${style.accentBorder} opacity-90`}>
              <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-1`}>
                {club.era === "past" ? "SYS // EVENT_NAME" : "Event Name"}
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-extrabold text-white ${
                  club.era === "past" ? "font-mono" : club.era === "future" ? "font-grotesk" : "font-inter"
                }`}
              >
                {data?.eventName}
              </h2>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-sm opacity-90">
              <MapPin className={`w-5 h-5 ${style.accentText}`} />
              <div>
                <span className="text-xs uppercase tracking-wider block opacity-50">Location</span>
                <span className="font-semibold">{data?.location}</span>
              </div>
            </div>

            {/* Event Description */}
            <div className={`pt-6 border-t ${style.accentBorder}`}>
              <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-2`}>
                {club.era === "past" ? "SYS // DESCRIPTION" : "Description"}
              </span>
              <p
                className={`text-base sm:text-lg leading-relaxed opacity-90 ${
                  club.era === "past" ? "font-mono text-term-green/90" : club.era === "future" ? "font-rajdhani text-slate-300" : "text-slate-300"
                }`}
              >
                {data?.eventDescription}
              </p>
            </div>

            {/* Learning Outcomes */}
            <div className={`pt-6 border-t ${style.accentBorder}`}>
              <span className={`text-xs uppercase tracking-widest font-semibold ${style.accentText} block mb-3`}>
                {club.era === "past" ? "SYS // LEARNING_OUTCOMES" : "Key Outcomes"}
              </span>
              <ul className="space-y-3">
                {data?.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base opacity-90">
                    <span className={`inline-block w-2 h-2 rounded-full mt-2 shrink-0 ${
                      club.era === "past" ? "bg-term-green" : club.era === "present" ? "bg-techblue" : "bg-cyan-400"
                    }`} />
                    <span className={club.era === "past" ? "font-mono" : club.era === "future" ? "font-rajdhani text-slate-300" : "text-slate-200"}>
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
