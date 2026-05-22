import { CheckCircle } from "lucide-react";
import { useRef } from "react";

function ServiceCard({ title, description, points, image, tagline }) {
  const cardRef = useRef(null);

  return (
    <article className="h-full group">
      <div
        ref={cardRef}
        className="
          relative h-full overflow-hidden rounded-2xl
          border border-white/60
          flex flex-col
          transition-all duration-500
          hover:-translate-y-3 hover:scale-[1.01] 
        "
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 35px 80px rgba(23,30,103,0.16), 0 0 0 1px rgba(255,92,11,0.14)";
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

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,92,11,0.08), transparent 45%)",
          }}
        />

        {/* Image */}
        <div className="relative z-[2] h-60 w-full overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            width={480}
            height={208}
            className="
              w-full h-full object-cover
              transition-transform duration-[500ms] ease-out
              group-hover:scale-[1.12]
            "
            style={{ willChange: "transform" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.22), transparent 45%)",
            }}
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
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {tagline}
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-[2] p-8 flex flex-col flex-grow">
          {/* Accent line that grows on hover */}
          <div
            className="
  h-[3px]
  mb-5
  rounded-full
  transition-all duration-500 ease-out
  group-hover:w-16
"
            style={{
              width: "2.5rem",
              background: "linear-gradient(90deg, #FF5C0B, #f97316)",
            }}
          />

          <h3 className="font-abhaya font-extrabold text-primarytext-[1.55rem] md:text-[1.7rem] leading-tight tracking-[-0.02em] transition-colors duration-300">
            {title}
          </h3>

          <p className="mt-4 font-abhaya text-[1rem] leading-[1.9] text-[#667085]">
            {description}
          </p>

          <ul className="mt-7 space-y-4 font-abhaya font-medium text-[#171E67] flex-grow">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2 transition-all duration-300 ease-out hover:translate-x-1"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
              >
                <div
                  className="
    mt-[2px] shrink-0
    flex items-center justify-center
    w-5 h-5 rounded-full
    bg-orange-100
  "
                >
                  <CheckCircle size={12} className="text-primary opacity-90" />
                </div>
                <span className="text-[#475467] leading-relaxed">{point}</span>
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
