import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  Code2,
  Atom,
  Rocket,
  AlertTriangle,
  RefreshCw,
  WifiOff
} from "lucide-react";
import { getSponsorsDataCached } from "../utils/apiCache";
import "../styles/sponsors.css";

export interface SponsorItem {
  id: string;
  name: string;
  logo: string;
  role: string;
  domain: string;
  description: string;
  telemetryStatus: string;
  nodeRef: string;
  accent: "emerald" | "amber" | "cyan";
  icon: "code" | "atom" | "rocket";
  intelDetails: {
    overview: string;
    perks: string[];
  };
}

export default function SponsorsSection() {
  const [sponsorsList, setSponsorsList] = useState<SponsorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorItem | null>(null);
  const [utcTime, setUtcTime] = useState<string>("12:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchSponsors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSponsorsDataCached();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No sponsor records found in the database.");
      }

      const mapped: SponsorItem[] = data.map((item) => {
        let parsedPerks: string[] = [];
        try {
          parsedPerks = Array.isArray(item.intel_perks)
            ? item.intel_perks
            : typeof item.intel_perks === "string"
            ? JSON.parse(item.intel_perks)
            : [];
        } catch {
          parsedPerks = [];
        }

        return {
          id: item.id || `sp-${Math.random()}`,
          name: item.name || "Sponsor",
          logo: item.image_url || "",
          role: item.role || "Event Partner",
          domain: item.domain || "TECHNOLOGY ECOSYSTEM",
          description: item.description || "Partner powering the ChronoNexia hackathon rounds.",
          telemetryStatus: item.telemetry_status || "ACTIVE // VERIFIED",
          nodeRef: item.node_ref || `// NODE_REF: ${(item.id || "SYS").toUpperCase()}`,
          accent: (item.accent || "cyan") as "emerald" | "amber" | "cyan",
          icon: (item.icon || "code") as "code" | "atom" | "rocket",
          intelDetails: {
            overview: item.intel_overview || item.description || "",
            perks: parsedPerks,
          },
        };
      });

      setSponsorsList(mapped);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Connection refused";
      setError(errMsg);
      setSponsorsList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  return (
    <section className="relative w-full bg-[#030712] text-slate-100 sp-cyber-grid py-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-cyan-500/20">
      {/* Ambient Chromatic Radial Backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] left-0 w-[550px] h-[550px] bg-purple-600/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/5 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* ==================== 1. HUD Telemetry Coordinate Bar ==================== */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pb-5 mb-10 gap-3 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold tracking-wider">// SYS.LOC // 0x7F-2026</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">SECTOR: PREMIER CONSORTIUM</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-purple-400">HASH: 4b29-e8fa-c011</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 sp-beacon-amber" />
              ACTIVE CYCLE: CHRONO-2026.Q1
            </span>
            <span className="text-cyan-300 font-mono tracking-widest bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-0.5 rounded">
              UTC [{utcTime}]
            </span>
          </div>
        </div>

        {/* ==================== 2. Section Header HUD ==================== */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative">
          {/* Ambient HUD Corner Brackets */}
          <div className="absolute -top-6 -left-4 sm:-left-8 w-5 h-5 border-t-2 border-l-2 border-cyan-400/50 pointer-events-none" />
          <div className="absolute -top-6 -right-4 sm:-right-8 w-5 h-5 border-t-2 border-r-2 border-cyan-400/50 pointer-events-none" />

          {/* Glowing HUD Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] mb-6">
            <span className={`w-2 h-2 rounded-full ${error ? "bg-red-400 shadow-[0_0_10px_#ef4444]" : "bg-cyan-400 sp-beacon-cyan"}`} />
            <span className={`text-xs font-mono font-bold tracking-[0.25em] uppercase ${error ? "text-red-400" : "text-cyan-300"}`}>
              {error ? "NODE OFFLINE // DATABASE DISCONNECTED" : "PREMIER EVENT PATRONS // 2026"}
            </span>
            <span className="text-[11px] text-cyan-200/60 font-mono">
              {error ? "[ERR_CONN]" : "[VERIFIED]"}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-grotesk font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6 leading-tight">
            Our Event Sponsors <br className="hidden sm:inline" />
            <span className="sp-text-gradient-cyan sp-text-glow-cyan">
              &amp; Partners
            </span>
          </h2>

          {/* Subtitle */}
          <p className="font-rajdhani text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-medium">
            The trailblazing institutions and industry leaders powering ChronoNexia across past, present, and future eras.
          </p>

          {/* Micro-Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded bg-slate-900/60 border border-slate-700/60 text-xs font-mono text-slate-300">
              <span className={error ? "text-red-400 font-bold" : "text-cyan-400 font-bold"}>
                {error ? "NODE STATUS: FAILED" : `${sponsorsList.length} SPONSORS ACTIVE`}
              </span>
              <span>LIVE DATABASE TELEMETRY</span>
            </div>
          </div>

          {/* Ambient HUD Bottom Brackets */}
          <div className="absolute -bottom-6 -left-4 sm:-left-8 w-5 h-5 border-b-2 border-l-2 border-cyan-400/50 pointer-events-none" />
          <div className="absolute -bottom-6 -right-4 sm:-right-8 w-5 h-5 border-b-2 border-r-2 border-cyan-400/50 pointer-events-none" />
        </div>

        {/* ==================== 3. Content States (Loading / Error / Sponsors) ==================== */}

        {/* LOADING STATE */}
        {loading && (
          <div className="max-w-2xl mx-auto my-16 p-10 rounded-xl sp-glass-panel border border-cyan-500/30 text-center relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.1)]">
            <div className="sp-scanline-effect absolute inset-0 pointer-events-none opacity-40" />
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase block mb-2">
              // TELEMETRY HANDSHAKE IN PROGRESS...
            </span>
            <p className="font-rajdhani text-slate-300 text-sm">
              Querying Supabase Cloud BaaS at <code className="text-cyan-300 font-mono">sponsors</code>
            </p>
          </div>
        )}

        {/* CONNECTION ERROR STATE */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto my-16 rounded-xl sp-glass-panel border border-red-500/50 p-8 sm:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.2)] text-center"
          >
            {/* Corner Warning Brackets */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-red-400" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-red-400" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-red-400" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-red-400" />

            <div className="w-14 h-14 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center justify-center mx-auto mb-5 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <WifiOff className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>ERR_SUPABASE_COMMUNICATION // BAAS TELEMETRY OFFLINE</span>
            </div>

            <h3 className="font-grotesk font-bold text-2xl text-white mb-2">
              Sponsor Telemetry Link Unreachable
            </h3>

            <p className="font-rajdhani text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-4">
              Direct connection to Supabase REST API could not be completed. Check <code className="text-cyan-300 font-mono bg-slate-900 px-2 py-0.5 rounded">.env</code> for <code className="text-cyan-300 font-mono">VITE_SUPABASE_ANON_KEY</code> and network connectivity.
            </p>

            <div className="font-mono text-xs text-red-400/90 bg-slate-950/90 border border-red-950 p-3 rounded-lg max-w-lg mx-auto mb-6 break-all">
              &gt; {error}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={fetchSponsors}
                className="sp-chamfer-rb px-6 py-3 bg-red-500/20 border border-red-400 text-red-200 hover:bg-red-500 hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RETRY CONNECTION</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SPONSORS GRID (WHEN CONNECTED TO DATABASE) */}
        {!loading && !error && sponsorsList.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-[1360px] mx-auto mb-20">
            {sponsorsList.map((sponsor) => {
              const isEmerald = sponsor.accent === "emerald";
              const isAmber = sponsor.accent === "amber";

              const borderColor = isEmerald
                ? "border-emerald-500/40 hover:border-emerald-400"
                : isAmber
                ? "border-amber-500/40 hover:border-amber-400"
                : "border-cyan-500/40 hover:border-cyan-400";

              const cornerColor = isEmerald
                ? "border-emerald-400"
                : isAmber
                ? "border-amber-400"
                : "border-cyan-400";

              const glowClass = isEmerald
                ? "hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.3)]"
                : isAmber
                ? "sp-card-gold-glow"
                : "sp-card-silver-glow";

              const tagColor = isEmerald
                ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/40"
                : isAmber
                ? "text-amber-400 bg-amber-950/60 border-amber-500/40"
                : "text-cyan-300 bg-cyan-950/60 border-cyan-500/40";

              const beaconClass = isEmerald
                ? "bg-emerald-400 shadow-[0_0_10px_#10b981]"
                : isAmber
                ? "bg-amber-400 sp-beacon-amber"
                : "bg-cyan-400 sp-beacon-cyan";

              return (
                <div
                  key={sponsor.id}
                  onClick={() => setSelectedSponsor(sponsor)}
                  className={`relative group sp-glass-panel border ${borderColor} ${glowClass} transition-all duration-300 rounded-xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer`}
                >
                  {/* 4 Corner L-Brackets */}
                  <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 ${cornerColor}`} />
                  <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 ${cornerColor}`} />
                  <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 ${cornerColor}`} />
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 ${cornerColor}`} />

                  <div>
                    {/* Status Beacon Top Bar */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono tracking-wider ${tagColor}`}>
                        <span className={`w-2 h-2 rounded-full ${beaconClass}`} />
                        <span className="truncate">{sponsor.telemetryStatus}</span>
                      </span>

                      {/* Icon glyph */}
                      <div className="w-8 h-8 rounded-lg bg-slate-950/80 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
                        {sponsor.icon === "code" && <Code2 className="w-4 h-4 text-emerald-400" />}
                        {sponsor.icon === "atom" && <Atom className="w-4 h-4 text-amber-400" />}
                        {sponsor.icon === "rocket" && <Rocket className="w-4 h-4 text-cyan-400" />}
                      </div>
                    </div>

                    {/* Logo Display Container */}
                    <div className="w-full h-28 sm:h-32 rounded-lg bg-slate-950/80 border border-slate-700/70 p-4 mb-6 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:scale-[1.02] transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                      {sponsor.logo ? (
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                        />
                      ) : (
                        <span className="font-mono text-xs text-slate-500 uppercase">// NO_ASSET_LINKED</span>
                      )}
                    </div>

                    {/* Domain Tag & Title */}
                    <div className="mb-4">
                      <span className="text-[11px] font-mono text-cyan-400 tracking-widest block uppercase mb-1">
                        {sponsor.domain}
                      </span>
                      <h3 className="font-grotesk font-bold text-2xl text-white group-hover:text-cyan-200 transition-colors">
                        {sponsor.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono block mt-0.5">
                        {sponsor.role}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-rajdhani text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                      {sponsor.description}
                    </p>
                  </div>

                  <div>
                    {/* Card Footer: Telemetry Code & Action Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800 font-mono text-xs">
                      <span className="text-slate-500 tracking-wide text-[11px]">
                        {sponsor.nodeRef}
                      </span>
                      <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:text-white transition-colors group-hover:translate-x-1 duration-200 font-bold">
                        <span>View Intel</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}


      </div>

      {/* ==================== 5. Interactive Partner Intel Modal ==================== */}
      <AnimatePresence>
        {selectedSponsor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-cyan-400/50 rounded-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden"
            >
              {/* Reticle Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSponsor(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-lg bg-slate-900 border border-cyan-400/40 p-2 flex items-center justify-center">
                  {selectedSponsor.logo ? (
                    <img
                      src={selectedSponsor.logo}
                      alt={selectedSponsor.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-mono text-xs text-slate-500">// NO_ASSET</span>
                  )}
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                    {selectedSponsor.domain}
                  </span>
                  <h3 className="font-grotesk font-bold text-2xl text-white">
                    {selectedSponsor.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">{selectedSponsor.role}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 font-rajdhani text-slate-300 text-sm sm:text-base mb-6">
                <p>{selectedSponsor.description}</p>
                {selectedSponsor.intelDetails && (
                  <>
                    {selectedSponsor.intelDetails.overview && (
                      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-2 font-bold">
                          Partner Overview &amp; Engagement
                        </span>
                        <p className="text-sm">{selectedSponsor.intelDetails.overview}</p>
                      </div>
                    )}

                    {selectedSponsor.intelDetails.perks.length > 0 && (
                      <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                        <span className="text-xs font-mono text-purple-300 block mb-2 font-semibold">
                          Participant Perks &amp; Grants
                        </span>
                        <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-400">
                          {selectedSponsor.intelDetails.perks.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 font-mono text-xs">
                <span className="text-slate-500">{selectedSponsor.nodeRef}</span>
                <button
                  onClick={() => setSelectedSponsor(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
