import { Star } from "lucide-react";

const TestimonialCard = ({ quote, name, pfp }) => {
  return (
    <div
      className="
        relative 
        bg-[#faf7f5]
        rounded-2xl 
        p-8 
        text-center
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      {/* Quote mark (top right) */}
      <span className="absolute top-4 right-5 text-2xl font-bold text-black">
        ”
      </span>

      {/* Stars */}
      <div className="flex justify-center gap-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={pfp}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>

      {/* Quote */}
      <p className="font-abhaya font-medium text-[#1E2A78] leading-relaxed mb-6 text-base md:text-lg">
        “{quote}”
      </p>

      {/* Name */}
      <p className="font-abhaya font-medium text-[#1E2A78]">
        — {name}
      </p>
    </div>
  );
};

export default TestimonialCard;
