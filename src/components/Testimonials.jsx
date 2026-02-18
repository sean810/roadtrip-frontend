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
    <section className="w-full py-24 bg-skybg">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Pill */}
        <Motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillTestimonialBg text-primary"
        >
          Testimonials
        </Motion.span>

        {/* Heading */}
        <Motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-6xl font-abhaya font-extrabold text-primary mb-4"
        >
          Hear From Our Clients
        </Motion.h2>

        {/* Subheading */}
        <Motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-lg md:text-xl font-abhaya font-extrabold mb-16 text-[#171E67]"
        >
          Discover why individuals and organizations continue to choose
          RoadTrip for exceptional transport experiences.
        </Motion.p>

        {/* Cards with stagger animation */}
        <Motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  }}
  className="grid md:grid-cols-3 gap-8"
>

          <Motion.div variants={fadeUp}>
            <TestimonialCard
              quote="From booking to drop-off, the experience was seamless. Everything was well organized and handled professionally."
              name="Brian M."
              pfp={brian}
            />
          </Motion.div>

          <Motion.div variants={fadeUp}>
            <TestimonialCard
              quote="Our team needed reliable transport for meetings and events, and the service delivered every single time."
              name="Corporate Client"
              pfp={corporate}
            />
          </Motion.div>

          <Motion.div variants={fadeUp}>
            <TestimonialCard
              quote="RoadTrip made my airport transfers effortless. The car was clean, the driver was on time, and the entire experience felt smooth and professional."
              name="James K., Nairobi"
              pfp={james}
            />
          </Motion.div>
        </Motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
