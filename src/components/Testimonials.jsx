// Testimonials.jsx
import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

import brian from "../assets/pfps/brian.png";
import corporate from "../assets/pfps/corporate.png";
import james from "../assets/pfps/james.png";

/* Reveal hook (matches ServicesPage / TrustedBrands pattern) */
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

const testimonials = [
  {
    quote:
      "From booking to drop-off, the experience was seamless. Everything was well organized and handled professionally.",
    name: "Brian M.",
    pfp: brian,
  },
  {
    quote:
      "Our team needed reliable transport for meetings and events, and the service delivered every single time.",
    name: "Corporate Client",
    pfp: corporate,
  },
  {
    quote:
      "RoadTrip made my airport transfers effortless. The car was clean, the driver was on time, and the entire experience felt smooth and professional.",
    name: "James K., Nairobi",
    pfp: james,
  },
];

const Testimonials = () => {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [cardsRef, cardsVisible] = useReveal(0.1);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full py-24 bg-skybg overflow-hidden"
    >
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -top-32 -right-24 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,92,11,0.18), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 w-[460px] h-[460px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-[900ms] ${
            headerVisible
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span
            className="inline-block px-5 py-1.5 mb-6 text-xs font-semibold tracking-[2px] uppercase rounded-full font-inter"
            style={{
              background: "rgba(255,92,11,0.12)",
              border: "1px solid rgba(255,92,11,0.25)",
              color: "#FF5C0B",
            }}
          >
            Testimonials
          </span>

          <h2
            id="testimonials-heading"
            className="font-abhaya font-extrabold leading-[1.05] mb-4"
            style={{
              fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)",
              background: "linear-gradient(135deg, #FF5C0B 30%, #f97316 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hear From Our Clients
          </h2>

          <div
            className="mx-auto h-[3px] w-14 rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
          />

          <p className="max-w-2xl mx-auto font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67]/85 leading-relaxed mb-16">
            Discover why individuals and organizations continue to choose
            RoadTrip for exceptional transport experiences.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={item.name}
              {...item}
              visible={cardsVisible}
              delay={index * 160}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
