import { useEffect, useMemo, useState } from "react";
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
  @keyframes nav-cta-pulse {
    0%, 100% { box-shadow: 0 8px 22px rgba(255,92,11,0.35); }
    50%      { box-shadow: 0 12px 32px rgba(255,92,11,0.55); }
  }

  /* ── Navbar entrance shell (no stagger, instant) ── */
  .nav-shell {
    opacity: 1; transform: translateY(0); filter: blur(0);
    transition: background-color 0.4s cubic-bezier(0.16,1,0.3,1),
                color 0.4s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-shell.is-loading {
    opacity: 1; transform: translateY(0); filter: blur(0);
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

  /* ── Link with underline ── */
  .nav-link {
    position: relative; overflow: hidden;
    transition: color 0.35s cubic-bezier(0.16,1,0.3,1),
                transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-link:hover { transform: translateY(-2px); }
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

  /* ── Nav items appear instantly (no stagger) ── */
  .nav-item {
    opacity: 1; transform: translateY(0);
  }
  .nav-item.is-ready { opacity: 1; transform: translateY(0); }
  .nav-item.delay-0 { }
  .nav-item.delay-1 { }
  .nav-item.delay-2 { }
  .nav-item.delay-3 { }
  .nav-item.delay-4 { }
  .nav-item.delay-5 { }

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

  
  const [overHero, setOverHero] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const isServices = location.pathname === "/services";

  const sections = useMemo(
  () => [
    { label: "Home", id: "home", type: "scroll", path: "/" },
    { label: "About Us", id: "about", type: "route", path: "/about" },
    { label: "Services", id: "services", type: "route", path: "/services" },
    { label: "Partners", id: "partners", type: "scroll", path: "/" },
    { label: "Testimonials", id: "testimonials", type: "scroll", path: "/" },
  ],
  []
);

useEffect(() => {
  let rafId;
  let ticking = false;

  const update = () => {
    const hero =
      document.getElementById("home") ||
      document.getElementById("about-hero") ||
      document.getElementById("services-hero");

    if (hero) {
      const rect = hero.getBoundingClientRect();
      setOverHero(rect.bottom > 80);
    }
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      rafId = requestAnimationFrame(update);
    }
  };

  // Only update on scroll, not continuous RAF
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  
  update(); // Initial check

  return () => {
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    cancelAnimationFrame(rafId);
  };
}, [location.pathname]);

  /* Scroll tracking ONLY on homepage */
  useEffect(() => {
    if (!isHome) {
  requestAnimationFrame(() => {
    setActiveSection("");
  });
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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, sections]);

  /* Detect and scroll to hash on home page (handles cross-page links) */
  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace("#", "");
      // Wait for the home page components to mount properly
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isHome, location.hash]);

  /* Handle logo / home nav -> always go to top */
  const goHome = (e) => {
    if (!isHome) return; // Let Link handle navigation if not on Home
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goRouteTop = (path) => (e) => {
    e.preventDefault();

    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate(path);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  const goHomeSection = () => {
    // If we're already home, just let the standard anchor behavior or scroll tracking handle it
    if (isHome) return;
    
    // From other pages, the Link's 'to' prop (e.g. /#partners) handles navigation.
    // Our cross-page hash useEffect will handle the scrolling once we arrive.
  };

  return (
    <nav
      className={`
        nav-shell
        fixed top-0 left-0 z-50 w-full
        is-ready
        ${
          overHero
            ? "backdrop-blur-lg bg-black/15 text-white"
            : "backdrop-blur-xl bg-[#d9f1f7]/80 text-[#171E67] shadow-sm"
        }
      `}
    >
      <NavStyleInjector />

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={goHome}
          className="nav-logo nav-item is-ready delay-0"
        >
          <img
            src={roadtrip}
            alt="RoadTrip Travel & Courier Services"
            className="h-12 w-auto"
          />
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10 font-inter font-bold text-[15px]">
          {sections.map((item, i) => {
            const isActive =
              activeSection === item.id ||
              (item.id === "about" && isAbout) ||
              (item.id === "services" && isServices);

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
                className={`nav-item is-ready delay-${Math.min(i + 1, 5)}`}
              >
                {item.type === "scroll" && isHome ? (
                  <a
                    href={`#${item.id}`}
                    className="nav-link relative px-1 py-2 hover:text-primary inline-block"
                  >
                    {linkInner}
                  </a>
                ) : item.type === "scroll" ? (
                  <Link
                    to={`/#${item.id}`}
                    onClick={goHomeSection(item.id)}
                    className="nav-link relative px-1 py-2 hover:text-primary inline-block"
                  >
                    {linkInner}
                  </Link>
                ) : (
                  <Link
                    to={item.path}
                    onClick={goRouteTop(item.path)}
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
        <div
         className="nav-item is-ready delay-5 flex items-center gap-6 font-inter font-bold"
        >
          <Link
            to="/booking"
            onClick={goRouteTop("/booking")}
            className="nav-cta px-6 py-2 rounded-lg text-sm text-white active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;