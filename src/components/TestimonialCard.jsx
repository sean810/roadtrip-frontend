import { Star } from "lucide-react";

const TestimonialCard = ({ quote, name, pfp }) => {
  const id = name.replace(/\s+/g, "-").toLowerCase();

  return (
    <article
      aria-labelledby={`testimonial-${id}`}
      className="
        h-full rounded-2xl
        border border-[rgba(23,30,103,0.12)] bg-white
        shadow-[0_2px_12px_rgba(23,30,103,0.06)]
        transition-shadow duration-300 ease-out
        hover:shadow-[0_8px_32px_rgba(23,30,103,0.13)]
        p-8 flex flex-col items-center text-center relative
      "
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden="true"
        className="absolute top-5 right-6 text-4xl leading-none font-abhaya font-extrabold text-primary opacity-10 select-none"
      >
        "
      </span>

      {/* Accent line */}
      <div className="w-8 h-[2px] bg-primary rounded-full mb-6 opacity-70" />

      {/* Stars */}
      <div className="flex justify-center gap-1 mb-6" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Avatar */}
      <div className="mb-6">
        <img
          src={pfp}
          alt={`${name} profile`}
          loading="lazy"
          decoding="async"
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-[rgba(255,92,11,0.15)]"
        />
      </div>

      {/* Quote */}
      <p className="font-abhaya font-medium text-[#1E2A78] leading-relaxed mb-6 text-base md:text-lg flex-grow opacity-80">
        "{quote}"
      </p>

      {/* Name */}
      <p
        id={`testimonial-${id}`}
        className="font-abhaya font-extrabold text-[#FF5C0B] text-sm tracking-wide"
      >
        — {name}
      </p>
    </article>
  );
};

export default TestimonialCard;