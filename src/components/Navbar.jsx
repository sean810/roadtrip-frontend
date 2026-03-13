import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import roadtrip from "../assets/logos/roadtrip.png";

function Navbar() {
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    !!localStorage.getItem("userInfo")
  );

  const [activeSection, setActiveSection] = useState("home");
  const [overHero, setOverHero] = useState(true);

  const sections = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Fleet", id: "fleet" },
    { label: "Services", id: "services" },
    { label: "Partners", id: "partners" },
    { label: "Testimonials", id: "testimonials" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 300);

    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverHero(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`
        fixed top-0 left-0 z-50 w-full
        transition-all duration-[800ms]
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        ${
          overHero
            ? "backdrop-blur-lg bg-black/15 text-white"
            : "backdrop-blur-xl bg-[#d9f1f7]/80 text-[#171E67] shadow-sm"
        }
      `}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          to="/"
          aria-label="Go to homepage"
          className="transition-all duration-500 hover:scale-105"
        >
          <img
            src={roadtrip}
            alt="RoadTrip Travel & Courier Services"
            className="h-12 w-auto"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-10 font-inter font-bold text-[15px]">
          {sections.map((item) => (
            <li key={item.id} className="relative group">
              <a
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "page" : undefined}
                className="relative px-1 py-2 transition-all duration-300 hover:text-primary"
              >
                {item.label}

                <span
                  className={`
                    absolute left-0 -bottom-1 h-[3px] rounded-full
                    bg-primary
                    transition-all duration-500
                    ${
                      activeSection === item.id
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 font-inter font-bold">

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                aria-label="Login to your account"
                className="transition-all duration-300 hover:text-primary"
              >
                Login
              </Link>

              <Link
                to="/register"
                aria-label="Create an account"
                className="
                  px-6 py-2.5
                  rounded-lg
                  text-sm
                  text-white
                  bg-primary
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_20px_40px_rgba(255,92,11,0.55)]
                  active:scale-95
                "
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              aria-label="Logout from your account"
              className="
                px-6 py-2.5
                rounded-lg
                text-sm
                text-white
                bg-primary
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(255,92,11,0.55)]
                active:scale-95
              "
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;