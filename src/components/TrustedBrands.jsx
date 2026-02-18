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

// Import your custom icons
import SecureIcon from "../assets/icons/secure.png";
import AwardIcon from "../assets/icons/award.png";
import TrustIcon from "../assets/icons/trust.png";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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

// animation preset
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const values = [
  {
    Icon: SecureIcon,
    title: "Reliable & Secure Services",
    text:
      "Our operations are licensed, insured, and supported by strict driver screening to ensure safety, security, and professionalism at all times.",
  },
  {
    Icon: AwardIcon,
    title: "Recognized for Excellence",
    text:
      "Known for our strong customer support, smooth service experience, and commitment to maintaining the highest standards.",
  },
  {
    Icon: TrustIcon,
    title: "Proven Reliability",
    text:
      "A solid history of partnering with major clients and consistently meeting expectations through reliable, well-coordinated transport services.",
  },
];

const TrustedBrands = () => {
  return (
    <section className="w-full py-24 bg-skybg">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Pill */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-green-100 text-green-700"
        >
          Trusted Partners
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-abhaya font-extrabold text-[#FF5C0B] mb-4"
        >
          Trusted by Top Brands
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl mx-auto font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67] leading-relaxed mb-14"
        >
          We're proud to support leading businesses and organizations across
          Kenya with dependable transport solutions that consistently deliver
          value and confidence.
        </motion.p>

        {/* Logos marquee */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden mb-20"
        >
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-skybg to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-skybg to-transparent z-10" />

          <div className="flex w-max gap-6 sm:gap-12 animate-marquee pause-on-hover items-center">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="
                  group flex items-center justify-center
                  h-16 sm:h-24 w-28 sm:w-44
                  bg-white/70 backdrop-blur-sm
                  rounded-xl
                  border border-gray-200
                  shadow-sm
                  transition-all duration-300
                  hover:bg-white
                  hover:shadow-[0_0_0_3px_rgba(255,153,0,0.15)]
                  hover:ring-2 hover:ring-primary/40
                  touch-none sm:touch-auto
                "
              >
                <img
                  src={logo}
                  alt="Brand logo"
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
        </motion.div>

        {/* Value highlights */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid md:grid-cols-3 gap-12"
        >
          {values.map((value, index) => {
            const { Icon, title, text } = value;
            return (
              <motion.div key={index} variants={fadeUp} className="flex flex-col items-center text-center">
                <img src={Icon} alt={`${title} icon`} className="w-11 h-11 mb-4" />
                <h4 className="font-abhaya font-extrabold text-[22px] md:text-[23px] text-[#FF5C0B] mb-2">
                  {title}
                </h4>
                <p className="font-abhaya font-extrabold text-[16px] md:text-[17px] text-[#171E67] leading-relaxed">
                  {text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default TrustedBrands;