import { useEffect, useState } from "react";
import roadtrip from "../assets/logos/roadtrip.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Fleet", id: "fleet" },
    { label: "Services", id: "services" },
    { label: "Partners", id: "partners" },
    { label: "Testimonials", id: "testimonials" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

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

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      setMounted(true);
    }, 300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full
        backdrop-blur-[6px]
        transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        ${
          scrolled
            ? "bg-white/15 border-b border-white/10"
            : "bg-white/25 border-b border-white/20"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <a href="#home">
          <img
            src={roadtrip}
            alt="RoadTrip Travel & Courier Services"
            className="h-12 w-auto"
          />
        </a>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10 font-inter font-bold text-[15px] text-[#171E67]">
          {sections.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className="relative px-1 py-2"
              >
                {item.label}

                {/* Active underline */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] bg-primary
                    transition-all duration-300 ease-out
                    ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0"
                    }
                  `}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-8 font-inter font-bold">
          <button className="text-[15px] text-[#171E67]">
            Login
          </button>

          <button
            className="
              bg-primary text-white
              px-5 py-2.5
              rounded-lg
              text-sm
              shadow-sm
              transition
              hover:bg-primary/90 hover:shadow-md
            "
          >
            Sign Up
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
