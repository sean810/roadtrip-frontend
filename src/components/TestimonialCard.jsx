import { Star } from "lucide-react";

const TestimonialCard = ({ quote, name, pfp }) => {
  const id = name.replace(/\s+/g, "-").toLowerCase();

  return (
    <article
      aria-labelledby={`testimonial-${id}`}
      className="gradient-border h-full"
    >
      <div className="premium-card p-8 h-full flex flex-col justify-between text-center relative">

        <span
          aria-hidden="true"
          className="absolute top-4 right-5 text-2xl font-bold text-black"
        >
          ”
        </span>

        <div className="flex justify-center gap-2 mb-6" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <img
            src={pfp}
            alt={`${name} profile`}
            loading="lazy"
            decoding="async"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>

        <p className="font-abhaya font-medium text-[#1E2A78] leading-relaxed mb-6 text-base md:text-lg flex-grow">
          “{quote}”
        </p>

        <p
          id={`testimonial-${id}`}
          className="font-abhaya font-medium text-[#1E2A78]"
        >
          — {name}
        </p>

      </div>
    </article>
  );
};

export default TestimonialCard;