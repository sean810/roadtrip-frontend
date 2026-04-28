import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import roadtrip from "../assets/logos/roadtrip.png";

/* ─────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────── */
const NAV_STYLES = `
  @keyframes nav-logo-glow {
    0%, 100% { filter: drop-shadow(0 0 0 rgba(255,92,11,0)); }
    50%      { filter: drop-shadow(0 0 12px rgba(255,92,11,0.45)); }
  }
  @keyframes nav-link-shine {
    0%   { transform: translateX(-120%); opacity: 0; }
    50%  { opacity: 1; }
    100% { transform: translateX(160%); opacity: 0; }
  }
  @keyframes nav-cta-pulse {
    0%, 100% { box-shadow: 0 8px 22px rgba(255,92,11,0.35); }
    50%      { box-shadow: 0 12px 32px rgba(255,92,11,0.55); }
  }

  /* ── Navbar entrance shell (blur + slide) ── */
  .nav-shell {
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                transform 0.9s cubic-bezier(0.16,1,0.3,1),
                filter 0.9s cubic-bezier(0.16,1,0.3,1),
                background-color 0.6s cubic-bezier(0.16,1,0.3,1),
                color 0.6s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-shell.is-loading {
    opacity: 0; transform: translateY(-24px); filter: blur(8px);
  }
  .nav-shell.is-ready {
    opacity: 1; transform: translateY(0); filter: blur(0);
  }

  /* ── Logo hover ── */
  .nav-logo {
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.5s;
  }
  .nav-logo:hover {
    transform: scale(1.08) rotate(-2deg);
    animation: nav-logo-glow 1.6s ease-in-out infinite;
  }

  /* ── Link with underline + shimmer ── */
  .nav-link {
    position: relative; overflow: hidden;
    transition: color 0.35s cubic-bezier(0.16,1,0.3,1),
                transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-link:hover { transform: translateY(-2px); }
  .nav-link::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,92,11,0.25), transparent);
    transform: translateX(-150%);
    pointer-events: none;
  }
  .nav-link:hover::before {
    animation: nav-link-shine 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-underline {
    position: absolute; left: 0; bottom: -4px; height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, #FF5C0B, #f97316);
    transition: width 0.5s cubic-bezier(0.16,1,0.3,1),
                opacity 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-link:hover .nav-underline { width: 100% !important; opacity: 1 !important; }

  /* ── CTA button ── */
  .nav-cta {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #FF5C0B, #f97316);
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),
                background 0.4s;
  }
  .nav-cta::after {
    content: ''; position: absolute; top: 0; left: -120%;
    width: 60%; height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
    transition: left 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-cta:hover::after { left: 130%; }
  .nav-cta:hover {
    transform: translateY(-3px) scale(1.04);
    background: linear-gradient(135deg, #e84e00, #FF5C0B);
    animation: nav-cta-pulse 1.8s ease-in-out infinite;
  }

  /* ── Stagger entry for nav items ── */
  .nav-item {
    opacity: 0; transform: translateY(-12px);
    transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-item.is-ready { opacity: 1; transform: translateY(0); }
  .nav-item.delay-0 { transition-delay: 100ms; }
  .nav-item.delay-1 { transition-delay: 180ms; }
  .nav-item.delay-2 { transition-delay: 260ms; }
  .nav-item.delay-3 { transition-delay: 340ms; }
  .nav-item.delay-4 { transition-delay: 420ms; }
  .nav-item.delay-5 { transition-delay: 500ms; }

  @media (prefers-reduced-motion: reduce) {
    .nav-shell, .nav-item { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
    .nav-logo:hover, .nav-cta:hover { animation: none !important; }
  }
`;

function NavStyleInjector() {
  useEffect(() => {
    if (document.getElementById("nav-styles")) return;
    const tag = document.createElement("style");
    tag.id = "nav-styles";
    tag.textContent = NAV_STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
  return null;
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  const isHome = location.pathname === "/";

  const sections = [
    { label: "Home", id: "home", type: "scroll" },
    { label: "About Us", id: "about", type: "scroll" },
    { label: "Services", id: "services", type: "route" },
    { label: "Partners", id: "partners", type: "scroll" },
    { label: "Testimonials", id: "testimonials", type: "scroll" },
  ];

  /* Mount animation */
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(timer);
  }, []);

  /* Hero detection ONLY on homepage */
  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  /* Scroll tracking ONLY on homepage */
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      sections.forEach((section) => {
        if (section.type !== "scroll") return;
        const element = document.getElementById(section.id);
        if (!element) return;
        if (
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  /* Handle logo / route nav -> always go to top */
  const goHome = (e) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  const goServices = (e) => {
    e.preventDefault();
    navigate("/services");
    // ensure top of services page
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  return (
    <nav
      className={`
        nav-shell
        fixed top-0 left-0 z-50 w-full
        ${mounted ? "is-ready" : "is-loading"}
        ${
          overHero && isHome
            ? "backdrop-blur-lg bg-black/15 text-white"
            : "backdrop-blur-xl bg-[#d9f1f7]/80 text-[#171E67] shadow-sm"
        }
      `}
    >
      <NavStyleInjector />

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={goHome} className={`nav-logo nav-item ${mounted ? "is-ready" : ""} delay-0`}>
          <img
            src={roadtrip}
            alt="RoadTrip Travel & Courier Services"
            className="h-12 w-auto"
          />
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10 font-inter font-bold text-[15px]">
          {sections.map((item, i) => {
            const isActive = activeSection === item.id;
            const linkInner = (
              <>
                {item.label}
                <span
                  className="nav-underline"
                  style={{
                    width: isActive ? "100%" : "0%",
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </>
            );

            return (
              <li
                key={item.id}
                className={`nav-item ${mounted ? "is-ready" : ""} delay-${Math.min(i + 1, 5)}`}
              >
                {item.type === "scroll" && isHome ? (
                  <a href={`#${item.id}`} className="nav-link relative px-1 py-2 hover:text-primary inline-block">
                    {linkInner}
                  </a>
                ) : (
                  <Link
                    to={item.id === "services" ? "/services" : "/"}
                    onClick={item.id === "services" ? goServices : goHome}
                    className="nav-link relative px-1 py-2 hover:text-primary inline-block"
                  >
                    {linkInner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className={`nav-item ${mounted ? "is-ready" : ""} delay-5 flex items-center gap-6 font-inter font-bold`}>
          <Link
            to="/services"
            onClick={goServices}
            className="nav-cta px-6 py-2.5 rounded-lg text-sm text-white active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
