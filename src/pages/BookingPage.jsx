import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Car, User, Plane, Package, Briefcase, Map, Phone, Mail, ArrowLeft, ArrowRight, Check, MapPin, Calendar, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Loads the Maps JS script once across the app lifetime.
// If the key is missing we silently skip — inputs fall back to plain text.
function loadGoogleMapsScript() {
  if (!GOOGLE_MAPS_API_KEY) return Promise.resolve(false);
  if (window.google?.maps?.places) return Promise.resolve(true);

  const existingScript = document.getElementById("gm-script");
  if (existingScript) {
    // Script already injected — wait for it to finish loading
    return new Promise((resolve) => {
      existingScript.addEventListener("load",  () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
    });
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.id    = "gm-script";
    script.src   = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

/**
 * Attaches a Google Places Autocomplete widget to an input ref.
 *
 * @param {React.RefObject} inputRef  - ref attached to the <input> element
 * @param {Function}        onChange  - called with the formatted_address string when a place is selected
 * @param {object}          options   - optional Autocomplete options (e.g. componentRestrictions)
 *
 * Returns { ready } — true once the widget is attached (or false if Maps unavailable).
 */
function usePlacesAutocomplete(inputRef, onChange, options = {}) {
  const [ready, setReady] = useState(false);
  const acRef = useRef(null); // holds the Autocomplete instance

  useEffect(() => {
    let cancelled = false;

    loadGoogleMapsScript().then((loaded) => {
      if (cancelled || !loaded || !inputRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        // Bias results to Kenya; users can still type anywhere
        componentRestrictions: { country: "ke" },
        fields: ["formatted_address", "geometry", "name"],
        ...options,
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place?.formatted_address) {
          onChange(place.formatted_address);
        } else if (place?.name) {
          // Fallback: use the place name if no formatted address
          onChange(place.name);
        }
      });

      acRef.current = autocomplete;
      setReady(true);
    });

    return () => {
      cancelled = true;
      // Clean up the listener when the component unmounts
      if (acRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(acRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — we only attach once on mount

  return { ready };
}

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const BOOKING_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');

  :root {
    --card-bg:      rgba(255,255,255,0.72);
    --card-border:  rgba(255,255,255,0.55);
    --ease-expo:    cubic-bezier(0.16, 1, 0.3, 1);
    --ease-apple:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .bp-shell {
    opacity: 0; transform: translateY(16px); filter: blur(6px);
    transition: opacity 0.85s var(--ease-expo), transform 0.85s var(--ease-expo), filter 0.85s var(--ease-expo);
  }
  .bp-shell.loaded { opacity: 1; transform: none; filter: none; }

  .bp-splash {
    position: fixed; inset: 0; z-index: 2000;
    background: linear-gradient(135deg, var(--sky-light), var(--sky-dark));
    display: flex; align-items: center; justify-content: center;
    pointer-events: none; transition: opacity 0.6s var(--ease-expo);
  }
  .bp-splash.gone { opacity: 0; }
  .bp-spinner {
    width: 50px; height: 50px; border-radius: 50%;
    border: 3px solid rgba(255,92,11,0.18); border-top-color: var(--primary);
    animation: bpSpin 0.9s linear infinite;
  }
  @keyframes bpSpin { to { transform: rotate(360deg); } }

  .bp-grid {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(23,30,103,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23,30,103,0.025) 1px, transparent 1px);
    background-size: 56px 56px; animation: bpGridShift 35s linear infinite;
  }
  @keyframes bpGridShift { to { background-position: 56px 56px; } }
  .bp-orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
    filter: blur(80px); animation: bpOrbDrift 18s ease-in-out infinite alternate;
  }
  @keyframes bpOrbDrift {
    0%   { transform: translate(0,0)   scale(1); }
    50%  { transform: translate(25px,-35px) scale(1.07); }
    100% { transform: translate(-18px,18px) scale(0.94); }
  }

  .bp-progress {
    display: flex; align-items: center; justify-content: center;
    gap: 0; margin-bottom: 48px;
  }
  .bp-step-dot { display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; }
  .bp-step-circle {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700;
    transition: all 0.5s var(--ease-expo); position: relative; z-index: 1;
  }
  .bp-step-circle.done {
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    color: white; box-shadow: 0 6px 20px rgba(255,92,11,0.4);
  }
  .bp-step-circle.active {
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    color: white; box-shadow: 0 6px 20px rgba(255,92,11,0.4);
    animation: bpStepPulse 2s ease-in-out infinite;
  }
  @keyframes bpStepPulse {
    0%,100% { box-shadow: 0 6px 20px rgba(255,92,11,0.4); }
    50%      { box-shadow: 0 6px 32px rgba(255,92,11,0.7); }
  }
  .bp-step-circle.idle {
    background: rgba(255,255,255,0.7); color: rgba(23,30,103,0.4);
    border: 2px solid rgba(23,30,103,0.12); box-shadow: none;
  }
  .bp-step-label {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 1.2px; text-transform: uppercase; transition: color 0.4s; white-space: nowrap;
  }
  .bp-step-label.active { color: var(--primary); }
  .bp-step-label.done   { color: var(--primary); }
  .bp-step-label.idle   { color: rgba(23,30,103,0.35); }
  .bp-step-connector {
    width: 80px; height: 2px; margin: 0 4px; margin-bottom: 28px; flex-shrink: 0;
    transition: background 0.6s var(--ease-expo);
  }
  .bp-step-connector.done    { background: linear-gradient(90deg, #FF5C0B, #f97316); }
  .bp-step-connector.pending { background: rgba(23,30,103,0.12); }

  .bp-card {
    background: var(--card-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border); border-radius: 28px; padding: 48px;
    box-shadow: 0 24px 64px rgba(23,30,103,0.1), 0 1px 0 rgba(255,255,255,0.9) inset;
    position: relative; overflow: hidden;
  }
  .bp-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
  }

  /* ── Pre-selected service banner ── */
  .bp-preselect-banner {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,92,11,0.07); border: 1px solid rgba(255,92,11,0.2);
    border-radius: 14px; padding: 12px 16px; margin-bottom: 24px;
    font-family: 'Inter', sans-serif; font-size: 13px; color: var(--navy);
    animation: bpBannerIn 0.5s var(--ease-expo) both;
  }
  @keyframes bpBannerIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bp-preselect-banner strong { color: var(--primary); }
  .bp-preselect-banner button {
    margin-left: auto; background: none; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
    color: rgba(23,30,103,0.45); padding: 3px 8px; border-radius: 6px;
    transition: color 0.25s, background 0.25s;
  }
  .bp-preselect-banner button:hover { color: var(--primary); background: rgba(255,92,11,0.08); }

  .bp-service-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px;
  }
  @media (max-width: 700px) {
    .bp-service-grid { grid-template-columns: repeat(2, 1fr); }
    .bp-card { padding: 28px 20px; }
    .bp-step-connector { width: 40px; }
  }
  @media (max-width: 460px) { .bp-service-grid { grid-template-columns: 1fr 1fr; } }
  .bp-service-card {
    border-radius: 16px; padding: 20px 16px;
    border: 1.5px solid rgba(23,30,103,0.1); background: rgba(255,255,255,0.55);
    cursor: pointer; text-align: center; transition: all 0.38s var(--ease-expo);
    position: relative; overflow: hidden;
  }
  .bp-service-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,92,11,0.08), transparent);
    opacity: 0; transition: opacity 0.35s;
  }
  .bp-service-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(23,30,103,0.12); border-color: rgba(255,92,11,0.3); }
  .bp-service-card:hover::before { opacity: 1; }
  .bp-service-card.selected {
    border-color: var(--primary); background: rgba(255,92,11,0.06);
    box-shadow: 0 0 0 3px rgba(255,92,11,0.15), 0 16px 40px rgba(255,92,11,0.15);
    transform: translateY(-4px);
  }
  .bp-service-card.selected::before { opacity: 1; }
  .bp-service-icon {
    width: 46px; height: 46px; border-radius: 12px; margin: 0 auto 12px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.38s var(--ease-expo);
    background: rgba(23,30,103,0.07); color: var(--navy);
  }
  .bp-service-card.selected .bp-service-icon {
    background: linear-gradient(135deg, #FF5C0B, #f97316); color: white;
    box-shadow: 0 8px 20px rgba(255,92,11,0.4); transform: scale(1.08) rotate(-4deg);
  }
  .bp-service-card:hover:not(.selected) .bp-service-icon { transform: scale(1.06); }
  .bp-service-name {
    font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 600;
    color: var(--navy); line-height: 1.4; transition: color 0.3s;
  }
  .bp-service-card.selected .bp-service-name { color: var(--primary); }
  .bp-service-check {
    position: absolute; top: 8px; right: 8px;
    width: 20px; height: 20px; border-radius: 50%;
    background: linear-gradient(135deg, #FF5C0B, #f97316); color: white; font-size: 10px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: scale(0); transition: all 0.35s var(--ease-expo);
    box-shadow: 0 3px 10px rgba(255,92,11,0.5);
  }
  .bp-service-card.selected .bp-service-check { opacity: 1; transform: scale(1); }

  .bp-field { margin-bottom: 20px; }
  .bp-label {
    display: block; margin-bottom: 8px;
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 1.2px; text-transform: uppercase; color: rgba(23,30,103,0.6);
  }
  .bp-input-wrap { position: relative; }
  .bp-input-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: rgba(23,30,103,0.35); pointer-events: none; transition: color 0.3s;
    z-index: 1;
  }
  .bp-input-icon.top { top: 16px; transform: none; }
  .bp-input, .bp-select, .bp-textarea {
    width: 100%; padding: 13px 16px 13px 42px;
    border-radius: 14px; border: 1.5px solid rgba(23,30,103,0.13);
    background: rgba(255,255,255,0.75); backdrop-filter: blur(8px);
    font-family: 'Inter', sans-serif; font-size: 14px; color: var(--navy);
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
    -webkit-appearance: none;
  }
  .bp-input.no-icon, .bp-select.no-icon { padding-left: 16px; }
  .bp-input:focus, .bp-select:focus, .bp-textarea:focus {
    border-color: var(--primary); box-shadow: 0 0 0 3.5px rgba(255,92,11,0.13);
    background: rgba(255,255,255,0.95);
  }
  .bp-input:focus ~ .bp-input-icon, .bp-input-wrap:focus-within .bp-input-icon { color: var(--primary); }
  .bp-input::placeholder, .bp-textarea::placeholder { color: rgba(23,30,103,0.28); }
  .bp-textarea { resize: none; height: 90px; padding-top: 14px; line-height: 1.6; }
  .bp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 560px) { .bp-row { grid-template-columns: 1fr; } }

  /* ── Places autocomplete hint text ── */
  .bp-places-hint {
    display: flex; align-items: center; gap: 5px;
    margin-top: 5px;
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: rgba(23,30,103,0.38);
  }
  .bp-places-hint.active { color: #22c55e; }

  /* ── Google autocomplete dropdown styling override ── */
  .pac-container {
    border-radius: 14px !important;
    border: 1.5px solid rgba(23,30,103,0.13) !important;
    box-shadow: 0 16px 48px rgba(23,30,103,0.14) !important;
    font-family: 'Inter', sans-serif !important;
    margin-top: 4px !important;
    overflow: hidden;
    z-index: 9999 !important;
  }
  .pac-item {
    padding: 10px 16px !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 13px !important;
    color: var(--navy) !important;
    cursor: pointer;
    border-top: 1px solid rgba(23,30,103,0.06) !important;
    transition: background 0.2s;
  }
  .pac-item:first-child { border-top: none !important; }
  .pac-item:hover, .pac-item-selected { background: rgba(255,92,11,0.06) !important; }
  .pac-item-query { font-weight: 600 !important; color: var(--navy) !important; }
  .pac-matched { color: var(--primary) !important; font-weight: 700 !important; }
  .pac-icon { display: none !important; } /* hide the default Google pin icon */

  .bp-contact-toggle {
    display: flex; border-radius: 14px; overflow: hidden;
    border: 1.5px solid rgba(23,30,103,0.13); background: rgba(255,255,255,0.55); margin-bottom: 16px;
  }
  .bp-toggle-btn {
    flex: 1; padding: 12px; border: none; cursor: pointer; background: transparent;
    font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
    color: rgba(23,30,103,0.5);
    display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: all 0.35s var(--ease-expo);
  }
  .bp-toggle-btn.active {
    background: linear-gradient(135deg, #FF5C0B, #f97316); color: white;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .bp-summary {
    background: rgba(23,30,103,0.04); border: 1px solid rgba(23,30,103,0.08);
    border-radius: 18px; padding: 24px; margin-bottom: 28px;
  }
  .bp-summary-title { font-family: 'Abhaya Libre', serif; font-size: 18px; font-weight: 800; color: var(--navy); margin-bottom: 16px; }
  .bp-summary-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-family: 'Inter', sans-serif; font-size: 13.5px; }
  .bp-summary-row:last-child { margin-bottom: 0; }
  .bp-summary-key { color: rgba(23,30,103,0.5); font-weight: 500; min-width: 80px; flex-shrink: 0; }
  .bp-summary-val { color: var(--navy); font-weight: 600; }

  .bp-nav-row { display: flex; align-items: center; justify-content: space-between; margin-top: 36px; gap: 12px; }
  .bp-btn-back {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 22px; border-radius: 50px; border: 1.5px solid rgba(23,30,103,0.15);
    background: rgba(255,255,255,0.7);
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    color: var(--navy); cursor: pointer; transition: all 0.35s var(--ease-expo);
  }
  .bp-btn-back:hover { border-color: var(--primary); color: var(--primary); transform: translateX(-3px); }
  .bp-btn-next, .bp-btn-submit {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 50px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    color: white; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    box-shadow: 0 8px 24px rgba(255,92,11,0.38); transition: all 0.38s var(--ease-expo);
    position: relative; overflow: hidden;
  }
  .bp-btn-next::after, .bp-btn-submit::after {
    content: ''; position: absolute; top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
    transition: left 0.7s var(--ease-expo);
  }
  .bp-btn-next:hover::after, .bp-btn-submit:hover::after { left: 130%; }
  .bp-btn-next:hover, .bp-btn-submit:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 16px 40px rgba(255,92,11,0.5); }
  .bp-btn-next:disabled, .bp-btn-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
  .bp-btn-submit.loading { pointer-events: none; }
  .bp-btn-submit .btn-spinner {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.4); border-top-color: white;
    animation: bpSpin 0.7s linear infinite;
  }

  .bp-error-text { font-family: 'Inter', sans-serif; font-size: 11.5px; color: #ef4444; margin-top: 5px; display: flex; align-items: center; gap: 4px; }
  .bp-field-error .bp-input, .bp-field-error .bp-select { border-color: #ef4444 !important; }

  .bp-step-panel { animation: bpStepIn 0.5s var(--ease-expo) both; }
  @keyframes bpStepIn {
    from { opacity: 0; transform: translateX(24px); filter: blur(4px); }
    to   { opacity: 1; transform: translateX(0);    filter: blur(0); }
  }
  .bp-step-panel.back { animation: bpStepInBack 0.5s var(--ease-expo) both; }
  @keyframes bpStepInBack {
    from { opacity: 0; transform: translateX(-24px); filter: blur(4px); }
    to   { opacity: 1; transform: translateX(0);     filter: blur(0); }
  }

  .bp-section-label { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #6366f1; margin-bottom: 6px; }
  .bp-section-title { font-family: 'Abhaya Libre', serif; font-size: clamp(1.7rem, 3vw, 2.2rem); font-weight: 800; color: var(--primary); margin-bottom: 28px; line-height: 1.1; }

  .bp-success { text-align: center; padding: 24px 0; animation: bpStepIn 0.6s var(--ease-expo) both; }
  .bp-success-ring {
    width: 88px; height: 88px; border-radius: 50%; margin: 0 auto 28px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 16px 40px rgba(34,197,94,0.4);
    animation: bpSuccessRing 0.7s var(--ease-expo) 0.15s both;
  }
  @keyframes bpSuccessRing {
    from { transform: scale(0) rotate(-20deg); opacity: 0; }
    to   { transform: scale(1) rotate(0deg);   opacity: 1; }
  }
  .bp-success-title { font-family: 'Abhaya Libre', serif; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; color: var(--navy); margin-bottom: 10px; }
  .bp-success-sub { font-family: 'Inter', sans-serif; font-size: 15px; color: rgba(23,30,103,0.7); line-height: 1.7; max-width: 460px; margin: 0 auto 32px; }
  .bp-success-details {
    background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.2);
    border-radius: 16px; padding: 20px 24px; margin: 0 auto 36px; max-width: 400px; text-align: left;
  }
  .bp-success-ctas { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
  .bp-cta-primary {
    padding: 13px 26px; border-radius: 50px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    color: white; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
    box-shadow: 0 8px 24px rgba(255,92,11,0.35); transition: all 0.35s var(--ease-expo);
  }
  .bp-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(255,92,11,0.45); }
  .bp-cta-secondary {
    padding: 13px 26px; border-radius: 50px; cursor: pointer;
    border: 1.5px solid rgba(23,30,103,0.18); background: rgba(255,255,255,0.7);
    color: var(--navy); font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
    transition: all 0.35s var(--ease-expo);
  }
  .bp-cta-secondary:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-2px); }

  .bp-hero-pill {
    display: inline-block; padding: 7px 18px; margin-bottom: 16px; border-radius: 50px;
    background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
    color: var(--accent); font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase;
  }
  .bp-hero-title {
    font-family: 'Abhaya Libre', serif; font-size: clamp(3.2rem, 7vw, 5.5rem);
    font-weight: 800; line-height: 1;
    background: linear-gradient(135deg, #FF5C0B 30%, #f97316 80%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 14px;
  }
  .bp-hero-sub { font-family: 'Inter', sans-serif; font-size: 16px; color: var(--navy); opacity: 0.75; line-height: 1.7; max-width: 480px; margin: 0 auto; }

  @media (prefers-reduced-motion: reduce) {
    .bp-shell, .bp-step-panel { transition: none !important; animation: none !important; }
    .bp-success-ring { animation: none !important; }
  }
`;

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById("bp-styles")) return;
    const tag = document.createElement("style");
    tag.id = "bp-styles";
    tag.textContent = BOOKING_STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
  return null;
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SERVICES = [
  { id: "chauffeur",  label: "Chauffeur Service",    icon: User,       emoji: "🚘" },
  { id: "selfdrive",  label: "Self-Drive",            icon: Car,        emoji: "🚗" },
  { id: "airport",    label: "Airport Transfer",      icon: Plane,      emoji: "✈️" },
  { id: "courier",    label: "Package Delivery",      icon: Package,    emoji: "📦" },
  { id: "lease",      label: "Lease Hire",            icon: Briefcase,  emoji: "💼" },
  { id: "safari",     label: "Safari Tour",           icon: Map,        emoji: "🦒" },
];

/* ─────────────────────────────────────────
   VALIDATION HELPERS
───────────────────────────────────────── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v) => v.trim().length >= 9;

/* ─────────────────────────────────────────
   LOCATION INPUT COMPONENT
   Wraps an input with Places Autocomplete.
   Falls back to a plain input if API key is missing.
───────────────────────────────────────── */
function LocationInput({ value, onChange, placeholder, hasError }) {
  const inputRef = useRef(null);

  // Keep the input's displayed value in sync when the parent clears it
  useEffect(() => {
    if (inputRef.current && value === "") {
      inputRef.current.value = "";
    }
  }, [value]);

  const { ready } = usePlacesAutocomplete(
    inputRef,
    useCallback((address) => onChange(address), [onChange])
  );

  return (
    <>
      <div className="bp-input-wrap">
        <MapPin size={15} className="bp-input-icon" />
        <input
          ref={inputRef}
          type="text"
          className={`bp-input${hasError ? " bp-field-error" : ""}`}
          placeholder={placeholder}
          defaultValue={value}
          // Allow free typing too — sync on every keystroke so validation works
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </div>
      {/* Subtle hint below each location field */}
      <p className={`bp-places-hint ${ready ? "active" : ""}`}>
        {ready
          ? "✓ Address autocomplete active — start typing to search"
          : GOOGLE_MAPS_API_KEY
            ? "Loading autocomplete…"
            : "Enter your location manually"
        }
      </p>
    </>
  );
}

/* ─────────────────────────────────────────
   BOOKING PAGE
───────────────────────────────────────── */
export default function BookingPage() {
  const navigate        = useNavigate();
  const [searchParams]  = useSearchParams();

  const [splash, setSplash]         = useState(true);
  const [loaded, setLoaded]         = useState(false);
  const [step, setStep]             = useState(1);
  const [direction, setDirection]   = useState("forward");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]         = useState({});

  // Form state — selectedService seeded from ?service= query param
  const [selectedService, setSelectedService] = useState(() => {
    const param = searchParams.get("service") || "";
    return SERVICES.some((s) => s.id === param) ? param : "";
  });

  const [date, setDate]               = useState("");
  const [time, setTime]               = useState("");
  const [pickup, setPickup]           = useState("");
  const [dropoff, setDropoff]         = useState("");
  const [name, setName]               = useState("");
  const [contactType, setContactType] = useState("phone");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [notes, setNotes]             = useState("");

  const preselectedId  = searchParams.get("service") || "";
  const wasPreselected = SERVICES.some((s) => s.id === preselectedId);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setSplash(false), 600);
    const t2 = requestAnimationFrame(() => setLoaded(true));
    return () => { clearTimeout(t1); cancelAnimationFrame(t2); };
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];

  function validateStep1() {
    const e = {};
    if (!selectedService) e.service = "Please select a service.";
    if (!date)            e.date    = "Please choose a date.";
    if (!time)            e.time    = "Please choose a time.";
    if (!pickup.trim())   e.pickup  = "Please enter a pickup location.";
    if (!dropoff.trim())  e.dropoff = "Please enter a drop-off location.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    if (contactType === "phone") {
      if (!phone.trim())             e.contact = "Please enter your phone number.";
      else if (!isValidPhone(phone)) e.contact = "Please enter a valid phone number.";
    } else {
      if (!email.trim())             e.contact = "Please enter your email address.";
      else if (!isValidEmail(email)) e.contact = "Please enter a valid email address.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (!validateStep1()) return;
    setDirection("forward");
    setErrors({});
    setStep(2);
  }

  function goBack() {
    setDirection("back");
    setErrors({});
    setStep(1);
  }

  async function handleSubmit() {
    if (!validateStep2()) return;
    setSubmitting(true);

    const contact     = contactType === "phone" ? phone : email;
    const serviceName = SERVICES.find((s) => s.id === selectedService)?.label || selectedService;

    const templateParams = {
      to_name:  name.trim(),
      to_email: contactType === "email" ? email.trim() : "",
      service:  serviceName,
      date,
      time,
      pickup:   pickup.trim(),
      dropoff:  dropoff.trim(),
      contact,
      notes:    notes.trim() || "None",
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
    } catch (err) {
      console.warn("EmailJS not configured or failed:", err);
    } finally {
      setSubmitting(false);
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const serviceLabel = SERVICES.find((s) => s.id === selectedService)?.label || "—";
  const panelKey     = `step-${step}-${direction}`;

  // Stable callbacks for LocationInput so the hook's useEffect doesn't re-run
  const handlePickupChange  = useCallback((val) => { setPickup(val);  setErrors((e) => ({ ...e, pickup:  undefined })); }, []);
  const handleDropoffChange = useCallback((val) => { setDropoff(val); setErrors((e) => ({ ...e, dropoff: undefined })); }, []);

  return (
    <>
      <StyleInjector />

      <div className={`bp-splash ${!splash ? "gone" : ""}`} aria-hidden="true">
        <div className="bp-spinner" />
      </div>

      <div className="bp-grid" />
      <div className="bp-orb" style={{ width: 480, height: 480, top: "0%",    left: "-8%",  background: "radial-gradient(circle, rgba(147,210,230,0.3), transparent 70%)",  opacity: 0.12 }} />
      <div className="bp-orb" style={{ width: 360, height: 360, top: "40%",   right: "-6%", background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)",   opacity: 0.1,  animationDelay: "7s" }} />
      <div className="bp-orb" style={{ width: 300, height: 300, bottom: "10%",left: "15%",  background: "radial-gradient(circle, rgba(174,221,234,0.35), transparent 70%)", opacity: 0.12, animationDelay: "14s" }} />

      <Navbar />

      <div
        className={`bp-shell ${loaded ? "loaded" : ""}`}
        style={{
          position: "relative", zIndex: 1, minHeight: "100vh",
          background: "linear-gradient(to bottom, #eaf6fb 0%, #dff1f7 55%, #cfe8ef 100%)",
        }}
      >
        {/* ── Hero strip ── */}
        <div style={{ paddingTop: 130, paddingBottom: 60, textAlign: "center", padding: "130px 24px 60px" }}>
          <span className="bp-hero-pill">Premium Transport</span>
          <h1 className="bp-hero-title">Book a Service</h1>
          <p className="bp-hero-sub">
            Fill in your details below and we'll confirm your booking shortly.
          </p>
        </div>

        {/* ── Form area ── */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 100px" }}>

          {step !== "success" && (
            <div className="bp-progress">
              <div className="bp-step-dot">
                <div className={`bp-step-circle ${step === 1 ? "active" : "done"}`}>
                  {step > 1 ? <Check size={16} /> : "1"}
                </div>
                <span className={`bp-step-label ${step === 1 ? "active" : "done"}`}>Trip Details</span>
              </div>
              <div className={`bp-step-connector ${step > 1 ? "done" : "pending"}`} />
              <div className="bp-step-dot">
                <div className={`bp-step-circle ${step === 2 ? "active" : step > 2 ? "done" : "idle"}`}>
                  {step > 2 ? <Check size={16} /> : "2"}
                </div>
                <span className={`bp-step-label ${step === 2 ? "active" : step > 2 ? "done" : "idle"}`}>Your Info</span>
              </div>
            </div>
          )}

          <div className="bp-card">

            {/* ══ STEP 1 ══ */}
            {step === 1 && (
              <div key={panelKey} className={`bp-step-panel ${direction === "back" ? "back" : ""}`}>
                <p className="bp-section-label">Step 1 of 2</p>
                <h2 className="bp-section-title">Trip Details</h2>

                {/* Pre-selected service banner */}
                {wasPreselected && selectedService && (
                  <div className="bp-preselect-banner">
                    <span>{SERVICES.find((s) => s.id === selectedService)?.emoji}</span>
                    <span>Booking for <strong>{serviceLabel}</strong> — change below if needed.</span>
                    <button type="button" onClick={() => setSelectedService("")} aria-label="Clear pre-selected service">
                      Change ✕
                    </button>
                  </div>
                )}

                {/* Service selector */}
                <div className="bp-field" style={{ marginBottom: errors.service ? 6 : 28 }}>
                  <label className="bp-label">Choose a Service</label>
                  <div className="bp-service-grid">
                    {SERVICES.map((svc) => {
                      const Icon   = svc.icon;
                      const active = selectedService === svc.id;
                      return (
                        <div
                          key={svc.id}
                          className={`bp-service-card ${active ? "selected" : ""}`}
                          onClick={() => { setSelectedService(svc.id); setErrors((e) => ({ ...e, service: undefined })); }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && setSelectedService(svc.id)}
                        >
                          <div className="bp-service-check"><Check size={10} /></div>
                          <div className="bp-service-icon"><Icon size={20} /></div>
                          <p className="bp-service-name">{svc.label}</p>
                        </div>
                      );
                    })}
                  </div>
                  {errors.service && <p className="bp-error-text">⚠ {errors.service}</p>}
                </div>

                {/* Date & Time */}
                <div className="bp-row">
                  <div className={`bp-field ${errors.date ? "bp-field-error" : ""}`}>
                    <label className="bp-label">Date</label>
                    <div className="bp-input-wrap">
                      <Calendar size={15} className="bp-input-icon" />
                      <input
                        type="date" className="bp-input" min={todayStr} value={date}
                        onChange={(e) => { setDate(e.target.value); setErrors((er) => ({ ...er, date: undefined })); }}
                      />
                    </div>
                    {errors.date && <p className="bp-error-text">⚠ {errors.date}</p>}
                  </div>
                  <div className={`bp-field ${errors.time ? "bp-field-error" : ""}`}>
                    <label className="bp-label">Time</label>
                    <div className="bp-input-wrap">
                      <Clock size={15} className="bp-input-icon" />
                      <input
                        type="time" className="bp-input" value={time}
                        onChange={(e) => { setTime(e.target.value); setErrors((er) => ({ ...er, time: undefined })); }}
                      />
                    </div>
                    {errors.time && <p className="bp-error-text">⚠ {errors.time}</p>}
                  </div>
                </div>

                {/* ── Pickup — Places Autocomplete ── */}
                <div className={`bp-field ${errors.pickup ? "bp-field-error" : ""}`}>
                  <label className="bp-label">Pickup Location</label>
                  <LocationInput
                    value={pickup}
                    onChange={handlePickupChange}
                    placeholder="e.g. JKIA Terminal 1A, Nairobi"
                    hasError={!!errors.pickup}
                  />
                  {errors.pickup && <p className="bp-error-text">⚠ {errors.pickup}</p>}
                </div>

                {/* ── Drop-off — Places Autocomplete ── */}
                <div className={`bp-field ${errors.dropoff ? "bp-field-error" : ""}`}>
                  <label className="bp-label">Drop-off Location</label>
                  <LocationInput
                    value={dropoff}
                    onChange={handleDropoffChange}
                    placeholder="e.g. Radisson Blu, Upper Hill"
                    hasError={!!errors.dropoff}
                  />
                  {errors.dropoff && <p className="bp-error-text">⚠ {errors.dropoff}</p>}
                </div>

                <div className="bp-nav-row" style={{ justifyContent: "flex-end" }}>
                  <button className="bp-btn-next" onClick={goNext}>
                    Next: Your Info <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ══ STEP 2 ══ */}
            {step === 2 && (
              <div key={panelKey} className={`bp-step-panel ${direction === "back" ? "back" : ""}`}>
                <p className="bp-section-label">Step 2 of 2</p>
                <h2 className="bp-section-title">Your Information</h2>

                <div className="bp-summary">
                  <p className="bp-summary-title">📋 Booking Summary</p>
                  <div className="bp-summary-row"><span className="bp-summary-key">Service</span> <span className="bp-summary-val">{serviceLabel}</span></div>
                  <div className="bp-summary-row"><span className="bp-summary-key">Date</span>    <span className="bp-summary-val">{date || "—"}</span></div>
                  <div className="bp-summary-row"><span className="bp-summary-key">Time</span>    <span className="bp-summary-val">{time || "—"}</span></div>
                  <div className="bp-summary-row"><span className="bp-summary-key">Pickup</span>  <span className="bp-summary-val">{pickup || "—"}</span></div>
                  <div className="bp-summary-row"><span className="bp-summary-key">Drop-off</span><span className="bp-summary-val">{dropoff || "—"}</span></div>
                </div>

                <div className={`bp-field ${errors.name ? "bp-field-error" : ""}`}>
                  <label className="bp-label">Full Name</label>
                  <div className="bp-input-wrap">
                    <User size={15} className="bp-input-icon" />
                    <input
                      type="text" className="bp-input" placeholder="Your full name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })); }}
                    />
                  </div>
                  {errors.name && <p className="bp-error-text">⚠ {errors.name}</p>}
                </div>

                <div className="bp-field">
                  <label className="bp-label">Preferred Contact Method</label>
                  <div className="bp-contact-toggle">
                    <button
                      type="button"
                      className={`bp-toggle-btn ${contactType === "phone" ? "active" : ""}`}
                      onClick={() => { setContactType("phone"); setErrors((er) => ({ ...er, contact: undefined })); }}
                    >
                      <Phone size={14} /> Phone Number
                    </button>
                    <button
                      type="button"
                      className={`bp-toggle-btn ${contactType === "email" ? "active" : ""}`}
                      onClick={() => { setContactType("email"); setErrors((er) => ({ ...er, contact: undefined })); }}
                    >
                      <Mail size={14} /> Email Address
                    </button>
                  </div>
                  <div className={`bp-input-wrap ${errors.contact ? "bp-field-error" : ""}`}>
                    {contactType === "phone" ? (
                      <>
                        <Phone size={15} className="bp-input-icon" />
                        <input
                          type="tel" className="bp-input" placeholder="+254 700 000 000"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setErrors((er) => ({ ...er, contact: undefined })); }}
                        />
                      </>
                    ) : (
                      <>
                        <Mail size={15} className="bp-input-icon" />
                        <input
                          type="email" className="bp-input" placeholder="you@example.com"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, contact: undefined })); }}
                        />
                      </>
                    )}
                  </div>
                  {errors.contact && <p className="bp-error-text">⚠ {errors.contact}</p>}
                </div>

                <div className="bp-field">
                  <label className="bp-label">Additional Notes <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span></label>
                  <div className="bp-input-wrap">
                    <textarea
                      className="bp-textarea no-icon" style={{ paddingLeft: 16 }}
                      placeholder="Any special requests, luggage info, preferred route..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bp-nav-row">
                  <button className="bp-btn-back" onClick={goBack}>
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    className={`bp-btn-submit ${submitting ? "loading" : ""}`}
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting
                      ? <><div className="btn-spinner" /> Confirming…</>
                      : <>Confirm Booking <ArrowRight size={16} /></>
                    }
                  </button>
                </div>
              </div>
            )}

            {/* ══ SUCCESS ══ */}
            {step === "success" && (
              <div className="bp-success">
                <div className="bp-success-ring">
                  <Check size={40} color="white" strokeWidth={3} />
                </div>
                <h2 className="bp-success-title">Booking Confirmed!</h2>
                <p className="bp-success-sub">
                  Thank you, <strong>{name}</strong>! Your {serviceLabel.toLowerCase()} booking request has been received.
                  {contactType === "email"
                    ? ` We'll contact you shortly via ${email}.`
                    : ` We'll reach you on ${phone} shortly.`
                  }
                </p>
                <div className="bp-success-details">
                  <div className="bp-summary-row"><span className="bp-summary-key">Service</span> <span className="bp-summary-val">{serviceLabel}</span></div>
                  <div className="bp-summary-row"><span className="bp-summary-key">Date</span>    <span className="bp-summary-val">{date}</span></div>
                  <div className="bp-summary-row"><span className="bp-summary-key">Time</span>    <span className="bp-summary-val">{time}</span></div>
                  <div className="bp-summary-row"><span className="bp-summary-key">Pickup</span>  <span className="bp-summary-val">{pickup}</span></div>
                  <div className="bp-summary-row" style={{ marginBottom: 0 }}>
                    <span className="bp-summary-key">Drop-off</span>
                    <span className="bp-summary-val">{dropoff}</span>
                  </div>
                </div>
                <div className="bp-success-ctas">
                  <button className="bp-cta-primary"   onClick={() => navigate("/")}>Back to Home</button>
                  <button className="bp-cta-secondary" onClick={() => navigate("/services")}>View All Services</button>
                  <button
                    className="bp-cta-secondary"
                    onClick={() => {
                      setStep(1); setDirection("forward");
                      setSelectedService(""); setDate(""); setTime("");
                      setPickup(""); setDropoff(""); setName("");
                      setPhone(""); setEmail(""); setNotes(""); setErrors({});
                    }}
                  >
                    Book Another
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}