import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import chauffeurImg from "../assets/images/chauffeur.jpg";
import selfDriveImg from "../assets/images/self-drive.jpg";
import leaseImg from "../assets/images/lease.jpg";
import { ArrowRight } from "lucide-react";

// Simplified fade — no y-axis shift reduces layout recalc cost
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

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

const Services = () => {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full py-28 bg-skybg scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          // Larger margin = animation fires earlier, before the element is
          // in the viewport, so there's no visible pop-in during scroll
          viewport={{ once: true, margin: "-60px" }}
          custom={0}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillServicesBg text-pillServicesText">
            Popular Services
          </span>

          <h2
            id="services-heading"
            className="text-5xl md:text-6xl font-abhaya font-extrabold text-primary"
          >
            Your All-In-One Transport Partner
          </h2>

          <p className="mt-6 max-w-3xl text-lg md:text-xl font-abhaya font-extrabold text-[#171E67]">
            Whether you prefer driving yourself or riding with a professional,
            we provide flexible transport solutions designed to fit your
            journey across Kenya.
          </p>
        </Motion.div>

        {/* Cards */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10"
          transition={{ staggerChildren: 0.08 }}
        >
          {services.map((service, index) => (
            <Motion.div
              key={service.title}
              variants={fadeUp}
              custom={index}
              // No will-change here — let the browser decide
            >
              <ServiceCard {...service} />
            </Motion.div>
          ))}
        </Motion.div>

        {/* CTA */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          custom={3}
          className="mt-16 flex flex-col items-center"
        >
          <div className="w-40 h-[2px] mb-10 bg-gradient-to-r from-transparent via-[#FF5C0B]/60 to-transparent" />

          <button
            onClick={() => navigate("/services")}
            aria-label="View additional transport services"
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
            <span
              className="
                pointer-events-none
                absolute -left-40 top-0 h-full w-40
                bg-gradient-to-r from-transparent via-white/40 to-transparent
                skew-x-[-25deg]
                animate-[shine_2s_infinite]
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
        </Motion.div>

        <style jsx>{`
          @keyframes shine {
            0% { transform: translateX(-200%); }
            60% { transform: translateX(300%); }
            100% { transform: translateX(300%); }
          }
        `}</style>

      </div>
    </section>
  );
};

export default Services;