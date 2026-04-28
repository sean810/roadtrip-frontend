import { CheckCircle } from "lucide-react";
import { useRef } from "react";

function ServiceCard({ title, description, points, image, tagline, badge }) {
  const cardRef = useRef(null);

  // Mouse-tracked glow (matches ServicesPage overview-card)
  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article className="h-full group" onMouseMove={handleMove}>
      <div
        ref={cardRef}
        className="
          relative h-full overflow-hidden rounded-2xl
          border border-white/60
          flex flex-col
          transition-all duration-500
          hover:-translate-y-2.5 hover:rotate-[-0.2deg]
        "
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
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
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
          }}
        />
        {/* Mouse-tracked glow */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,92,11,0.13), transparent 55%)",
          }}
        />

        {/* Image */}
        <div className="relative z-[2] h-52 w-full overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            width={480}
            height={208}
            className="
              w-full h-full object-cover
              transition-transform duration-[800ms] ease-out
              group-hover:scale-[1.08]
            "
            style={{ willChange: "transform" }}
          />

          {/* Tagline overlay */}
          {tagline && (
            <div
              className="
                pointer-events-none absolute inset-0 flex items-end p-5
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100
              "
              style={{
                background:
                  "linear-gradient(to top, rgba(23,30,103,0.85) 0%, rgba(23,30,103,0.1) 55%, transparent 100%)",
              }}
            >
              <p
                className="font-abhaya font-extrabold text-white text-lg leading-tight translate-y-3 transition-transform duration-500 group-hover:translate-y-0"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {tagline}
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-[2] p-7 flex flex-col flex-grow">
          {/* Accent line that grows on hover */}
          <div
            className="h-[2px] bg-primary mb-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: "2rem" }}
          />

          <h3 className="font-abhaya font-extrabold text-primary text-xl md:text-[22px] transition-colors duration-300">
            {title}
          </h3>

          <p className="mt-3 font-abhaya font-medium text-[#171E67]/80 leading-relaxed">
            {description}
          </p>

          <ul className="mt-5 space-y-2.5 font-abhaya font-medium text-[#171E67] flex-grow">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2 transition-all duration-300 ease-out hover:translate-x-1"
                style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
              >
                <CheckCircle
                  size={15}
                  className="text-primary mt-[3px] shrink-0 opacity-90 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="opacity-80">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Animated bottom accent bar */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
          style={{
            background: "linear-gradient(90deg, #FF5C0B, #f97316)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </article>
  );
}

export default ServiceCard;
