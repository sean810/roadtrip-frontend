import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import roadtrip from "../assets/logos/roadtrip.png";

function Navbar() {
  const location = useLocation();

  const [mounted, setMounted] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  const isHome = location.pathname === "/";

  const sections = [
    { label: "Home", id: "home", type: "scroll" },
    { label: "About Us", id: "about", type: "scroll" },
    { label: "Services", id: "services", type: "route" }, // 👈 now route
    { label: "Partners", id: "partners", type: "scroll" },
    { label: "Testimonials", id: "testimonials", type: "scroll" },
  ];

  /* Mount animation */
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /* Hero detection ONLY on homepage */
  useEffect(() => {
    if (!isHome) return;

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
      setActiveSection(""); // 👈 prevent "Home" highlight
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <nav
      className={`
        fixed top-0 left-0 z-50 w-full
        transition-all duration-[800ms]
        ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }
        ${
          overHero && isHome
            ? "backdrop-blur-lg bg-black/15 text-white"
            : "backdrop-blur-xl bg-[#d9f1f7]/80 text-[#171E67] shadow-sm"
        }
      `}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="transition-all duration-500 hover:scale-105">
          <img
            src={roadtrip}
            alt="RoadTrip Travel & Courier Services"
            className="h-12 w-auto"
          />
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10 font-inter font-bold text-[15px]">
          {sections.map((item) => (
            <li key={item.id} className="relative group">

              {item.type === "scroll" && isHome ? (
                <a
                  href={`#${item.id}`}
                  className="relative px-1 py-2 transition-all duration-300 hover:text-primary"
                >
                  {item.label}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[3px] rounded-full
                      bg-primary transition-all duration-500
                      ${
                        activeSection === item.id
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />
                </a>
              ) : (
                <Link
                  to={item.id === "services" ? "/services" : "/"}
                  className="relative px-1 py-2 transition-all duration-300 hover:text-primary"
                >
                  {item.label}
                </Link>
              )}

            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-6 font-inter font-bold">
          <Link
            to="/services"
            className="
              px-6 py-2.5 rounded-lg text-sm text-white bg-primary
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_20px_40px_rgba(255,92,11,0.55)]
              active:scale-95
            "
          >
            Book Now
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;