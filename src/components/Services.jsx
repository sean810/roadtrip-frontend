import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import chauffeurImg from "../assets/images/chauffeur.jpg";
import selfDriveImg from "../assets/images/self-drive.jpg";
import leaseImg from "../assets/images/lease.jpg";
import { ArrowRight } from "lucide-react";

function Services() {
  const sectionRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -80px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      image: chauffeurImg,
      title: "Chauffeur Services",
      description:
        "Travel comfortably while our skilled drivers get you where you need to be. Ideal for business travel, airport pickups, and special outings across Kenya.",
      points: [
        "Certified professional drivers",
        "Modern, well-maintained vehicles",
        "Fast and reliable airport transfers",
        "Stress-free corporate and event transport",
      ],
    },
    {
      image: selfDriveImg,
      title: "Self-drive rentals",
      description:
        "Enjoy the freedom to travel your way with our curated fleet of top-tier, impeccably maintained vehicles.",
      points: [
        "Wide selection from executive to luxury models",
        "Full insurance protection included",
        "24/7 nationwide roadside support",
      ],
    },
    {
      image: leaseImg,
      title: "Lease vehicle services",
      description:
        "Skip the costs of buying and enjoy a long-term ride you can rely on.",
      points: [
        "Flexible lease periods",
        "Insurance + maintenance included",
        "Help available anytime",
      ],
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-28 bg-skybg"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div
          className={`
            flex flex-col items-center text-center max-w-4xl mx-auto
            transition-all duration-700 ease-out will-change-transform
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillServicesBg text-pillServicesText">
            Popular Services
          </span>

          <h2 className="text-5xl md:text-6xl font-abhaya font-extrabold text-primary">
            Your All-In-One Transport Partner
          </h2>

          <p className="mt-6 max-w-3xl text-lg md:text-xl font-abhaya font-extrabold text-[#171E67]">
            Whether you prefer driving yourself or riding with a professional, we provide flexible transport solutions designed to fit your journey across Kenya.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="will-change-transform"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Divider + CTA */}
        <div
          className={`
            mt-16 flex flex-col items-center
            transition-all duration-700 ease-out
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >

          {/* Subtle divider */}
          <div className="w-40 h-[2px] mb-10 bg-gradient-to-r from-transparent via-[#FF5C0B]/60 to-transparent" />

          {/* Button */}
          <button
            className="
              relative group overflow-hidden
              inline-flex items-center gap-2
              px-6 py-3 rounded-lg
              font-abhaya font-extrabold
              text-white bg-primary
              transition-all duration-300 ease-out
              hover:-translate-y-1.5
              hover:shadow-[0_15px_35px_rgba(255,92,11,0.45)]
            "
          >

            {/* Glow sweep */}
            <span
              className="
                pointer-events-none
                absolute -left-40 top-0 h-full w-40
                bg-gradient-to-r from-transparent via-white/40 to-transparent
                skew-x-[-25deg]
                animate-[shine_3.5s_infinite]
              "
            />

            <span className="relative z-10 flex items-center gap-2">
              View other services
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </span>

          </button>

        </div>

        <style>
          {`
          @keyframes shine {
            0% { transform: translateX(-200%); }
            60% { transform: translateX(300%); }
            100% { transform: translateX(300%); }
          }
          `}
        </style>

      </div>
    </section>
  );
}

export default Services;