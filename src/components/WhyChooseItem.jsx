

import { CheckCircle } from "lucide-react";

const WhyChooseItem = ({ title, description, visible, delay = 0 }) => {
  return (
    <div
      className={`transition-all duration-[700ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="rounded-2xl border border-[rgba(23,30,103,0.12)] bg-white
          shadow-[0_2px_12px_rgba(23,30,103,0.06)]
          transition-shadow duration-300 ease-out
          hover:shadow-[0_8px_32px_rgba(23,30,103,0.13)]
          p-6 flex gap-4 items-start"
      >
        <CheckCircle className="text-primary w-6 h-6 mt-1 shrink-0 opacity-90" />

        <div>
          {/* Accent line above title */}
          <div className="w-6 h-[2px] bg-primary rounded-full mb-3 opacity-70" />

          <h4 className="font-abhaya font-extrabold text-[22px] md:text-[23px] text-[#FF5C0B]">
            {title}
          </h4>

          <p className="mt-2 font-abhaya font-extrabold text-[16px] md:text-[17px] text-[#171E67] leading-relaxed opacity-80">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseItem;