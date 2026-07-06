// src/components/SponsorsSection.tsx
// "Playbook Scroll" — sticky scaler card shrinks from fullscreen while
// three subgrid layers of sponsor tiles reveal via CSS animation-timeline.
import "../styles/sponsors.css";

// ── Data ──────────────────────────────────────────────────────────
// Layer 1 — GOLD — placed in corners: (col1,row1) (col5,row1) (col1,row3) (col5,row3)
const GOLD = [
  { name: "QuantumCorp", logo: "Q", tagline: "Powering the future" },
  { name: "NeuralAxis",  logo: "N", tagline: "AI at the edge"      },
  { name: "HorizonLabs", logo: "H", tagline: "Beyond the frontier" },
  { name: "FusionTech",  logo: "F", tagline: "Energy meets compute"},
];

// Layer 2 — SILVER — placed inner: (col2,row1) (col4,row1) (col2,row3) (col4,row3)
const SILVER = [
  { name: "ByteForge", logo: "B", tagline: "Build. Ship. Scale."  },
  { name: "SyncStack", logo: "S", tagline: "Cloud-native infra"   },
  { name: "DevPulse",  logo: "D", tagline: "Dev tools redefined"  },
  { name: "CorePath",  logo: "C", tagline: "OS foundations"       },
];

// Layer 3 — BRONZE — placed centre: (col3,row1) (col3,row3)
const BRONZE = [
  { name: "RetroSys", logo: "R", tagline: "Classic meets modern"  },
  { name: "GridMind", logo: "G", tagline: "Distributed computing" },
];

// ── Component ────────────────────────────────────────────────────
export default function SponsorsSection() {
  return (
    <section className="sp-section">
      {/* sticky 100 vh wrapper */}
      <div className="sp-content">

        {/* ── Central scaler card (starts full-viewport, shrinks) ── */}
        <div className="sp-scaler">
          <div className="sp-scaler-card">
            <div>
              <p className="sp-scaler-eyebrow">SYSTEM PATRONS</p>
              <h2 className="sp-scaler-title">
                Our&nbsp;
                <span className="sp-scaler-gradient">Sponsors</span>
              </h2>
              <p className="sp-scaler-sub">
                The organisations fuelling ChronoNexia across every era.
              </p>
              <div className="sp-scaler-pulse" />
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
                <span className="sp-item-logo">{s.logo}</span>
                <span className="sp-item-name">{s.name}</span>
                <span className="sp-item-tag">{s.tagline}</span>
              </div>
            ))}
          </div>

          {/* Layer 2 — Silver — second columns, reveals second */}
          <div className="sp-layer sp-layer--2">
            {SILVER.map((s) => (
              <div key={s.name} className="sp-item sp-item--silver">
                <span className="sp-item-logo">{s.logo}</span>
                <span className="sp-item-name">{s.name}</span>
                <span className="sp-item-tag">{s.tagline}</span>
              </div>
            ))}
          </div>

          {/* Layer 3 — Bronze — center column, reveals last */}
          <div className="sp-layer sp-layer--3">
            {BRONZE.map((s) => (
              <div key={s.name} className="sp-item sp-item--bronze">
                <span className="sp-item-logo">{s.logo}</span>
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
