import { useEffect, useRef, useState } from "react";

import citizen from "../assets/logos/citizen.png";
import alfajiri from "../assets/logos/alfajiri.png";
import amicus from "../assets/logos/amicus.png";
import avu from "../assets/logos/avu.png";
import azali from "../assets/logos/azali.png";
import excelsior from "../assets/logos/excelsior.png";
import kivo from "../assets/logos/kivo.png";
import peacenet from "../assets/logos/peacenet.png";
import qcc from "../assets/logos/qcc.png";
import urf from "../assets/logos/urf.png";
import vka from "../assets/logos/vka.png";

import SecureIcon from "../assets/icons/secure.png";
import AwardIcon from "../assets/icons/award.png";
import TrustIcon from "../assets/icons/trust.png";

/* Reveal hook (matches ServicesPage pattern) */
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

const logos = [
  citizen, excelsior, amicus, azali, alfajiri, kivo,
  avu, peacenet, qcc, urf, vka,
];

const values = [
  {
    Icon: SecureIcon,
    title: "Reliable & Secure Services",
    text: "Our operations are licensed, insured, and supported by strict driver screening to ensure safety, security, and professionalism at all times.",
  },
  {
    Icon: AwardIcon,
    title: "Recognized for Excellence",
    text: "Known for our strong customer support, smooth service experience, and commitment to maintaining the highest standards.",
  },
  {
    Icon: TrustIcon,
    title: "Proven Reliability",
    text: "A solid history of partnering with major clients and consistently meeting expectations through reliable, well-coordinated transport services.",
  },
];

/* Glass value card with the ServicesPage hover behavior */
function ValueCard({ Icon, title, text, visible, delay }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className={`transition-all duration-[900ms] will-change-[opacity,transform,filter] ${
        visible
          ? "opacity-100 translate-y-0 blur-0 scale-100"
          : "opacity-0 translate-y-10 blur-sm scale-[0.96]"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        className="
          group relative h-full overflow-hidden
          rounded-2xl border
          p-8 flex flex-col items-center text-center
          transition-all duration-500
          hover:-translate-y-2 hover:rotate-[-0.2deg]
        "
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderColor: "rgba(255,255,255,0.6)",
          boxShadow: "0 8px 32px rgba(23,30,103,0.07)",
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 32px 70px rgba(23,30,103,0.18), 0 0 0 1px rgba(255,92,11,0.2)";
          e.currentTarget.style.borderColor = "rgba(255,92,11,0.28)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(23,30,103,0.07)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
        }}
      >
        {/* Top sheen */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
          }}
        />
        {/* Mouse-tracked radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,92,11,0.13), transparent 55%)",
          }}
        />
        {/* Diagonal shine sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span
            className="absolute top-0 -left-[120%] w-[55%] h-full transition-all duration-[900ms] group-hover:left-[140%]"
            style={{
              background:
                "linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* Accent line */}
        <div
          className="relative w-8 h-[2px] rounded-full mb-6 opacity-70 transition-all duration-500 group-hover:w-14 group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
        />

        {/* Icon bubble */}
        <div
          className="
            relative mb-5 w-16 h-16 rounded-2xl flex items-center justify-center
            transition-all duration-500
            group-hover:scale-[1.12] group-hover:-rotate-6
          "
          style={{
            background: "linear-gradient(135deg, #FFF6EE, #FFE5D2)",
            boxShadow: "0 8px 20px rgba(255,92,11,0.18)",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <img
            src={Icon}
            alt={title}
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Title */}
        <h4 className="relative font-abhaya font-extrabold text-[22px] md:text-[23px] text-[#FF5C0B] mb-4">
          {title}
        </h4>

        {/* Description */}
        <p className="relative font-abhaya font-extrabold text-[16px] md:text-[17px] text-[#171E67]/80 leading-relaxed flex-grow">
          {text}
        </p>

        {/* Bottom accent bar grows on hover */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
          style={{
            background: "linear-gradient(90deg, #FF5C0B, #f97316)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  );
}

const TrustedBrands = () => {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [marqueeRef, marqueeVisible] = useReveal(0.1);
  const [cardsRef, cardsVisible] = useReveal(0.1);

  return (
    <section
      id="partners"
      className="relative w-full py-24 bg-skybg overflow-hidden"
    >
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[460px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,92,11,0.18), transparent 70%)" }}
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
              background: "rgba(34,197,94,0.14)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#15803d",
            }}
          >
            Trusted Partners
          </span>

          <h2
            className="font-abhaya font-extrabold leading-[1.05] mb-4"
            style={{
              fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)",
              background: "linear-gradient(135deg, #FF5C0B 30%, #f97316 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trusted by Top Brands
          </h2>

          <div
            className="mx-auto h-[3px] w-14 rounded-full mb-6"
            style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
          />

          <p className="max-w-2xl mx-auto font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67]/85 leading-relaxed mb-16">
            We're proud to support leading businesses and organizations across
            Kenya with dependable transport solutions that consistently deliver
            value and confidence.
          </p>
        </div>

        {/* Marquee — BIGGER tiles & logos */}
        <div
          ref={marqueeRef}
          className={`relative overflow-hidden mb-32 transition-all duration-[900ms] ${
            marqueeVisible
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-skybg to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-skybg to-transparent z-10" />

          <div className="flex w-max gap-8 sm:gap-14 animate-marquee pause-on-hover items-center">
            {[...logos, ...logos.slice(0, 6)].map((logo, index) => (
              <div
                key={index}
                className="
                  group flex items-center justify-center
                  h-24 sm:h-32 md:h-36 w-40 sm:w-56 md:w-64
                  bg-white/70 backdrop-blur-sm
                  rounded-2xl border border-gray-200
                  shadow-sm
                  transition-all duration-300
                  hover:bg-white hover:shadow-lg hover:-translate-y-1
                "
              >
                <img
                  src={logo}
                  alt="Brand logo"
                  loading="lazy"
                  decoding="async"
                  className="
                    h-16 sm:h-20 md:h-24 object-contain
                    opacity-50 grayscale
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105
                  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* Value Highlights */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {values.map(({ Icon, title, text }, index) => (
            <ValueCard
              key={title}
              Icon={Icon}
              title={title}
              text={text}
              visible={cardsVisible}
              delay={index * 160}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
