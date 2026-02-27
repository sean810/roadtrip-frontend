import TestimonialCard from "./TestimonialCard";
import { motion as Motion } from "framer-motion";

import brian from "../assets/pfps/brian.png";
import corporate from "../assets/pfps/corporate.png";
import james from "../assets/pfps/james.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full py-24 bg-skybg">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="will-change-transform"
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillTestimonialBg text-primary">
            Testimonials
          </span>

          <h2 className="text-5xl md:text-6xl font-abhaya font-extrabold text-primary mb-4">
            Hear From Our Clients
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl font-abhaya font-extrabold mb-16 text-[#171E67]">
            Discover why individuals and organizations continue to choose RoadTrip.
          </p>
        </Motion.div>

        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[ 
            {
              quote: "From booking to drop-off, the experience was seamless.",
              name: "Brian M.",
              pfp: brian,
            },
            {
              quote: "Reliable transport for meetings and events.",
              name: "Corporate Client",
              pfp: corporate,
            },
            {
              quote: "Airport transfers were effortless and professional.",
              name: "James K., Nairobi",
              pfp: james,
            },
          ].map((item) => (
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