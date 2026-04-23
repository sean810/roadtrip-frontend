import citizen from "../assets/logos/citizen.png";
import alfajiri from "../assets/logos/alfajiri.png";
import amicus from "../assets/logos/amicus.png";
import avu from "../assets/logos/avu.png";
import azali from "../assets/logos/azali.png";
import excelsior from "../assets/logos/excelsior.png";
import kivo from "../assets/logos/kivo.png";
import peacenet from "../assets/logos/peacenet.png";
import qcc from "../assets/logos/qcc.png";
import urf from "../assets/logos/urf.png";
import vka from "../assets/logos/vka.png";

import SecureIcon from "../assets/icons/secure.png";
import AwardIcon from "../assets/icons/award.png";
import TrustIcon from "../assets/icons/trust.png";

import { motion as Motion } from "framer-motion";

const logos = [
  citizen,
  excelsior,
  amicus,
  azali,
  alfajiri,
  kivo,
  avu,
  peacenet,
  qcc,
  urf,
  vka,
];

// Moved outside component — stable reference, no re-creation on render
const values = [
  {
    Icon: SecureIcon,
    title: "Reliable & Secure Services",
    text: "Our operations are licensed, insured, and supported by strict driver screening to ensure safety, security, and professionalism at all times.",
  },
  {
    Icon: AwardIcon,
    title: "Recognized for Excellence",
    text: "Known for our strong customer support, smooth service experience, and commitment to maintaining the highest standards.",
  },
  {
    Icon: TrustIcon,
    title: "Proven Reliability",
    text: "A solid history of partnering with major clients and consistently meeting expectations through reliable, well-coordinated transport services.",
  },
];

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

const TrustedBrands = () => {
  return (
    <section id="partners" className="w-full py-24 bg-skybg">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Header */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-green-100 text-green-700">
            Trusted Partners
          </span>

          <h2 className="text-5xl md:text-6xl font-abhaya font-extrabold text-[#FF5C0B] mb-4">
            Trusted by Top Brands
          </h2>

          <p className="max-w-2xl mx-auto font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67] leading-relaxed mb-14">
            We're proud to support leading businesses and organizations across
            Kenya with dependable transport solutions that consistently deliver
            value and confidence.
          </p>
        </Motion.div>

        {/* Marquee */}
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden mb-20"
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-skybg to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-skybg to-transparent z-10" />

          {/* The marquee strip — no will-change, the browser handles
              CSS animation compositing automatically */}
          <div className="flex w-max gap-6 sm:gap-12 animate-marquee pause-on-hover items-center">
            {[...logos, ...logos.slice(0, 6)].map((logo, index) => (
              <div
                key={index}
                className="
                  group flex items-center justify-center
                  h-16 sm:h-24 w-28 sm:w-44
                  bg-white/70 backdrop-blur-sm
                  rounded-xl
                  border border-gray-200
                  shadow-sm
                  transition-shadow duration-300
                  hover:bg-white
                  hover:shadow-md
                "
              >
                <img
                  src={logo}
                  alt="Brand logo"
                  loading="lazy"
                  decoding="async"
                  className="
                    h-12 sm:h-16 md:h-18 object-contain
                    opacity-40 grayscale
                    transition-all duration-300
                    group-hover:opacity-100
                    group-hover:grayscale-0
                  "
                />
              </div>
            ))}
          </div>
        </Motion.div>

        {/* Value Highlights */}
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map(({ Icon, title, text }, index) => (
            <Motion.div
              key={title}
              custom={index}
              variants={fadeUp}
            >
              <div
                className="
                  h-full rounded-2xl
                  border border-[rgba(23,30,103,0.12)] bg-white
                  shadow-[0_2px_12px_rgba(23,30,103,0.06)]
                  transition-shadow duration-300 ease-out
                  hover:shadow-[0_8px_32px_rgba(23,30,103,0.13)]
                  p-8 flex flex-col items-center text-center
                "
              >
                {/* Accent line */}
                <div className="w-8 h-[2px] bg-primary rounded-full mb-6 opacity-70" />

                {/* Icon */}
                <div className="mb-5 flex justify-center">
                  <img
                    src={Icon}
                    alt={title}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Title */}
                <h4 className="font-abhaya font-extrabold text-[22px] md:text-[23px] text-[#FF5C0B] mb-4">
                  {title}
                </h4>

                {/* Description */}
                <p className="font-abhaya font-extrabold text-[16px] md:text-[17px] text-[#171E67] leading-relaxed opacity-80 flex-grow">
                  {text}
                </p>
              </div>
            </Motion.div>
          ))}
        </Motion.div>

      </div>
    </section>
  );
};

export default TrustedBrands;