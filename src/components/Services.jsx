import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ServiceCard from "./ServiceCard";
import chauffeurImg from "../assets/images/chauffeur.jpg";
import selfDriveImg from "../assets/images/self-drive.jpg";
import leaseImg from "../assets/images/lease.jpg";

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

const services = [
  {
    image: chauffeurImg,
    title: "Chauffeur Services",
    description:
      "Travel comfortably while our skilled drivers get you where you need to be. Ideal for business travel, airport pickups, and special outings across Kenya.",
    points: [
      "Certified professional drivers",
      "Modern, well-maintained vehicles",
      "Fast and reliable airport transfers",
      "Stress-free corporate and event transport",
    ],
    tagline: "Sit back. We'll drive.",
    badge: "🚘",
  },
  {
    image: selfDriveImg,
    title: "Self-drive rentals",
    description:
      "Enjoy the freedom to travel your way with our curated fleet of top-tier, impeccably maintained vehicles.",
    points: [
      "Wide selection from executive to luxury models",
      "Full insurance protection included",
      "24/7 nationwide roadside support",
    ],
    tagline: "Your road, your rules.",
    badge: "🚗",
  },
  {
    image: leaseImg,
    title: "Lease vehicle services",
    description:
      "Skip the costs of buying and enjoy a long-term ride you can rely on.",
    points: [
      "Flexible lease periods",
      "Insurance + maintenance included",
      "Help available anytime",
    ],
    tagline: "Long-term, low-stress.",
    badge: "💼",
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useReveal(0.15);
  const [ctaRef, ctaVisible] = useReveal(0.2);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(147,210,230,0.55), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-20 w-[420px] h-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,92,11,0.25), transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-[900ms] ease-out ${
            headerVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ willChange: "opacity, transform, filter" }}
        >
          <span
            className="inline-block px-5 py-1.5 mb-5 rounded-full text-xs font-semibold tracking-[2px] uppercase font-inter"
            style={{
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "#4f46e5",
            }}
          >
            Popular Services
          </span>

          <h2
            className="font-abhaya font-extrabold leading-[1.1]"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              background: "linear-gradient(135deg, #FF5C0B 30%, #f97316 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your All-In-One Transport Partner
          </h2>

          <div
            className="mx-auto mt-4 h-[3px] w-12 rounded-full"
            style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
          />

          <p className="mt-6 max-w-2xl mx-auto font-inter text-[#171E67]/80 text-base md:text-lg leading-relaxed">
            Whether you prefer driving yourself or riding with a professional,
            we provide flexible transport solutions designed to fit your
            journey across Kenya.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealCard key={service.title} delay={index * 140}>
              <ServiceCard {...service} />
            </RevealCard>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className={`mt-16 flex justify-center transition-all duration-[900ms] ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => navigate("/services")}
            aria-label="View additional transport services"
            className="
              relative group overflow-hidden
              inline-flex items-center gap-2
              px-7 py-3.5 rounded-full
              font-abhaya font-extrabold
              text-white
              transition-all duration-500 ease-out
              hover:-translate-y-1.5 hover:scale-[1.04]
            "
            style={{
              background: "linear-gradient(135deg, #FF5C0B 0%, #f97316 100%)",
              boxShadow: "0 8px 24px rgba(255,92,11,0.38)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 18px 44px rgba(255,92,11,0.55)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,92,11,0.38)")
            }
          >
            {/* Shine sweep */}
            <span
              className="absolute top-0 -left-[120%] w-[60%] h-full pointer-events-none transition-all duration-700 ease-out group-hover:left-[130%]"
              style={{
                background:
                  "linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent)",
              }}
            />
            <span className="relative flex items-center gap-2">
              View other services
              <ArrowRight
                size={18}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

/* Wrapper that scroll-reveals each card with stagger */
function RevealCard({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.12);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${
        visible ? "opacity-100 translate-y-0 blur-0 scale-100" : "opacity-0 translate-y-10 blur-sm scale-[0.96]"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}

export default Services;
