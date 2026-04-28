import { useEffect, useRef, useState } from "react";
import WhyChooseItem from "./WhyChooseItem";

/* Reveal hook (matches ServicesPage pattern) */
function useReveal(threshold = 0.2, { once = true } = {}) {
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
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}

const items = [
  {
    title: "Trusted Performance",
    description:
      "Our vehicles are carefully maintained, our services run on schedule, and our team is committed to keeping your journey smooth from start to finish.",
  },
  {
    title: "Experienced Professionals",
    description:
      "Every driver is trained, vetted, and equipped with the local experience needed to ensure safe, comfortable travel anywhere in Kenya.",
  },
  {
    title: "Tailored Travel Options",
    description:
      "Whether you're planning a solo trip or organizing transport for your team, we craft flexible packages that fit your needs perfectly.",
  },
  {
    title: "Always Here for You",
    description:
      "Day or night, our support team is ready to assist with inquiries, emergencies, or last-minute changes.",
  },
];

const WhyChooseUs = () => {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [listRef, listVisible] = useReveal(0.1);

  return (
    <section
      aria-labelledby="why-heading"
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

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-[900ms] ease-out will-change-[opacity,transform,filter] ${
            headerVisible
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-8 blur-sm"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span
            className="inline-block px-5 py-1.5 mb-6 text-xs font-semibold tracking-[2px] uppercase rounded-full font-inter"
            style={{
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "#4f46e5",
            }}
          >
            Why choose us
          </span>

          <h2
            id="why-heading"
            className="font-abhaya font-extrabold leading-[1.05] mb-4"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              background: "linear-gradient(135deg, #FF5C0B 30%, #f97316 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose RoadTrip?
          </h2>

          <div
            className="h-[3px] w-12 rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
          />

          <p className="font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67]/90 leading-relaxed mb-14 max-w-2xl">
            For years, RoadTrip has supported travelers and businesses across
            Kenya with dependable transport services built on trust, care, and
            consistency. We provide:
          </p>
        </div>

        {/* Items */}
        <div ref={listRef} className="space-y-6">
          {items.map((item, index) => (
            <WhyChooseItem
              key={item.title}
              {...item}
              index={index}
              visible={listVisible}
              delay={index * 160}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
