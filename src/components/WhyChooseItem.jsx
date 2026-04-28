import { CheckCircle } from "lucide-react";
import { useRef } from "react";

const WhyChooseItem = ({ title, description, visible, delay = 0, index = 0 }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      className={`transition-all duration-[900ms] will-change-[opacity,transform,filter] ${
        visible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-8 blur-sm"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="
          group relative overflow-hidden
          rounded-2xl border
          p-6 md:p-7
          flex items-start gap-5
          transition-all duration-500
          hover:-translate-y-1.5
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
            "0 26px 60px rgba(23,30,103,0.16), 0 0 0 1px rgba(255,92,11,0.18)";
          e.currentTarget.style.borderColor = "rgba(255,92,11,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(23,30,103,0.07)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
        }}
      >
        {/* Cursor-follow radial glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,92,11,0.13), transparent 55%)",
          }}
        />

        {/* Left vertical accent that grows on hover */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full transition-all duration-500 group-hover:h-[80%]"
          style={{ background: "linear-gradient(180deg, #FF5C0B, #f97316)" }}
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

        {/* Icon bubble */}
        <div className="relative shrink-0">
          <div
            className="
              flex items-center justify-center
              w-12 h-12 rounded-xl
              transition-all duration-500
              group-hover:scale-[1.12] group-hover:-rotate-6
            "
            style={{
              background: "linear-gradient(135deg, #FF5C0B, #f97316)",
              boxShadow: "0 8px 20px rgba(255,92,11,0.35)",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <CheckCircle size={22} className="text-white" />
          </div>

          {/* Number chip */}
          <span
            className="
              absolute -top-2 -right-2
              px-1.5 py-0.5 rounded-full
              text-[10px] font-semibold font-inter tracking-wider
              text-[#171E67] bg-white
              shadow-[0_2px_8px_rgba(23,30,103,0.15)]
              transition-transform duration-500
              group-hover:scale-110
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Text */}
        <div className="relative flex-1">
          {/* Accent line above title */}
          <div
            className="h-[2px] w-6 mb-2 rounded-full bg-primary opacity-70 transition-all duration-500 group-hover:w-12 group-hover:opacity-100"
          />

          <h3 className="font-abhaya font-extrabold text-xl md:text-[22px] text-[#171E67] mb-1.5 transition-colors duration-300 group-hover:text-[#0f1147]">
            {title}
          </h3>

          <p className="font-inter text-[15px] md:text-base text-[#171E67]/75 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom accent bar that grows on hover */}
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
          style={{
            background: "linear-gradient(90deg, #FF5C0B, #f97316)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .why-item-wrap, .why-item-card, .why-item-card * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WhyChooseItem;
