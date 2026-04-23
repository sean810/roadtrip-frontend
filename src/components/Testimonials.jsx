import TestimonialCard from "./TestimonialCard";
import { motion as Motion } from "framer-motion";

import brian from "../assets/pfps/brian.png";
import corporate from "../assets/pfps/corporate.png";
import james from "../assets/pfps/james.png";

// Moved outside component — stable reference, no re-creation on render
const testimonials = [
  {
    quote:
      "From booking to drop-off, the experience was seamless. Everything was well organized and handled professionally.",
    name: "Brian M.",
    pfp: brian,
  },
  {
    quote:
      "Our team needed reliable transport for meetings and events, and the service delivered every single time.",
    name: "Corporate Client",
    pfp: corporate,
  },
  {
    quote:
      "RoadTrip made my airport transfers effortless. The car was clean, the driver was on time, and the entire experience felt smooth and professional.",
    name: "James K., Nairobi",
    pfp: james,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full py-24 bg-skybg"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Header */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillTestimonialBg text-primary">
            Testimonials
          </span>

          <h2
            id="testimonials-heading"
            className="text-5xl md:text-6xl font-abhaya font-extrabold text-primary mb-4"
          >
            Hear From Our Clients
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl font-abhaya font-extrabold mb-16 text-[#171E67]">
            Discover why individuals and organizations continue to choose
            RoadTrip for exceptional transport experiences.
          </p>
        </Motion.div>

        {/* Cards */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((item) => (
            <Motion.div key={item.name} variants={fadeUp}>
              <TestimonialCard {...item} />
            </Motion.div>
          ))}
        </Motion.div>

      </div>
    </section>
  );
};

export default Testimonials;