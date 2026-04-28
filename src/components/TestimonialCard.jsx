// TestimonialCard.jsx
import { Star } from "lucide-react";
import { useRef } from "react";

const TestimonialCard = ({ quote, name, pfp, visible, delay = 0 }) => {
  const id = name.replace(/\s+/g, "-").toLowerCase();
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
      <article
        ref={cardRef}
        onMouseMove={handleMove}
        aria-labelledby={`testimonial-${id}`}
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

        {/* Decorative quote mark */}
        <span
          aria-hidden="true"
          className="absolute top-4 right-6 text-[80px] leading-none font-abhaya font-extrabold select-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
          style={{
            background: "linear-gradient(135deg, #FF5C0B, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.18,
          }}
        >
          "
        </span>

        {/* Accent line */}
        <div
          className="relative w-8 h-[2px] rounded-full mb-6 opacity-70 transition-all duration-500 group-hover:w-14 group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
        />

        {/* Stars */}
        <div className="relative flex justify-center gap-1 mb-6" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-transform duration-500"
              style={{ transitionDelay: `${i * 60}ms` }}
            />
          ))}
        </div>

        {/* Avatar */}
        <div
          className="
            relative mb-6 rounded-full p-[3px]
            transition-all duration-500
            group-hover:scale-[1.08] group-hover:-rotate-3
          "
          style={{
            background: "linear-gradient(135deg, #FF5C0B, #f97316)",
            boxShadow: "0 8px 20px rgba(255,92,11,0.22)",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <img
            src={pfp}
            alt={`${name} profile`}
            loading="lazy"
            decoding="async"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover bg-white"
          />
        </div>

        {/* Quote */}
        <p className="relative font-abhaya font-medium text-[#1E2A78]/85 leading-relaxed mb-6 text-base md:text-lg flex-grow">
          "{quote}"
        </p>

        {/* Name */}
        <p
          id={`testimonial-${id}`}
          className="relative font-abhaya font-extrabold text-[#FF5C0B] text-sm tracking-wide"
        >
          — {name}
        </p>

        {/* Bottom accent bar grows on hover */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
          style={{
            background: "linear-gradient(90deg, #FF5C0B, #f97316)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </article>
    </div>
  );
};

export default TestimonialCard;
