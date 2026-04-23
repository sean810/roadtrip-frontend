import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Car, User, Plane, Package, Briefcase, Map } from "lucide-react";

import chauffeurImg from "../assets/images/Chauffeur1.jpg";
import selfDriveImg from "../assets/images/Self-drive1.jpg";
import airportImg from "../assets/images/airport.jpg";
import courierImg from "../assets/images/courier.jpg";
import leaseImg from "../assets/images/Lease1.jpg";
import safariImg from "../assets/images/safari.jpg";

/* ─────────────────────────────────────────
   HOOK: IntersectionObserver reveal
───────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

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
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* ─────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --orange: #FF5C0B;
    --navy:   #171E67;
    --cream:  #f9f6f1;
    --glass:  rgba(255,255,255,0.65);
    --glass-border: rgba(255,255,255,0.45);
    --ease-apple: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --font-head: 'Abhaya Libre', serif;
    --font-body: 'Inter', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body { font-family: var(--font-body); }

  /* ── Floating orb background ── */
  .orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
    filter: blur(80px); opacity: 0.12; animation: orbDrift 18s ease-in-out infinite alternate;
  }
  @keyframes orbDrift {
    0%   { transform: translate(0, 0) scale(1); }
    50%  { transform: translate(30px, -40px) scale(1.08); }
    100% { transform: translate(-20px, 20px) scale(0.95); }
  }

  /* ── Scroll reveal base ── */
  .reveal { opacity: 0; transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),  transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .reveal.from-bottom { transform: translateY(52px); }
  .reveal.from-left   { transform: translateX(-52px); }
  .reveal.from-right  { transform: translateX(52px); }
  .reveal.scale-up    { transform: scale(0.92); }
  .reveal.visible     { opacity: 1 !important; transform: none !important; }

  /* ── Stagger delays ── */
  .delay-0  { transition-delay: 0ms; }
  .delay-1  { transition-delay: 100ms; }
  .delay-2  { transition-delay: 200ms; }
  .delay-3  { transition-delay: 300ms; }
  .delay-4  { transition-delay: 400ms; }
  .delay-5  { transition-delay: 500ms; }

  /* ── Overview card ── */
  .overview-card {
    background: var(--glass);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 28px 24px;
    transition: transform 0.4s var(--ease-apple), box-shadow 0.4s var(--ease-apple), border-color 0.4s;
    box-shadow: 0 8px 32px rgba(0,0,0,0.07);
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .overview-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%);
    pointer-events: none;
  }
  .overview-card:hover {
    transform: translateY(-8px) scale(1.015);
    box-shadow: 0 28px 60px rgba(23,30,103,0.14), 0 0 0 1px rgba(255,92,11,0.12);
    border-color: rgba(255,92,11,0.2);
  }
  .card-icon {
    width: 58px; height: 58px; border-radius: 16px;
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    display: flex; align-items: center; justify-content: center;
    color: white; margin-bottom: 20px;
    box-shadow: 0 8px 20px rgba(255,92,11,0.35);
    transition: transform 0.3s var(--ease-apple), box-shadow 0.3s;
  }
  .overview-card:hover .card-icon {
    transform: scale(1.1) rotate(-3deg);
    box-shadow: 0 12px 28px rgba(255,92,11,0.45);
  }

  /* ── Service section ── */
  .service-section {
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px;
    align-items: center; padding: 72px 0;
    border-bottom: 1px solid rgba(23,30,103,0.06);
  }
  .service-section.img-right { grid-template-columns: 0.9fr 1.1fr; }
  @media (max-width: 900px) {
    .service-section, .service-section.img-right { grid-template-columns: 1fr; gap: 40px; }
    .service-section .img-col { order: -1 !important; }
  }

  /* ── Parallax image frame ── */
  .img-frame {
    position: relative; border-radius: 28px; overflow: hidden;
    height: 560px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.22);
    transition: box-shadow 0.5s var(--ease-apple);
  }
  .img-frame:hover { box-shadow: 0 56px 120px rgba(0,0,0,0.28); }
  .img-frame img {
    width: 100%; height: 118%; object-fit: cover;
    display: block; will-change: transform;
    transition: transform 0.1s linear;
  }
  .img-glow {
    position: absolute; inset: -2px; border-radius: 26px;
    transition: opacity 0.4s;
    opacity: 0; z-index: -1;
  }
  .img-frame:hover + .img-glow, .img-group:hover .img-glow { opacity: 1; }
  .img-badge {
    position: absolute; top: 16px; right: 16px;
    background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
    border-radius: 10px; padding: 8px 10px;
    font-size: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    transition: transform 0.3s var(--ease-apple);
  }
  .img-frame:hover .img-badge { transform: scale(1.12) rotate(5deg); }

  /* ── Service content ── */
  .service-label { font-family: var(--font-body); font-size: 12px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: #6366f1; }
  .service-title { font-family: var(--font-head); font-size: clamp(2.4rem, 3.8vw, 3.4rem); font-weight: 800; color: var(--orange); line-height: 1.1; margin: 10px 0 18px; }
  .service-desc  { font-family: var(--font-body); color: var(--navy); line-height: 1.8; opacity: 0.85; font-size: 16px; margin-bottom: 26px; }

  .why-box {
    background: var(--glass); backdrop-filter: blur(14px);
    border: 1px solid var(--glass-border); border-radius: 16px;
    padding: 22px 24px; margin-bottom: 26px;
  }
  .why-box h4 { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: var(--navy); margin-bottom: 10px; }
  .why-box p  { font-family: var(--font-body); font-size: 15px; color: rgba(23,30,103,0.78); line-height: 1.75; }

  .expect-title { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: var(--orange); margin-bottom: 14px; }
  .expect-list  { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 34px; }
  .expect-list li { display: flex; align-items: flex-start; gap: 10px; font-family: var(--font-body); font-size: 15.5px; color: var(--navy); line-height: 1.6; }
  .check { color: #22c55e; font-size: 17px; flex-shrink: 0; margin-top: 2px; }

  .book-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 50px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #FF5C0B 0%, #f97316 100%);
    color: white; font-family: var(--font-body); font-weight: 600;
    font-size: 14px; letter-spacing: 0.3px;
    box-shadow: 0 8px 24px rgba(255,92,11,0.38);
    transition: transform 0.3s var(--ease-apple), box-shadow 0.3s, background 0.3s;
  }
  .book-btn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 16px 40px rgba(255,92,11,0.45);
    background: linear-gradient(135deg, #e84e00 0%, #FF5C0B 100%);
  }
  .book-btn .arrow { transition: transform 0.3s var(--ease-apple); }
  .book-btn:hover .arrow { transform: translateX(4px); }

  /* ── Hero ── */
  .hero-pill {
    display: inline-block; padding: 7px 20px; margin-bottom: 24px;
    border-radius: 50px;
    background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.2);
    color: #4f46e5; font-family: var(--font-body); font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  }
  .hero-title {
    font-family: var(--font-head);
    font-size: clamp(4rem, 8vw, 7rem);
    font-weight: 800; color: var(--orange); line-height: 1;
    background: linear-gradient(135deg, #FF5C0B 30%, #f97316 80%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-sub { font-family: var(--font-body); margin-top: 22px; font-size: 18px; color: var(--navy); opacity: 0.8; max-width: 560px; margin-inline: auto; line-height: 1.75; }
  .section-title {
    font-family: var(--font-head);
    font-size: clamp(2.4rem, 4.5vw, 3.6rem); font-weight: 800; color: var(--orange);
    text-align: center; margin-bottom: 80px;
  }
  .divider {
    width: 48px; height: 3px; border-radius: 2px;
    background: linear-gradient(90deg, #FF5C0B, #f97316);
    margin: 16px auto 0;
  }

  /* ── Subtle animated grid bg ── */
  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(23,30,103,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23,30,103,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridShift 30s linear infinite;
  }
  @keyframes gridShift {
    0%   { background-position: 0 0; }
    100% { background-position: 60px 60px; }
  }

  /* ── Overview card sizing ── */
  .overview-card { padding: 38px 32px; }
  .section-num {
    font-family: var(--font-body);
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(23,30,103,0.35);
    margin-bottom: 4px;
  }
  .card-title { font-family: var(--font-head); font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 10px; line-height: 1.2; }
  .card-desc  { font-family: var(--font-body); font-size: 15px; color: rgba(23,30,103,0.75); line-height: 1.7; margin-bottom: 16px; }
  .card-link  {
    display: inline-flex; align-items: center; gap: 5px;
    font-family: var(--font-body); font-size: 14px; font-weight: 600; color: var(--orange);
    text-decoration: none; transition: gap 0.3s, opacity 0.3s;
  }
  .card-link:hover { gap: 9px; }
  .card-link .arrow { transition: transform 0.3s var(--ease-apple); }
  .card-link:hover .arrow { transform: translateX(3px); }

  /* ── Popular badge on overview card ── */
  .popular-badge {
    position: absolute; top: 16px; right: 16px;
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    color: white; font-family: var(--font-body); font-size: 10px; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 50px;
    box-shadow: 0 4px 12px rgba(255,92,11,0.4);
    animation: badgePulse 2.5s ease-in-out infinite;
  }
  @keyframes badgePulse {
    0%, 100% { box-shadow: 0 4px 12px rgba(255,92,11,0.4); }
    50%       { box-shadow: 0 4px 22px rgba(255,92,11,0.7); }
  }

  /* ── Image hover overlay ── */
  .img-overlay {
    position: absolute; inset: 0; border-radius: 28px;
    background: linear-gradient(to top, rgba(23,30,103,0.82) 0%, rgba(23,30,103,0.1) 55%, transparent 100%);
    display: flex; align-items: flex-end; padding: 28px;
    opacity: 0; transition: opacity 0.4s var(--ease-apple);
    pointer-events: none;
  }
  .img-frame:hover .img-overlay { opacity: 1; }
  .img-overlay-text {
    font-family: var(--font-head); font-size: 22px; font-weight: 800;
    color: white; line-height: 1.2;
    transform: translateY(10px); transition: transform 0.4s var(--ease-apple);
  }
  .img-frame:hover .img-overlay-text { transform: translateY(0); }

  /* ── Modal backdrop ── */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(10,12,40,0.6); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: fadeIn 0.25s var(--ease-apple);
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* ── Modal box ── */
  .modal-box {
    background: linear-gradient(145deg, #f0f8fc, #e4f1f8);
    border: 1px solid rgba(255,255,255,0.7);
    border-radius: 28px; padding: 40px;
    width: 100%; max-width: 480px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.25);
    position: relative;
    animation: slideUp 0.35s var(--ease-apple);
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

  .modal-close {
    position: absolute; top: 16px; right: 16px;
    background: rgba(23,30,103,0.08); border: none; border-radius: 50%;
    width: 36px; height: 36px; cursor: pointer; font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    color: var(--navy); transition: background 0.2s;
  }
  .modal-close:hover { background: rgba(255,92,11,0.12); color: var(--orange); }

  .modal-service-label { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #6366f1; margin-bottom: 6px; }
  .modal-title { font-family: var(--font-head); font-size: 26px; font-weight: 800; color: var(--orange); margin-bottom: 24px; line-height: 1.1; }

  .modal-field { margin-bottom: 16px; }
  .modal-label { font-family: var(--font-body); font-size: 12px; font-weight: 600; color: var(--navy); opacity: 0.7; letter-spacing: 0.5px; margin-bottom: 6px; display: block; text-transform: uppercase; }
  .modal-input, .modal-select, .modal-textarea {
    width: 100%; padding: 12px 16px; border-radius: 12px;
    border: 1.5px solid rgba(23,30,103,0.15);
    background: rgba(255,255,255,0.8); backdrop-filter: blur(8px);
    font-family: var(--font-body); font-size: 14px; color: var(--navy);
    outline: none; transition: border-color 0.25s, box-shadow 0.25s;
  }
  .modal-input:focus, .modal-select:focus, .modal-textarea:focus {
    border-color: var(--orange);
    box-shadow: 0 0 0 3px rgba(255,92,11,0.12);
  }
  .modal-textarea { resize: none; height: 80px; }
  .modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .modal-submit {
    width: 100%; margin-top: 8px;
    padding: 14px; border-radius: 50px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    color: white; font-family: var(--font-body); font-weight: 600; font-size: 15px;
    box-shadow: 0 8px 24px rgba(255,92,11,0.38);
    transition: transform 0.3s var(--ease-apple), box-shadow 0.3s;
  }
  .modal-submit:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,92,11,0.45); }
`;

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById("sp-styles")) return;
    const tag = document.createElement("style");
    tag.id = "sp-styles";
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
  return null;
}

/* ─────────────────────────────────────────
   BOOKING MODAL
───────────────────────────────────────── */
function BookingModal({ service, onClose }) {
  if (!service) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-service-label">Book Now</p>
        <h2 className="modal-title">{service.title}</h2>

        <div className="modal-field">
          <label className="modal-label">Full Name</label>
          <input className="modal-input" type="text" placeholder="e.g. John Kamau" />
        </div>

        <div className="modal-field">
          <label className="modal-label">Phone Number</label>
          <input className="modal-input" type="tel" placeholder="+254 700 000 000" />
        </div>

        <div className="modal-row">
          <div className="modal-field">
            <label className="modal-label">Date</label>
            <input className="modal-input" type="date" />
          </div>
          <div className="modal-field">
            <label className="modal-label">Time</label>
            <input className="modal-input" type="time" />
          </div>
        </div>

        <div className="modal-field">
          <label className="modal-label">Additional Notes</label>
          <textarea className="modal-textarea modal-input" placeholder="Pick-up location, special requests…" />
        </div>

        <button className="modal-submit">Confirm Booking →</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   OVERVIEW CARD
───────────────────────────────────────── */
function OverviewCard({ icon: Icon, title, description, href, delay, popular }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`overview-card reveal from-bottom delay-${delay} ${visible ? "visible" : ""}`}
    >
      {popular && <span className="popular-badge">⭐ Most Booked</span>}
      <div className="card-icon"><Icon size={26} /></div>
      <p className="card-title">{title}</p>
      <p className="card-desc">{description}</p>
      <a href={href} className="card-link">
        Learn more <span className="arrow">→</span>
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────
   PARALLAX IMAGE
───────────────────────────────────────── */
function ParallaxImg({ src, alt, glow, badge, tagline }) {
  const imgRef = useParallax(0.07);
  return (
    <div style={{ position: "relative" }}>
      <div className="img-frame">
        <img ref={imgRef} src={src} alt={alt} />
        <div className="img-badge">{badge}</div>
        <div className="img-overlay">
          <p className="img-overlay-text">{tagline}</p>
        </div>
      </div>
      <div
        className="img-glow"
        style={{ background: glow, filter: "blur(24px)", opacity: 0.4, position: "absolute", inset: "-8px", zIndex: -1, borderRadius: "32px" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   SERVICE SECTION
───────────────────────────────────────── */
function ServiceSection({ id, num, title, desc, whyText, bullets, img, alt, glow, badge, imgRight, tagline }) {
  const [contentRef, contentVisible] = useReveal(0.1);
  const [imgRef, imgVisible] = useReveal(0.1);
  const [modalOpen, setModalOpen] = useState(false);

  const content = (
    <div
      ref={contentRef}
      className={`reveal ${imgRight ? "from-left" : "from-right"} ${contentVisible ? "visible" : ""}`}
    >
      <p className="service-label">Service {num}</p>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{desc}</p>

      <div className="why-box">
        <h4>Why We Excel</h4>
        <p>{whyText}</p>
      </div>

      <p className="expect-title">What to Expect</p>
      <ul className="expect-list">
        {bullets.map((b, i) => (
          <li key={i}><span className="check">✔</span>{b}</li>
        ))}
      </ul>

      <button className="book-btn" onClick={() => setModalOpen(true)}>
        Book This Service <span className="arrow">→</span>
      </button>
    </div>
  );

  const image = (
    <div
      ref={imgRef}
      className={`reveal ${imgRight ? "from-right" : "from-left"} ${imgVisible ? "visible" : ""}`}
    >
      <ParallaxImg src={img} alt={alt} glow={glow} badge={badge} tagline={tagline} />
    </div>
  );

  return (
    <>
      <div className="service-section" id={id}>
        {imgRight ? <>{content}{image}</> : <>{image}{content}</>}
      </div>
      {modalOpen && <BookingModal service={{ title }} onClose={() => setModalOpen(false)} />}
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
function ServicesPage() {
  const [heroRef, heroVisible] = useReveal(0.05);

  const overview = [
    { icon: User,     title: "Chauffeur Service",          description: "Experience luxury and professionalism with our premium chauffeur service.",       href: "#service-chauffeur", popular: true  },
    { icon: Car,      title: "Self-Drive",                 description: "Freedom at your fingertips with our extensive fleet.",                            href: "#service-selfdrive"               },
    { icon: Plane,    title: "Airport to Hotel Transfers", description: "Reliable and stress-free airport transport.",                                     href: "#service-airport",   popular: true  },
    { icon: Package,  title: "Package Delivery Services",  description: "Fast, secure delivery across the city.",                                          href: "#service-courier"                 },
    { icon: Briefcase,title: "Lease Hire Service",         description: "Flexible long-term vehicle solutions.",                                           href: "#service-lease"                   },
    { icon: Map,      title: "Safari Tour Services",       description: "Explore Kenya with guided experiences.",                                          href: "#service-safari"                  },
  ];

  const services = [
    {
      id: "service-chauffeur", num: "01", imgRight: false,
      title: "Chauffeur Service",
      desc: "Experience luxury and professionalism with our premium chauffeur service.",
      whyText: "We pride ourselves on maintaining a fleet of pristine luxury vehicles and employing only the most experienced, professionally certified drivers who understand the value of discretion and excellence.",
      bullets: ["Professional and courteous drivers", "24/7 customer support and booking assistance", "Easy pickups, smooth drop-offs"],
      img: chauffeurImg, alt: "Chauffeur Service", badge: "🚘",
      glow: "linear-gradient(135deg, #a855f7, #6366f1, #f97316)",
      tagline: "Arrive in style, every time.",
    },
    {
      id: "service-selfdrive", num: "02", imgRight: true,
      title: "Self-Drive",
      desc: "Freedom at your fingertips. Choose from our extensive range of well-maintained vehicles and explore at your own pace. Perfect for those who prefer the independence of driving themselves.",
      whyText: "Our self-drive service stands out with comprehensive insurance coverage, 24/7 roadside assistance, and a diverse fleet ranging from economy to luxury vehicles, all regularly serviced and sanitized.",
      bullets: ["Flexible rental time that works around you", "Reliable cover for your journey", "Convenient delivery and collection"],
      img: selfDriveImg, alt: "Self Drive", badge: "🚗",
      glow: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      tagline: "Your road, your rules.",
    },
    {
      id: "service-airport", num: "03", imgRight: false,
      title: "Airport to Hotel Transfers",
      desc: "Start or end your journey stress-free with our reliable airport transfer service. We monitor flight schedules and ensure timely pickups, making your transition smooth and comfortable.",
      whyText: "With years of experience in airport logistics, we excel at navigating traffic patterns, terminal locations, and timing. Our drivers are familiar with all major hotels and can accommodate last-minute changes.",
      bullets: ["Direct rides", "Quick and easy pickup once you land", "Assistance with luggage handling"],
      img: airportImg, alt: "Airport Transfers", badge: "✈️",
      glow: "linear-gradient(135deg, #ec4899, #a855f7, #6366f1)",
      tagline: "Land. Relax. We've got you.",
    },
    {
      id: "service-courier", num: "04", imgRight: true,
      title: "Package Delivery Services",
      desc: "Fast, secure, and reliable package delivery across the city. Whether it's documents, parcels, or urgent deliveries, we handle your shipments with care and efficiency.",
      whyText: "Fast, secure, and straightforward — that's how we handle deliveries. Expect confirmed drop-offs and same-day options when you need things delivered quickly.",
      bullets: ["Careful handling from pickup to drop-off", "Same-day and scheduled delivery options", "Dedicated customer service team"],
      img: courierImg, alt: "Courier Services", badge: "📦",
      glow: "linear-gradient(135deg, #f97316, #ec4899, #eab308)",
      tagline: "Fast, safe, delivered.",
    },
    {
      id: "service-lease", num: "05", imgRight: false,
      title: "Lease Hire Service",
      desc: "Flexible long-term vehicle solutions for businesses and individuals. Our lease hire service offers cost-effective transportation without the commitment and overhead of vehicle ownership.",
      whyText: "Enjoy a leasing experience designed around flexibility and ease. From managed maintenance to dedicated support, everything is set up to grow with your needs — with exclusive benefits for corporate clients.",
      bullets: ["Leasing plans designed to fit your business needs", "Simple, hassle-free process from start to finish", "Help is always there when you need it"],
      img: leaseImg, alt: "Lease Services", badge: "💼",
      glow: "linear-gradient(135deg, #22c55e, #3b82f6, #10b981)",
      tagline: "Flexible vehicles for growing businesses.",
    },
    {
      id: "service-safari", num: "06", imgRight: true,
      title: "Safari Tour Services",
      desc: "Embark on unforgettable adventures with our specialized safari tour service. Equipped with rugged 4x4 vehicles and experienced guides, we take you to breathtaking destinations safely and comfortably.",
      whyText: "Our safari expertise combines adventure with safety. We use specially modified vehicles for wildlife viewing and maintain strong relationships with parks and reserves.",
      bullets: ["Trips planned around what you want to see", "Great views all around for photos", "Comfortable, ready-for-anything safari vehicles"],
      img: safariImg, alt: "Safari Tours", badge: "🦒",
      glow: "linear-gradient(135deg, #10b981, #22c55e, #14b8a6)",
      tagline: "Kenya's wild, waiting for you.",
    },
  ];

  return (
    <>
      <StyleInjector />

      {/* Fixed ambient background */}
      <div className="grid-bg" />
      <div className="orb" style={{ width: 500, height: 500, top: "5%", left: "-10%", background: "radial-gradient(circle, rgba(147,210,230,0.35), transparent 70%)" }} />
      <div className="orb" style={{ width: 400, height: 400, top: "30%", right: "-8%", background: "radial-gradient(circle, rgba(99,102,241,0.14), transparent 70%)", animationDelay: "6s" }} />
      <div className="orb" style={{ width: 350, height: 350, bottom: "15%", left: "20%", background: "radial-gradient(circle, rgba(174,221,234,0.28), transparent 70%)", animationDelay: "12s" }} />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", background: "linear-gradient(to bottom, #eaf6fb 0%, #dff1f7 50%, #cfe8ef 100%)" }}>
        <Navbar />

        {/* ── HERO ── */}
        <div style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center", padding: "140px 24px 80px" }}>
          <div
            ref={heroRef}
            className={`reveal from-bottom ${heroVisible ? "visible" : ""}`}
            style={{ maxWidth: 700, margin: "0 auto" }}
          >
            <span className="hero-pill">Premium Transport Solutions</span>
            <h1 className="hero-title">Our Services</h1>
            <p className="hero-sub">
              Comprehensive transport solutions tailored to your needs.
              Excellence in every journey.
            </p>
          </div>
        </div>

        {/* ── QUICK OVERVIEW ── */}
        <div style={{ padding: "0 24px 100px" }}>
          <div
            style={{ textAlign: "center", marginBottom: 48 }}
            className={`reveal from-bottom ${heroVisible ? "visible delay-2" : ""}`}
          >
            <h3 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--orange)" }}>
              Quick Overview
            </h3>
            <div className="divider" />
          </div>

          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, columnGap: 40 }}>
            {overview.map((item, i) => (
              <OverviewCard key={i} {...item} delay={i % 3} />
            ))}
          </div>
        </div>

        {/* ── DETAILED SERVICES ── */}
        <section style={{ background: "rgba(207,232,239,0.55)", backdropFilter: "blur(20px)", padding: "80px 40px", borderTop: "1px solid rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 className="section-title">
                Detailed Service Information
                <div className="divider" />
              </h2>
            </div>

            {services.map((s, i) => (
              <div key={s.id} className={`delay-${i % 6}`}>
                <ServiceSection {...s} />
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

export default ServicesPage;