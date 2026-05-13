import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";

import aboutImg from "../assets/images/about.jpg";
import heroImg from "../assets/images/hero-about.jpg";
import nairobiImg from "../assets/images/nairobi.jpg";

/* ─────────────────────────────────────────
   HOOK: IntersectionObserver reveal
───────────────────────────────────────── */
function useReveal(threshold = 0.15, { once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}

/* ─────────────────────────────────────────
   HOOK: Parallax on scroll
───────────────────────────────────────── */
function useParallax(speed = 0.08) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${center * speed}px, 0) scale(1.08)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}

/* ─────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────── */
const ABOUT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --orange: #FF5C0B;
    --navy: #171E67;
    --cream: #f9f6f1;
    --sky: #cfe8ef;
    --sky-light: #eaf6fb;
    --glass: rgba(255,255,255,0.65);
    --glass-strong: rgba(255,255,255,0.82);
    --glass-border: rgba(255,255,255,0.45);
    --ease-apple: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --font-head: 'Abhaya Libre', serif;
    --font-body: 'Inter', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); }

  .about-page {
    min-height: 100vh;
    position: relative;
    z-index: 1;
    overflow: hidden;
    background: linear-gradient(to bottom, #eaf6fb 0%, #dff1f7 50%, #cfe8ef 100%);
    color: var(--navy);
  }

  .about-shell {
    opacity: 0;
    transform: translateY(14px);
    filter: blur(6px);
    transition:
      opacity 0.9s var(--ease-out-expo),
      transform 0.9s var(--ease-out-expo),
      filter 0.9s var(--ease-out-expo);
    will-change: opacity, transform, filter;
  }
  .about-shell.loaded { opacity: 1; transform: translateY(0); filter: blur(0); }

  .about-splash {
    position: fixed; inset: 0; z-index: 2000;
    display: flex; align-items: center; justify-content: center;
    pointer-events: none; opacity: 1;
    background: linear-gradient(135deg, #eaf6fb, #cfe8ef);
    transition: opacity 0.7s var(--ease-out-expo);
  }
  .about-splash.hidden { opacity: 0; }

  .about-splash-ring {
    width: 54px; height: 54px; border-radius: 50%;
    border: 3px solid rgba(255,92,11,0.18);
    border-top-color: var(--orange);
    animation: aboutSpin 0.9s linear infinite;
  }
  @keyframes aboutSpin { to { transform: rotate(360deg); } }

  .about-grid-bg {
    position: fixed; inset: 0; z-index: 0;
    pointer-events: none; opacity: 0.22;
    background-image:
      linear-gradient(rgba(23,30,103,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23,30,103,0.06) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: linear-gradient(to bottom, black, transparent 88%);
    animation: gridShift 30s linear infinite;
  }
  @keyframes gridShift {
    0%   { background-position: 0 0; }
    100% { background-position: 52px 52px; }
  }

  .orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
    filter: blur(80px); opacity: 0.12;
    animation: orbDrift 18s ease-in-out infinite alternate;
  }
  @keyframes orbDrift {
    0%   { transform: translate(0, 0) scale(1); }
    50%  { transform: translate(30px, -40px) scale(1.08); }
    100% { transform: translate(-20px, 20px) scale(0.95); }
  }

  .about-reveal {
    opacity: 0;
    filter: blur(8px);
    transition:
      opacity 0.9s var(--ease-out-expo),
      transform 0.9s var(--ease-out-expo),
      filter 0.9s var(--ease-out-expo);
    will-change: opacity, transform, filter;
  }
  .about-reveal.from-bottom { transform: translateY(60px); }
  .about-reveal.from-left { transform: translateX(-60px); }
  .about-reveal.from-right { transform: translateX(60px); }
  .about-reveal.scale-up { transform: scale(0.92); }
  .about-reveal.visible { opacity: 1 !important; transform: none !important; filter: blur(0) !important; }

  .delay-0 { transition-delay: 0ms; }
  .delay-1 { transition-delay: 120ms; }
  .delay-2 { transition-delay: 220ms; }
  .delay-3 { transition-delay: 320ms; }
  .delay-4 { transition-delay: 420ms; }
  .delay-5 { transition-delay: 520ms; }

  .about-hero {
    min-height: 92vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 140px 24px 96px;
    text-align: center;
    isolation: isolate;
  }

  .about-hero-img {
    position: absolute; inset: 0; z-index: -3;
    width: 100%; height: 100%; object-fit: cover;
    transform: scale(1.08); will-change: transform;
  }

  .about-hero-overlay {
    position: absolute; inset: 0; z-index: -2;
    background:
      radial-gradient(circle at 50% 35%, rgba(255,92,11,0.16), transparent 34%),
      linear-gradient(180deg, rgba(5,8,22,0.42), rgba(5,8,22,0.74));
  }

  .about-hero-grain {
    position: absolute; inset: -20%; z-index: -1;
    pointer-events: none; opacity: 0.06; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>");
    animation: aboutGrain 8s steps(6) infinite;
  }
  @keyframes aboutGrain {
    0%, 100% { transform: translate(0,0); }
    25% { transform: translate(-2%, 1%); }
    50% { transform: translate(1%, -2%); }
    75% { transform: translate(-1%, -1%); }
  }

  .about-hero-content { max-width: 840px; color: white; }

  .about-pill {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 10px 18px;
    border: 1px solid rgba(255,255,255,0.28);
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    color: rgba(255,255,255,0.9);
    font-family: var(--font-body);
    font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  }

  .about-title {
    margin: 22px 0 0;
    font-family: var(--font-head);
    font-size: clamp(4rem, 8vw, 7.4rem);
    font-weight: 800;
    line-height: 0.9;
    color: var(--orange);
    text-shadow: 0 24px 70px rgba(0,0,0,0.25);
  }
  .about-title span { color: white; }

  .about-sub {
    max-width: 650px;
    margin: 26px auto 0;
    color: rgba(255,255,255,0.86);
    font-family: var(--font-body);
    font-size: 18px; font-weight: 400; line-height: 1.8;
  }

  .about-scroll-cue {
    position: absolute; left: 50%; bottom: 30px;
    transform: translateX(-50%);
    width: 26px; height: 42px;
    border: 1px solid rgba(255,255,255,0.45);
    border-radius: 999px; opacity: 0.85;
  }
  .about-scroll-cue::after {
    content: ""; position: absolute; top: 9px; left: 50%;
    width: 4px; height: 8px; border-radius: 999px;
    background: white; transform: translateX(-50%);
    animation: aboutScrollBounce 1.5s ease-in-out infinite;
  }
  @keyframes aboutScrollBounce {
    0%, 100% { transform: translate(-50%, 0); opacity: 0.9; }
    50% { transform: translate(-50%, 10px); opacity: 0.35; }
  }

  .stats-wrap { position: relative; z-index: 3; margin-top: -74px; padding: 0 24px 90px; }

  .stats-card {
    max-width: 960px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; overflow: hidden;
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    background: rgba(255,255,255,0.38);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 24px 80px rgba(23,30,103,0.16);
  }

  .stat-item {
    padding: 34px 24px; text-align: center;
    background: rgba(255,255,255,0.68);
    transition: transform 0.5s var(--ease-apple), background 0.4s var(--ease-apple), box-shadow 0.4s var(--ease-apple);
    position: relative; overflow: hidden;
  }
  .stat-item::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,92,11,0.08), transparent 55%);
    opacity: 0; transition: opacity 0.4s var(--ease-apple);
    pointer-events: none;
  }
  .stat-item:hover { transform: translateY(-6px); background: rgba(255,255,255,0.86); box-shadow: 0 12px 30px rgba(0,0,0,0.05); }
  .stat-item:hover::after { opacity: 1; }

  .stat-num {
    font-family: var(--font-head);
    font-size: clamp(2.2rem, 4vw, 3.3rem);
    font-weight: 800; line-height: 1; color: var(--orange);
  }
  .stat-label {
    margin-top: 8px;
    color: rgba(23,30,103,0.74);
    font-family: var(--font-body);
    font-size: 12px; font-weight: 600;
    letter-spacing: 1.8px; text-transform: uppercase;
  }

  .about-section { position: relative; padding: 110px 24px; }
  .about-container { width: min(1180px, 100%); margin: 0 auto; }

  .split-grid {
    display: grid; grid-template-columns: 1.02fr 0.98fr;
    gap: 70px; align-items: center;
  }

  .image-card {
    position: relative; overflow: hidden; min-height: 440px;
    border: 1px solid var(--glass-border);
    border-radius: 28px;
    background: var(--glass);
    box-shadow: 0 26px 80px rgba(23,30,103,0.14);
    transition: transform 0.6s var(--ease-apple), box-shadow 0.6s var(--ease-apple);
  }
  .image-card:hover { transform: translateY(-6px); box-shadow: 0 40px 100px rgba(0,0,0,0.2); }
  .image-card::before {
    content: ""; position: absolute; inset: 16px; z-index: 2;
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 20px; pointer-events: none;
  }
  .image-card img {
    width: 100%; height: 100%; min-height: 440px;
    object-fit: cover;
    transition: transform 1.1s var(--ease-out-expo);
  }
  .image-card:hover img { transform: scale(1.06); }
  .image-card-overlay {
    position: absolute; inset: 0; z-index: 3; border-radius: 28px;
    background: linear-gradient(to top, rgba(23,30,103,0.78) 0%, rgba(23,30,103,0.08) 50%, transparent 100%);
    display: flex; align-items: flex-end; padding: 28px;
    opacity: 0; transition: opacity 0.5s var(--ease-apple);
    pointer-events: none;
  }
  .image-card:hover .image-card-overlay { opacity: 1; }
  .image-card-overlay-text {
    font-family: var(--font-head); font-size: 22px; font-weight: 800;
    color: white; line-height: 1.2;
    transform: translateY(14px); transition: transform 0.5s var(--ease-out-expo);
  }
  .image-card:hover .image-card-overlay-text { transform: translateY(0); }

  .eyebrow {
    display: inline-flex; align-items: center; gap: 9px;
    color: #6366f1;
    font-family: var(--font-body);
    font-size: 12px; font-weight: 600;
    letter-spacing: 2.5px; text-transform: uppercase;
  }
  .eyebrow::before { content: ""; width: 30px; height: 1px; background: currentColor; }

  .section-title {
    margin: 14px 0 22px;
    color: var(--orange);
    font-family: var(--font-head);
    font-size: clamp(2.6rem, 4.8vw, 4.3rem);
    font-weight: 800; line-height: 0.98;
  }

  .section-copy {
    color: rgba(23,30,103,0.78);
    font-family: var(--font-body);
    font-size: 16px; line-height: 1.85;
  }

  .check-grid {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px; margin-top: 32px;
  }

  .check-item {
    display: flex; align-items: center; gap: 12px;
    min-height: 54px; padding: 14px 16px;
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    background: rgba(255,255,255,0.58);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    color: var(--navy);
    font-family: var(--font-body);
    font-size: 14px; font-weight: 600;
    box-shadow: 0 8px 30px rgba(23,30,103,0.06);
    position: relative; overflow: hidden;
    transition:
      transform 0.35s var(--ease-apple),
      background 0.35s var(--ease-apple),
      box-shadow 0.35s var(--ease-apple),
      border-color 0.35s var(--ease-apple);
  }
  .check-item::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,92,11,0.08), transparent 55%);
    opacity: 0; transition: opacity 0.4s var(--ease-apple);
    pointer-events: none;
  }
  .check-item:hover {
    transform: translateY(-4px);
    background: rgba(255,255,255,0.82);
    box-shadow: 0 16px 44px rgba(23,30,103,0.1);
    border-color: rgba(255,92,11,0.2);
  }
  .check-item:hover::after { opacity: 1; }

  .check-mark {
    display: grid; place-items: center; flex: 0 0 auto;
    width: 22px; height: 22px; border-radius: 999px;
    background: rgba(255,92,11,0.12);
    color: var(--orange); font-size: 13px;
  }

  .center-head { max-width: 680px; margin: 0 auto 52px; text-align: center; }
  .center-head .eyebrow { justify-content: center; }
  .center-head .eyebrow::before { display: none; }

  .divider {
    width: 74px; height: 2px; margin: 18px auto 0;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, var(--orange), transparent);
  }

  .direction-grid {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px;
  }

  .direction-card, .value-card {
    position: relative; overflow: hidden;
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    background: var(--glass);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 16px 60px rgba(23,30,103,0.1);
    transition:
      transform 0.5s var(--ease-apple),
      box-shadow 0.5s var(--ease-apple),
      border-color 0.4s var(--ease-apple);
  }
  .direction-card { padding: 38px 34px; text-align: left; }

  .direction-card::before, .value-card::before {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.44), transparent 62%);
    pointer-events: none;
  }
  .direction-card::after, .value-card::after {
    content: ""; position: absolute; inset: 0;
    background: radial-gradient(circle at var(--mx, 20%) var(--my, 0%), rgba(255,92,11,0.12), transparent 48%);
    opacity: 0; transition: opacity 0.4s var(--ease-apple);
    pointer-events: none;
  }
  .direction-card:hover, .value-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255,92,11,0.28);
    box-shadow: 0 28px 80px rgba(23,30,103,0.16);
  }
  .direction-card:hover::after, .value-card:hover::after { opacity: 1; }

  .card-kicker {
    position: relative; z-index: 1;
    display: inline-flex; margin-bottom: 18px;
    color: #6366f1;
    font-family: var(--font-body);
    font-size: 11px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
  }

  .card-title {
    position: relative; z-index: 1;
    margin: 0 0 14px; color: var(--orange);
    font-family: var(--font-head);
    font-size: 30px; font-weight: 800; line-height: 1.08;
  }

  .card-copy {
    position: relative; z-index: 1; margin: 0;
    color: rgba(23,30,103,0.76);
    font-family: var(--font-body);
    font-size: 15px; line-height: 1.75;
  }

  .values-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
  .value-card { padding: 30px 26px; }

  .value-number {
    position: relative; z-index: 1; margin-bottom: 18px;
    color: rgba(23,30,103,0.22);
    font-family: var(--font-head);
    font-size: 42px; font-weight: 800; line-height: 1;
  }

  .value-title {
    position: relative; z-index: 1; margin: 0 0 10px;
    color: var(--navy);
    font-family: var(--font-head);
    font-size: 24px; font-weight: 800; line-height: 1.1;
  }

  .value-copy {
    position: relative; z-index: 1; margin: 0;
    color: rgba(23,30,103,0.72);
    font-family: var(--font-body);
    font-size: 14px; line-height: 1.7;
  }

  /* ── Circular Core Values ── */
  .values-circular-layout {
    position: relative;
    width: 100%;
    max-width: 920px;
    margin: 80px auto;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    --wheel-radius: min(40vw, 380px);
    --center-size: 280px;
  }

  .design-center-area {
    position: relative;
    z-index: 10;
    width: var(--center-size);
    height: var(--center-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ring-segment {
    position: absolute;
    inset: 15px;
    border: 16px solid transparent;
    border-radius: 50%;
    transform: rotate(var(--angle-rot));
    mask-image: conic-gradient(from 0deg, black 32deg, transparent 32deg);
    -webkit-mask-image: conic-gradient(from 0deg, black 32deg, transparent 32deg);
    border-top-color: var(--color);
    z-index: 1;
    transition: transform 0.8s var(--ease-apple);
  }

  .center-logo-box {
    width: 200px;
    height: 200px;
    background: white;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 15px;
    box-shadow: 0 10px 40px rgba(23,30,103,0.06);
    z-index: 2;
    position: relative;
  }

  .center-logo-box .swoosh {
    position: absolute;
    width: 100px;
    height: auto;
    bottom: 78px;
    left: 50%;
    transform: translateX(-50%);
  }

  .connectors-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .design-value-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--wheel-radius))) rotate(calc(-1 * var(--angle)));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    width: 110px;
    height: 110px;
    transition: transform 0.6s var(--ease-out-expo);
  }

  .design-orb {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    background: white;
    border: 2px solid var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color);
    flex-shrink: 0;
    transition: all 0.5s var(--ease-apple);
    box-shadow: 0 6px 20px rgba(0,0,0,0.03);
    cursor: pointer;
    z-index: 10;
    position: relative;
  }
  .design-orb:hover {
    transform: scale(1.14) translateY(-4px);
    box-shadow: 0 14px 36px var(--glow, rgba(0,0,0,0.12));
    background: rgba(255,255,255,0.92);
  }

  .design-orb svg { width: 42px; height: 42px; stroke-width: 1.2; }

  .design-content {
    position: absolute;
    width: 250px;
    pointer-events: none;
    z-index: 5;
    transition: transform 0.4s var(--ease-apple);
  }

  .design-value-item.pos-top .design-content { left: 130px; top: 50%; transform: translateY(-50%); text-align: left; }
  .design-value-item.pos-top-right .design-content { left: 115px; top: 50%; transform: translateY(-50%); text-align: left; }
  .design-value-item.pos-right .design-content { top: 125px; left: 50%; transform: translateX(-50%); text-align: center; }
  .design-value-item.pos-bottom-right .design-content { left: 115px; top: 50%; transform: translateY(-50%); text-align: left; }
  .design-value-item.pos-bottom .design-content { right: 130px; top: 50%; transform: translateY(-50%); text-align: right; }
  .design-value-item.pos-bottom-left .design-content { right: 115px; top: 50%; transform: translateY(-50%); text-align: right; }
  .design-value-item.pos-left .design-content { top: 125px; left: 50%; transform: translateX(-50%); text-align: center; }
  .design-value-item.pos-top-left .design-content { right: 115px; top: 50%; transform: translateY(-50%); text-align: right; }

  .design-value-title {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
    color: var(--orange);
    margin-bottom: 4px;
    display: block;
    line-height: 1.2;
  }

  .design-value-desc {
    font-family: var(--font-body);
    font-size: 12px;
    color: var(--navy);
    line-height: 1.4;
    opacity: 0.85;
  }

  @media (max-width: 1000px) {
    .values-circular-layout { display: none; }
    .values-mobile { display: flex; flex-direction: column; padding: 0 24px; max-width: 600px; margin: 40px auto; gap: 16px; }
  }

  @media (min-width: 1001px) {
    .values-mobile { display: none; }
  }

  .value-card-mobile {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 24px;
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .value-icon-mobile {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1.5px solid var(--color);
    color: var(--color);
    flex-shrink: 0;
  }

  .rainbow-circle {
    position: absolute;
    inset: -5px;
    z-index: -1;
    border-radius: 50%;
    background: conic-gradient(
      #4ade80, #a16207, #ef4444, #6366f1, #eab308, #ec4899, #f97316, #a855f7, #4ade80
    );
    opacity: 0.4;
    filter: blur(10px);
    animation: rotateCircle 10s linear infinite;
  }

  @keyframes rotateCircle {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  /* ===== ENHANCED CORE VALUES ANIMATIONS ===== */

/* Entry animation */
.values-circular-layout .design-value-item {
  opacity: 0;
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--wheel-radius))) rotate(calc(-1 * var(--angle))) scale(0.85);
  transition:
    transform 0.9s cubic-bezier(0.16,1,0.3,1),
    opacity 0.9s cubic-bezier(0.16,1,0.3,1);
}

/* When visible */
.about-section.visible .design-value-item {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--wheel-radius))) rotate(calc(-1 * var(--angle))) scale(1);
}

/* Stagger effect */
.values-circular-layout .design-value-item:nth-child(1) { transition-delay: 0.1s; }
.values-circular-layout .design-value-item:nth-child(2) { transition-delay: 0.2s; }
.values-circular-layout .design-value-item:nth-child(3) { transition-delay: 0.3s; }
.values-circular-layout .design-value-item:nth-child(4) { transition-delay: 0.4s; }
.values-circular-layout .design-value-item:nth-child(5) { transition-delay: 0.5s; }
.values-circular-layout .design-value-item:nth-child(6) { transition-delay: 0.6s; }
.values-circular-layout .design-value-item:nth-child(7) { transition-delay: 0.7s; }
.values-circular-layout .design-value-item:nth-child(8) { transition-delay: 0.8s; }

/* Floating motion */
.design-value-item {
  animation: floatOrb 6s ease-in-out infinite;
}

.design-value-item:nth-child(even) {
  animation-delay: 3s;
}

@keyframes floatOrb {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Orb hover upgrade */
.design-orb {
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}

.design-orb:hover {
  transform: scale(1.18) translateY(-6px);
  box-shadow: 0 20px 50px var(--glow);
}

/* Center glow pulse */
.center-logo-box {
  animation: centerPulse 4s ease-in-out infinite;
}

@keyframes centerPulse {
  0%,100% { box-shadow: 0 10px 40px rgba(23,30,103,0.06); }
  50% { box-shadow: 0 20px 60px rgba(255,92,11,0.25); }
}

/* Connector fade animation */
.connectors-svg path {
  opacity: 0;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: drawLine 1.4s ease forwards;
}

.connectors-svg path:nth-child(1) { animation-delay: 0.2s; }
.connectors-svg path:nth-child(2) { animation-delay: 0.3s; }
.connectors-svg path:nth-child(3) { animation-delay: 0.4s; }
.connectors-svg path:nth-child(4) { animation-delay: 0.5s; }
.connectors-svg path:nth-child(5) { animation-delay: 0.6s; }
.connectors-svg path:nth-child(6) { animation-delay: 0.7s; }
.connectors-svg path:nth-child(7) { animation-delay: 0.8s; }
.connectors-svg path:nth-child(8) { animation-delay: 0.9s; }

@keyframes drawLine {
  to {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}

  .cta-section {
    position: relative; min-height: 66vh;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    padding: 110px 24px;
    text-align: center;
    isolation: isolate;
  }

  .cta-section img {
    position: absolute; inset: 0; z-index: -3;
    width: 100%; height: 100%; object-fit: cover;
    transform: scale(1.08);
  }

  .cta-section::before {
    content: ""; position: absolute; inset: 0; z-index: -2;
    background:
      radial-gradient(circle at 50% 35%, rgba(255,92,11,0.2), transparent 32%),
      linear-gradient(180deg, rgba(5,8,22,0.48), rgba(5,8,22,0.76));
  }

  .cta-content { max-width: 760px; color: white; }

  .cta-title {
    margin: 0; color: white;
    font-family: var(--font-head);
    font-size: clamp(3rem, 5.8vw, 5.6rem);
    font-weight: 800; line-height: 0.95;
  }
  .cta-title span { color: var(--orange); }

  .cta-copy {
    max-width: 560px; margin: 22px auto 0;
    color: rgba(255,255,255,0.86);
    font-family: var(--font-body);
    font-size: 17px; line-height: 1.8;
  }

  .cta-button {
    display: inline-flex; align-items: center; justify-content: center;
    min-height: 54px; margin-top: 34px; padding: 0 28px;
    border: 0; border-radius: 999px;
    background: var(--orange); color: white;
    font-family: var(--font-body);
    font-size: 14px; font-weight: 700; letter-spacing: 0.3px;
    text-decoration: none;
    box-shadow: 0 18px 45px rgba(255,92,11,0.32);
    cursor: pointer;
    position: relative; overflow: hidden;
    transition:
      transform 0.35s var(--ease-apple),
      box-shadow 0.35s var(--ease-apple),
      filter 0.35s var(--ease-apple);
  }
  .cta-button::before {
    content: '';
    position: absolute; top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
    transition: left 0.7s var(--ease-out-expo);
  }
  .cta-button:hover::before { left: 130%; }
  .cta-button:hover {
    transform: translateY(-4px);
    filter: brightness(1.04);
    box-shadow: 0 24px 60px rgba(255,92,11,0.4);
  }

  @media (max-width: 900px) {
    .about-hero { min-height: 86vh; padding-top: 120px; }
    .stats-card { grid-template-columns: 1fr; }
    .split-grid, .direction-grid, .values-grid { grid-template-columns: 1fr; }
    .split-grid { gap: 42px; }
    .image-card, .image-card img { min-height: 340px; }
    .about-section { padding: 86px 22px; }
  }

  @media (max-width: 560px) {
    .about-title { font-size: clamp(3.2rem, 18vw, 4.4rem); }
    .about-sub, .cta-copy { font-size: 15px; }
    .check-grid { grid-template-columns: 1fr; }
    .direction-card, .value-card { border-radius: 20px; padding: 28px 22px; }
    .stats-wrap { padding-inline: 18px; }
    .stat-item { padding: 28px 20px; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
    .about-reveal, .about-shell {
      opacity: 1 !important; transform: none !important; filter: none !important;
    }
  }
`;

function StyleInjector() {
  useLayoutEffect(() => {
    const id = "about-page-styles";
    if (document.getElementById(id)) return;

    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = ABOUT_STYLES;
    document.head.appendChild(tag);
  }, []);

  return null;
}

import { 
  ShieldCheck, 
  Award, 
  Users, 
  Scale, 
  Heart, 
  ShieldPlus, 
  ClipboardCheck, 
  Target
} from "lucide-react";

function AboutPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [splashHidden, setSplashHidden] = useState(false);

  const heroImageRef = useParallax(0.06);
  const ctaImageRef = useParallax(0.05);

  const [heroRef, heroVisible] = useReveal(0.05);
  const [statsRef, statsVisible] = useReveal(0.1);
  const [introImageRef, introImageVisible] = useReveal(0.15);
  const [introTextRef, introTextVisible] = useReveal(0.15);
  const [directionRef, directionVisible] = useReveal(0.12);
  const [valuesRef, valuesVisible] = useReveal(0.12);
  const [ctaRef, ctaVisible] = useReveal(0.12);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPageLoaded(true));
    const splashTimer = setTimeout(() => setSplashHidden(true), 650);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(splashTimer);
    };
  }, []);

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const stats = [
    { value: "500+", label: "Happy Clients" },
    { value: "10K+", label: "Trips Completed" },
    { value: "24/7", label: "Customer Support" },
  ];

  const features = [
    "Clean Vehicles",
    "Qualified Drivers",
    "Professional Service",
    "Flexible Options",
  ];

  const directions = [
    {
      kicker: "Mission",
      title: "Company Mission",
      copy: "Our mission is to see all our clients happy and satisfied with excellent services.",
    },
    {
      kicker: "Vision",
      title: "Company Vision",
      copy: "To be the most preferred travel company delivering reliable services.",
    },
  ];

  const coreValues = [
    {
      title: "Responsibility",
      description: "We act with care and diligence, ensuring the safety and satisfaction of every passenger and package.",
      icon: ShieldCheck,
      color: "#4ade80",
      glow: "rgba(74, 222, 128, 0.4)",
      angle: 0,
      posClass: "pos-top"
    },
    {
      title: "Professionalism",
      description: "Our team maintains the highest standards of conduct, appearance, and service excellence at all times.",
      icon: Award,
      color: "#a16207",
      glow: "rgba(161, 98, 7, 0.4)",
      angle: 45,
      posClass: "pos-top-right"
    },
    {
      title: "Team Work",
      description: "Together we achieve more. Collaboration and mutual support drive our success and growth.",
      icon: Users,
      color: "#ef4444",
      glow: "rgba(239, 68, 68, 0.4)",
      angle: 90,
      posClass: "pos-right"
    },
    {
      title: "Integrity",
      description: "Honesty and transparency guide every interaction, building trust with clients and partners.",
      icon: Scale,
      color: "#6366f1",
      glow: "rgba(99, 102, 241, 0.4)",
      angle: 135,
      posClass: "pos-bottom-right"
    },
    {
      title: "Dedication",
      description: "We go above and beyond, committed to excellence in every journey and every service we provide.",
      icon: Heart,
      color: "#eab308",
      glow: "rgba(234, 179, 8, 0.4)",
      angle: 180,
      posClass: "pos-bottom"
    },
    {
      title: "Safety",
      description: "We prioritize the safety and well-being of our passengers and staff by maintaining high standards in every journey we provide.",
      icon: ShieldPlus,
      color: "#ec4899",
      glow: "rgba(236, 72, 153, 0.4)",
      angle: 225,
      posClass: "pos-bottom-left"
    },
    {
      title: "Accountability",
      description: "We take full ownership of our commitments and deliver on every promise made to our clients.",
      icon: ClipboardCheck,
      color: "#f97316",
      glow: "rgba(249, 115, 22, 0.4)",
      angle: 270,
      posClass: "pos-left"
    },
    {
      title: "Customer Focus",
      description: "We put our customers at the heart of everything we do, ensuring their needs are understood, valued, and exceeded.",
      icon: Target,
      color: "#a855f7",
      glow: "rgba(168, 85, 247, 0.4)",
      angle: 315,
      posClass: "pos-top-left"
    }
  ];

  return (
    <>
      <StyleInjector />

      <div className={`about-splash ${splashHidden ? "hidden" : ""}`}>
        <div className="about-splash-ring" />
      </div>

      <Navbar />

      <main className={`about-page about-shell ${pageLoaded ? "loaded" : ""}`}>
        <div className="about-grid-bg" />
        <div className="orb" style={{ width: 500, height: 500, top: "5%", left: "-10%", background: "radial-gradient(circle, rgba(147,210,230,0.35), transparent 70%)" }} />
        <div className="orb" style={{ width: 400, height: 400, top: "30%", right: "-8%", background: "radial-gradient(circle, rgba(99,102,241,0.14), transparent 70%)", animationDelay: "6s" }} />
        <div className="orb" style={{ width: 350, height: 350, bottom: "15%", left: "20%", background: "radial-gradient(circle, rgba(174,221,234,0.28), transparent 70%)", animationDelay: "12s" }} />

        {/* ── HERO ── */}
        <section
  id="about-hero"
  ref={heroRef}
  className={`about-hero about-reveal scale-up delay-0 ${heroVisible ? "visible" : ""}`}
>
          <img
            ref={heroImageRef}
            src={heroImg}
            alt="About RoadTrip hero"
            className="about-hero-img"
          />
          <div className="about-hero-overlay" />
          <div className="about-hero-grain" />

          <div className="about-hero-content">
            <span className="about-pill">About RoadTrip</span>
            <h1 className="about-title">
              Reliable Travel <span>Across Kenya</span>
            </h1>
            <p className="about-sub">
              RoadTrip is a trusted transportation partner dedicated to
              delivering reliable, comfortable, and professional travel
              solutions across Kenya.
            </p>
          </div>

          <div className="about-scroll-cue" />
        </section>

        {/* ── FLOATING STATS ── */}
        <div
          ref={statsRef}
          className={`stats-wrap about-reveal from-bottom delay-1 ${statsVisible ? "visible" : ""}`}
        >
          <div className="stats-card">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item" onMouseMove={handleMouseMove}>
                <div className="stat-num">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHO WE ARE ── */}
        <section className="about-section">
          <div className="about-container split-grid">
            <div
              ref={introImageRef}
              className={`image-card about-reveal from-left delay-0 ${introImageVisible ? "visible" : ""}`}
            >
              <img src={aboutImg} alt="Who we are" />
              <div className="image-card-overlay">
                <p className="image-card-overlay-text">Your trusted travel partner</p>
              </div>
            </div>

            <div
              ref={introTextRef}
              className={`about-reveal from-right delay-1 ${introTextVisible ? "visible" : ""}`}
            >
              <span className="eyebrow">Who We Are</span>
              <h2 className="section-title">Your Trusted Travel Partner</h2>
              <p className="section-copy">
                We are a corporate travel company and we offer quality and
                professional transport services, ranging from long term car hire
                to short term hire, chauffeur driven hire, as well as courier
                services. Our vehicles are clean and well maintained and all our
                drivers are fully qualified.
              </p>

              <div className="check-grid">
                {features.map((item, index) => (
                  <div key={index} className="check-item" onMouseMove={handleMouseMove}>
                    <span className="check-mark">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DIRECTION ── */}
        <section
          ref={directionRef}
          className={`about-section about-reveal from-bottom delay-0 ${directionVisible ? "visible" : ""}`}
        >
          <div className="about-container">
            <div className="center-head">
              <span className="eyebrow">Our Direction</span>
              <h2 className="section-title">Driven by Purpose</h2>
              <p className="section-copy">
                Guided by clear values and a service-first mindset, we strive
                to deliver excellence in every journey.
              </p>
              <div className="divider" />
            </div>

            <div className="direction-grid">
              {directions.map((item, index) => (
                <div
                  key={index}
                  className={`direction-card about-reveal from-bottom delay-${index + 1} ${directionVisible ? "visible" : ""}`}
                  onMouseMove={handleMouseMove}
                >
                  <span className="card-kicker">{item.kicker}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-copy">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section
          ref={valuesRef}
          className={`about-section ${valuesVisible ? "visible" : ""}`}
        >
          <div className="about-container">
            <div className="center-head" style={{ marginBottom: '60px' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '32px', color: '#a855f7', marginBottom: '8px', fontWeight: 700 }}>What Drives Us</h2>
              <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '56px', fontWeight: 800, color: 'var(--orange)', margin: '0 0 20px 0', lineHeight: 1 }}>Our Core Values</h1>
              <p style={{ fontFamily: 'var(--font-head)', fontSize: '18px', fontWeight: 700, color: 'var(--navy)', maxWidth: '600px', margin: '0 auto' }}>
                The principles that guide our business and define our commitment to excellence
              </p>
            </div>

            {/* Desktop Circular View */}
            <div className="values-circular-layout">
              <svg className="connectors-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {coreValues.map((v, i) => {
                    const angleRad = ((v.angle - 90) * Math.PI) / 180;
                    const innerR = 150;
                    const outerR = 340;
                    const x1 = 500 + innerR * Math.cos(angleRad);
                    const y1 = 500 + innerR * Math.sin(angleRad);
                    const x2 = 500 + outerR * Math.cos(angleRad);
                    const y2 = 500 + outerR * Math.sin(angleRad);
                    return (
                      <linearGradient key={`grad-${i}`} id={`grad-${i}`} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
                        <stop offset="0%" stopColor={v.color} stopOpacity="0.05" />
                        <stop offset="100%" stopColor={v.color} stopOpacity="0.8" />
                      </linearGradient>
                    );
                  })}
                </defs>
                {coreValues.map((v, i) => {
                  const angleRad = ((v.angle - 90) * Math.PI) / 180;
                  const innerR = 150;
                  const outerR = 340;
                  const x1 = 500 + innerR * Math.cos(angleRad);
                  const y1 = 500 + innerR * Math.sin(angleRad);
                  const x2 = 500 + outerR * Math.cos(angleRad);
                  const y2 = 500 + outerR * Math.sin(angleRad);
                  return (
                    <path
                      key={`path-${i}`}
                      d={`M ${x1} ${y1} L ${x2} ${y2}`}
                      stroke={`url(#grad-${i})`}
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>

              <div className="design-center-area">
                {coreValues.map((v, i) => (
                  <div
                    key={`seg-${i}`}
                    className="ring-segment"
                    style={{ "--angle-rot": `${v.angle - 16}deg`, "--color": v.color }}
                  />
                ))}

                <div className="center-logo-box">
                  <div style={{ position: 'relative', display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      fontFamily: "var(--font-head)",
                      fontSize: 40,
                      fontWeight: 800,
                      color: "#171E67",
                      lineHeight: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      zIndex: 2,
                    }}>
                      <span style={{ color: "#FF5C0B" }}>Road</span>
                      <span style={{ color: "#171E67" }}>Trip</span>
                    </div>
                    <svg className="swoosh" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                      <path d="M10 12 C 35 2, 65 2, 90 12" stroke="#FF5C0B" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
                    </svg>
                    <p style={{ fontSize: 9, fontWeight: 700, color: "#171E67", opacity: 0.8, letterSpacing: 1, marginTop: 4, zIndex: 2, textTransform: "uppercase" }}>
                      Travel & Courier Services Ltd.
                    </p>
                  </div>
                </div>
              </div>

              {coreValues.map((v) => (
                <div
                  key={v.title}
                  className={`design-value-item ${v.posClass}`}
                  style={{ "--angle": `${v.angle}deg`, "--color": v.color, "--glow": v.glow }}
                >
                  <div className="design-orb">
                    <v.icon />
                  </div>
                  <div className="design-content">
                    <span className="design-value-title">{v.title}</span>
                    <p className="design-value-desc">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile List View */}
            <div className="values-mobile">
              {coreValues.map((v) => (
                <div key={v.title} className="value-card-mobile" style={{ "--color": v.color }} onMouseMove={handleMouseMove}>
                  <div className="value-icon-mobile">
                    <v.icon size={28} />
                  </div>
                  <div>
                    <h3 className="card-title" style={{ fontSize: 20, marginBottom: 4, color: v.color }}>{v.title}</h3>
                    <p className="card-copy" style={{ fontSize: 13 }}>{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          ref={ctaRef}
          className={`cta-section about-reveal scale-up delay-0 ${ctaVisible ? "visible" : ""}`}
        >
          <img ref={ctaImageRef} src={nairobiImg} alt="Nairobi skyline" />
          <div className="cta-content">
            <span className="about-pill">Start Your Journey</span>
            <h2 className="cta-title">
              Ready to Experience <span>Excellence?</span>
            </h2>
            <p className="cta-copy">
              Join hundreds of satisfied clients who trust RoadTrip for
              dependable, comfortable, and professional transport solutions.
            </p>
            <a href="/services" className="cta-button">
              Explore Our Services
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

export default AboutPage;