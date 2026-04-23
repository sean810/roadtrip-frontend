import { CheckCircle } from "lucide-react";

function ServiceCard({ title, description, points, image }) {
  return (
    <article className="h-full">
      <div
        className="h-full rounded-2xl border border-[rgba(23,30,103,0.12)] bg-white
          shadow-[0_2px_12px_rgba(23,30,103,0.06)]
          transition-shadow duration-300 ease-out
          hover:shadow-[0_8px_32px_rgba(23,30,103,0.13)]"
      >
        {/* Image */}
        <div className="h-48 w-full overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            width={480}
            height={192}
            className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow">
          {/* Thin accent line */}
          <div className="w-8 h-[2px] bg-primary mb-4 rounded-full" />

          <h3 className="font-abhaya font-extrabold text-primary text-xl md:text-[22px]">
            {title}
          </h3>

          <p className="mt-4 font-abhaya font-medium text-[#171E67] leading-relaxed opacity-80">
            {description}
          </p>

          <ul className="mt-6 space-y-3 font-abhaya font-medium text-[#171E67] flex-grow">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle
                  size={15}
                  className="text-primary mt-[3px] shrink-0 opacity-90"
                />
                <span className="opacity-80">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default ServiceCard;