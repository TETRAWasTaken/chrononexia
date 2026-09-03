import "../styles/sponsors.css";
import "../styles/pitchdeck.css";

import sponsorImg2 from "../assets/sponsors/image2.png";
import sponsorImg3 from "../assets/sponsors/image3.png";
import sponsorImg4 from "../assets/sponsors/image4.png";
import sponsorImg5 from "../assets/sponsors/image5.png";
import sponsorImg6 from "../assets/sponsors/image6.png";
import sponsorImg7 from "../assets/sponsors/image7.png";
import sponsorImg8 from "../assets/sponsors/image8.png";
import sponsorImg9 from "../assets/sponsors/image9.png";
import sponsorImg10 from "../assets/sponsors/image10.png";
import sponsorImg11 from "../assets/sponsors/image11.png";

// ── Data ──────────────────────────────────────────────────────────
// Layer 1 — GOLD — placed in corners: (col1,row1) (col5,row1) (col1,row3) (col5,row3)
const GOLD = [
  { name: "Bajaj Finserv Health", logo: sponsorImg7, tagline: "Principal Tech Sponsor" },
  { name: "DRDO India", logo: sponsorImg9, tagline: "Defence R&D Partner" },
  { name: "IEEE Systems", logo: sponsorImg2, tagline: "Technical Society Partner" },
  { name: "SIT AI Research Lab", logo: sponsorImg6, tagline: "AI Innovation Partner" },
];

// Layer 2 — SILVER — placed inner: (col2,row1) (col4,row1) (col2,row3) (col4,row3)
const SILVER = [
  { name: "FixtureLabs CAD", logo: sponsorImg5, tagline: "CAD & Engineering Partner" },
  { name: "QuantumAxis", logo: sponsorImg8, tagline: "Quantum Computing Infrastructure" },
  { name: "ByteForge Cloud", logo: sponsorImg10, tagline: "Developer Infra & Cloud" },
  { name: "NeuralAxis AI", logo: sponsorImg11, tagline: "Edge AI & Intelligence" },
];

// Layer 3 — BRONZE — placed centre: (col3,row1) (col3,row3)
const BRONZE = [
  { name: "RetroSys Systems", logo: sponsorImg3, tagline: "Embedded Hardware Partner" },
  { name: "GridMind Compute", logo: sponsorImg4, tagline: "Distributed Systems Partner" },
];

// ── Component ────────────────────────────────────────────────────
interface SponsorsSectionProps {
  onWhySponsor?: () => void;
}

export default function SponsorsSection({ onWhySponsor }: SponsorsSectionProps) {
  return (
    <section className="sp-section">
      {/* sticky 100 vh wrapper */}
      <div className="sp-content">

        {/* ── Central scaler card (starts full-viewport, shrinks) ── */}
        <div className="sp-scaler">
          {/* sp-scaler-card = invisible pointer-events wrapper that the CSS animates */}
          <div className="sp-scaler-card">
            {/* sp-scaler-card-inner = the actual visible card (height auto so button fits) */}
            <div className="sp-scaler-card-inner">
              <div>
                <p className="sp-scaler-eyebrow">SYSTEM PATRONS</p>
                <h2 className="sp-scaler-title">
                  Our{" "}
                  <span className="sp-scaler-gradient">Sponsors</span>
                </h2>
                <p className="sp-scaler-sub">
                  The organisations fuelling ChronoNexia across every era.
                </p>
                <div className="sp-scaler-pulse" />
                {onWhySponsor && (
                  <button
                    id="why-sponsor-btn"
                    className="sp-why-btn"
                    onClick={onWhySponsor}
                    aria-label="View SymbiTech 2026 Sponsorship Pitch Deck"
                  >
                    <span>✦ Why Sponsor Us?</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 5-col × 3-row subgrid overlay (z-index: 3, above scaler) ── */}
        <div className="sp-grid">

          {/* spacer in (col3, row2) holds the grid's middle row open */}
          <div className="sp-grid-spacer" aria-hidden="true" />

          {/* Layer 1 — Gold — outermost columns, first to reveal */}
          <div className="sp-layer sp-layer--1">
            {GOLD.map((s) => (
              <div key={s.name} className="sp-item sp-item--gold">
                <span className="sp-item-logo">
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-1 rounded-lg" />
                </span>
                <span className="sp-item-name">{s.name}</span>
                <span className="sp-item-tag">{s.tagline}</span>
              </div>
            ))}
          </div>

          {/* Layer 2 — Silver — second columns, reveals second */}
          <div className="sp-layer sp-layer--2">
            {SILVER.map((s) => (
              <div key={s.name} className="sp-item sp-item--silver">
                <span className="sp-item-logo">
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-1 rounded-lg" />
                </span>
                <span className="sp-item-name">{s.name}</span>
                <span className="sp-item-tag">{s.tagline}</span>
              </div>
            ))}
          </div>

          {/* Layer 3 — Bronze — center column, reveals last */}
          <div className="sp-layer sp-layer--3">
            {BRONZE.map((s) => (
              <div key={s.name} className="sp-item sp-item--bronze">
                <span className="sp-item-logo">
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-1 rounded-lg" />
                </span>
                <span className="sp-item-name">{s.name}</span>
                <span className="sp-item-tag">{s.tagline}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

