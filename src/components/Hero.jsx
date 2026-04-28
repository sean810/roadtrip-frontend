import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroVideo from "../assets/videos/hero-sequence.mp4";

/* ─────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────── */
const HERO_STYLES = `
  @keyframes hero-splash-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes hero-splash-pulse {
    0%, 100% { opacity: 0.85; transform: scale(1); }
    50%      { opacity: 1;    transform: scale(1.06); }
  }
  @keyframes hero-grain {
    0%, 100% { transform: translate(0,0); }
    25%      { transform: translate(-2%, 1%); }
    50%      { transform: translate(1%, -2%); }
    75%      { transform: translate(-1%, -1%); }
  }
  @keyframes hero-light-sweep {
    0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
    40%  { opacity: 0.55; }
    100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
  }
  @keyframes hero-float-slow {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-18px) scale(1.04); }
  }
  @keyframes hero-scroll-bounce {
    0%, 100% { transform: translateY(0); opacity: 0.9; }
    50%      { transform: translateY(8px); opacity: 0.4; }
  }

  .hero-splash {
    position: absolute; inset: 0; z-index: 60;
    display: flex; align-items: center; justify-content: center;
    background: radial-gradient(ellipse at center, #0c1230 0%, #050816 70%);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                visibility 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .hero-splash.is-hidden { opacity: 0; visibility: hidden; }
  .hero-splash-ring {
    width: 64px; height: 64px; border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.15);
    border-top-color: #FF5C0B;
    animation: hero-splash-spin 0.9s linear infinite,
               hero-splash-pulse 1.6s ease-in-out infinite;
  }

  .hero-shell {
    opacity: 0;
    filter: blur(8px);
    transform: scale(1.03);
    transition: opacity 1.1s cubic-bezier(0.16,1,0.3,1),
                filter   1.1s cubic-bezier(0.16,1,0.3,1),
                transform 1.4s cubic-bezier(0.16,1,0.3,1);
  }
  .hero-shell.is-ready {
    opacity: 1; filter: blur(0); transform: scale(1);
  }

  .hero-grain {
    position: absolute; inset: -20%;
    pointer-events: none; z-index: 5; opacity: 0.06;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>");
    mix-blend-mode: overlay;
    animation: hero-grain 8s steps(6) infinite;
  }

  .hero-shine {
    position: absolute; top: 0; left: 0; height: 100%; width: 35%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    pointer-events: none;
    animation: hero-light-sweep 6s ease-in-out 1.8s infinite;
  }

  .hero-orb {
    position: absolute; border-radius: 50%;
    pointer-events: none; filter: blur(90px);
    animation: hero-float-slow 10s ease-in-out infinite;
  }

  .hero-btn-primary { position: relative; overflow: hidden; }
  .hero-btn-primary::after {
    content: ''; position: absolute; top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent);
    transition: left 0.7s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .hero-btn-primary:hover::after { left: 130%; }

  .hero-btn-ghost { position: relative; overflow: hidden; }
  .hero-btn-ghost::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.7));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
    z-index: -1;
  }
  .hero-btn-ghost:hover::before { transform: scaleX(1); }

  .hero-scroll-cue {
    position: absolute; bottom: 36px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: rgba(255,255,255,0.7);
    font-family: 'Inter', sans-serif; font-size: 11px;
    letter-spacing: 2.5px; text-transform: uppercase;
    z-index: 10;
  }
  .hero-scroll-cue .mouse {
    width: 22px; height: 36px; border: 1.5px solid rgba(255,255,255,0.5);
    border-radius: 12px; position: relative;
  }
  .hero-scroll-cue .mouse::after {
    content: ''; position: absolute; top: 6px; left: 50%;
    width: 3px; height: 8px; border-radius: 2px;
    background: #FF5C0B; transform: translateX(-50%);
    animation: hero-scroll-bounce 1.8s ease-in-out infinite;
  }

  /* Heading: keep words on the same baseline, wrap naturally */
  .hero-heading {
    font-family: 'Abhaya Libre', serif;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.05;
    letter-spacing: -0.01em;
    font-size: clamp(2.5rem, 6vw, 5rem);
    position: relative;
    display: inline;
  }
  .hero-heading .accent {
    color: #FF5C0B;
    display: inline;
    margin-left: 0.25em;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-shell { opacity: 1 !important; filter: none !important; transform: none !important; }
    .hero-shine, .hero-grain, .hero-orb, .hero-scroll-cue .mouse::after { animation: none !important; }
  }
`;

function HeroStyleInjector() {
  useEffect(() => {
    if (document.getElementById("hero-styles")) return;
    const tag = document.createElement("style");
    tag.id = "hero-styles";
    tag.textContent = HERO_STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
  return null;
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [splashHidden, setSplashHidden] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 350);
    const t2 = setTimeout(() => setSplashHidden(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setVideoLoaded(true);
    video.addEventListener("loadeddata", handleLoaded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <HeroStyleInjector />

      {/* Splash loader */}
      <div className={`hero-splash ${splashHidden ? "is-hidden" : ""}`}>
        <div className="hero-splash-ring" />
      </div>

      <div className={`hero-shell relative w-full h-full ${loaded ? "is-ready" : ""}`}>
        {/* Background Video */}
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55 z-[1]" />
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 75%)",
          }}
        />
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Floating orbs */}
        <div
          className="hero-orb"
          style={{
            top: "12%", left: "8%", width: 320, height: 320,
            background: "radial-gradient(circle, rgba(255,92,11,0.35), transparent 70%)",
          }}
        />
        <div
          className="hero-orb"
          style={{
            bottom: "15%", right: "10%", width: 380, height: 380,
            background: "radial-gradient(circle, rgba(23,30,103,0.45), transparent 70%)",
            animationDelay: "2s",
          }}
        />

        {/* Film grain */}
        <div className="hero-grain" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="relative max-w-5xl text-center">
            {/* Spotlight */}
            <div
              className="absolute -inset-x-20 -inset-y-10 -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.08), transparent 70%)",
              }}
            />

            {/* Heading — single inline flow so words stay on one baseline */}
            <h1 className="hero-heading">
              Where Every Trip<span className="accent">Fits You</span>
              <span className="hero-shine" />
            </h1>

            {/* Paragraph */}
            <p className="mt-6 text-lg md:text-xl text-white/85 font-inter max-w-2xl mx-auto">
              Quality rides, professional drivers, seamless travel across Nairobi and beyond.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/booking")}
                className="
                  hero-btn-primary
                  px-8 py-4 rounded-lg font-abhaya font-extrabold text-white
                  bg-[#FF5C0B] shadow-lg shadow-[#FF5C0B]/30
                  transition-all duration-500
                  hover:-translate-y-1 hover:shadow-[#FF5C0B]/50
                  active:scale-95
                "
              >
                Book Now
              </button>

              <button
                onClick={() => navigate("/services")}
                className="
                  hero-btn-ghost
                  px-8 py-4 rounded-lg font-abhaya font-extrabold text-white
                  border border-white/40 backdrop-blur-sm bg-white/5
                  transition-all duration-500
                  hover:-translate-y-1 hover:text-[#171E67]
                  active:scale-95
                "
              >
                View Services
              </button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue">
          <span>Scroll</span>
          <div className="mouse" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
