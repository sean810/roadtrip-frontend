import { useEffect, useState } from "react";
import roadtrip from "../assets/logos/roadtrip.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // slower, smoother entrance animation
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
        <img
          src={roadtrip}
          alt="RoadTrip Travel & Courier Services"
          className="h-12 w-auto"
        />

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10 font-inter font-bold text-[15px] text-[#171E67]">
          {["Home", "About Us", "Fleet", "Services", "Clients", "Contact"].map(
            (item) => (
              <li
                key={item}
                className="
                  relative cursor-pointer
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-full
                  after:origin-left
                  after:scale-x-0
                  after:bg-primary
                  after:transition-transform after:duration-300
                  hover:after:scale-x-100
                "
              >
                {item}
              </li>
            )
          )}
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

