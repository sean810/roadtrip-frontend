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

    if (sectionRef.current) observer.observe(sectionRef.current);
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
        "Enjoy the freedom to travel your way with our curated fleet of top-tier, impeccably maintained vehicles. Perfect for executive trips, weekend getaways, and exploring Kenya in comfort and style.",
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
        "Skip the costs of buying and enjoy a long-term ride you can rely on. Our leasing plans make it easy for anyone to stay on the road comfortably and affordably.",
      points: [
        "A selection of reliable vehicles to choose from",
        "Flexible lease periods",
        "Insurance + maintenance included",
        "Help available anytime",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-28 bg-skybg">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div
          className={`
            flex flex-col items-center text-center max-w-4xl mx-auto
            transition-all duration-[900ms] ease-out
            ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillServicesBg text-pillServicesText">
            Popular Services
          </span>

          <h2 className="text-5xl md:text-6xl font-abhaya font-extrabold text-primary">
            Your All-In-One Transport Partner
          </h2>

          <p className="mt-6 max-w-3xl text-lg md:text-xl font-abhaya font-extrabold text-[#171E67]">
            Whether you prefer driving yourself or riding with a professional,
            we provide flexible transport solutions designed to fit your journey
            across Kenya.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={service.title}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Global CTA Button */}
<div className="mt-16 flex justify-center">
  <button
    className="
      group inline-flex items-center gap-2
      px-4 py-2.5
      rounded-full
      font-abhaya font-extrabold
      text-[15px] md:text-[16px]
      text-white
      bg-primary
      transition-all duration-300 ease-out

      hover:-translate-y-1
      hover:bg-[#ff6a1a]
      hover:shadow-[0_10px_25px_-5px_rgba(255,92,11,0.6)]
    "
  >
    View other services
    <ArrowRight
      size={16}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  </button>
</div>




      </div>
    </section>
  );
}

export default Services;
