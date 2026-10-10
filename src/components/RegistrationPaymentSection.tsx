// src/components/RegistrationPaymentSection.tsx
import { motion } from "framer-motion";
import {
  QrCode,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Lock,
  Smartphone,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import qrCodeImg from "../assets/PaymentRegistration/unnamed.jpg";

export default function RegistrationPaymentSection() {
  const registrationUrl =
    "https://forms.easebuzz.in/register/SymbiosisKs3vf/Registration_fee_for_SYMBITECH-26";

  return (
    <div className="w-full mb-24 relative" id="registration-payment">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* ==================== 1. Header Section ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="tracking-widest uppercase">OFFICIAL REGISTRATION PORTAL // 2026</span>
          <span className="text-[10px] text-cyan-400/60">[SSL_256]</span>
        </div>

        <h3 className="font-grotesk font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          Event Registration &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            Payment
          </span>
        </h3>

        <p className="font-rajdhani text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-3 leading-relaxed">
          Scan the official QR code with your mobile camera or click the registration gateway button below to complete your registration for SymbiTech 2026.
        </p>

        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* ==================== 2. Main QR Code & Registration Box ==================== */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-xl p-6 sm:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          {/* Ambient Corner L-Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/70 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70 pointer-events-none" />

          {/* Left Column: QR Code Display (5 Cols) */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="relative p-3.5 rounded-2xl border border-cyan-400/50 bg-white shadow-[0_0_25px_rgba(0,240,255,0.3)] group">
              {/* Corner Reticles */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-52 h-52 sm:w-56 sm:h-56 relative flex items-center justify-center overflow-hidden rounded-lg bg-white group-hover:scale-[1.02] transition-transform cursor-pointer"
                title="Click or scan to open official registration portal"
              >
                <img
                  src={qrCodeImg}
                  alt="SymbiTech 2026 Registration QR Code"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-cyan-300">
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>SCAN TO REGISTER</span>
            </div>
            <span className="text-[11px] font-rajdhani text-slate-400 mt-1">
              Supports mobile camera &amp; any QR scanner
            </span>
          </div>

          {/* Right Column: Registration CTA & Details (7 Cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
                  Online Registration Gateway
                </span>
              </div>

              <h4 className="font-grotesk font-bold text-2xl text-white mb-2 leading-snug">
                SymbiTech 2026 Event Pass
              </h4>

              <p className="font-rajdhani text-sm text-slate-300 leading-relaxed">
                Complete your delegate registration and fee payment through the official Symbiosis Easebuzz portal. Fast, verified, and secure checkout.
              </p>
            </div>

            {/* Direct Gateway CTA Button */}
            <div>
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-grotesk font-extrabold text-base tracking-wider uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] text-center"
              >
                <span>REGISTER &amp; PAY VIA EASEBUZZ</span>
                <ExternalLink className="w-4 h-4 text-slate-950 shrink-0 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <span className="text-[10px] font-mono text-center text-slate-400 block mt-2">
                Official Symbiosis Easebuzz Registration &amp; Fee Portal
              </span>
            </div>

            {/* Feature Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/10 text-xs font-rajdhani text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant Registration Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>UPI, Cards, NetBanking &amp; Wallets</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>256-bit Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Digital E-Pass Confirmation</span>
              </div>
            </div>

            {/* Helpdesk strip */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Questions? Contact:</span>
              <a
                href="mailto:symbitech@sitpune.edu.in"
                className="text-cyan-300 hover:underline truncate"
              >
                symbitech@sitpune.edu.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
