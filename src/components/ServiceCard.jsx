import { CheckCircle } from "lucide-react";

function ServiceCard({ title, description, points, image }) {
  return (
    <article className="h-full">
      <div className="gradient-border h-full">
        <div className="premium-card h-full flex flex-col">

          {/* Image */}
          <div className="h-48 w-full overflow-hidden rounded-t-2xl">
            <img
              src={image}
              alt={title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-grow">

            <h3 className="font-abhaya font-extrabold text-primary text-xl md:text-[22px]">
              {title}
            </h3>

            <p className="mt-4 font-abhaya font-medium text-[#171E67] leading-relaxed">
              {description}
            </p>

            <ul className="mt-6 space-y-3 font-abhaya font-medium text-[#171E67] flex-grow">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-primary mt-1 shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </div>
    </article>
  );
}

export default ServiceCard;