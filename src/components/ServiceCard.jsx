import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

function ServiceCard({ title, description, points, image }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -80px",
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        relative bg-white rounded-2xl
        border border-transparent
        transition-all duration-[490ms] ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}

        hover:-translate-y-3
        hover:border-primary
        hover:shadow-[0_0_0_2px_rgba(255,92,11,0.2),0_20px_40px_-10px_rgba(255,92,11,0.45)]
      `}
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Title */}
        <h3 className="font-abhaya font-extrabold text-primary text-xl md:text-[22px]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 font-abhaya font-medium text-[#171E67] leading-relaxed">
          {description}
        </p>

        {/* Bullet points */}
        <ul className="mt-6 space-y-3 font-abhaya font-medium text-[#171E67]">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-primary mt-1" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServiceCard;
