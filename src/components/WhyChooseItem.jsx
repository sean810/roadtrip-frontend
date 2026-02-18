import { CheckCircle } from "lucide-react";

const WhyChooseItem = ({ title, description, visible, delay = 0 }) => {
  return (
    <div
      className={`
        flex gap-4 items-start
        transition-all duration-[950ms] ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CheckCircle className="text-primary w-7 h-7 mt-1 shrink-0" />

      <div>
        <h4 className="font-abhaya font-extrabold text-[22px] md:text-[23px] text-[#FF5C0B]">
  {title}
</h4>

<p className="mt-2 font-abhaya font-extrabold text-[16px] md:text-[17px] text-[#171E67] leading-relaxed">
  {description}
</p>

      </div>
    </div>
  );
};

export default WhyChooseItem;

