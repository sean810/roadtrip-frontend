import { motion as Motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import roadtrip from "../assets/logos/roadtrip.png";

const ctaContainer = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.18,
    },
  },
};

const ctaItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const containerVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.18,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative mt-40"
    >

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[420px] bg-[radial-gradient(circle,rgba(5,192,225,0.22),transparent_70%)] blur-[90px] pointer-events-none"
      />

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Motion.div
          variants={ctaContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="
            relative group
            rounded-3xl
            px-10 py-12 md:px-16 md:py-16
            text-center
            backdrop-blur-xl
            border border-white/40
            shadow-[0_25px_50px_rgba(0,0,0,0.15)]
            transition-all duration-500
            hover:-translate-y-3
            hover:border-primary
            hover:shadow-[0_0_0_2px_rgba(255,92,11,0.2),0_25px_60px_-15px_rgba(255,92,11,0.45)]
            -mb-24
            overflow-hidden
          "
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.6) 45%, rgba(217,241,247,0.65) 100%)",
          }}
        >

          <div aria-hidden="true" className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-white/50 to-transparent" />
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_70%_20%,rgba(255,92,11,0.25),transparent_60%)]" />

          <Motion.h2
            id="footer-cta"
            variants={ctaItem}
            className="font-abhaya font-extrabold text-4xl md:text-5xl text-[#FF5C0B] mb-4 relative"
          >
            Ready for Your Next Journey?
          </Motion.h2>

          <Motion.p
            variants={ctaItem}
            className="max-w-2xl mx-auto font-abhaya text-lg md:text-xl text-[#171E67]/80 mb-10 relative"
          >
            Experience reliable travel across Kenya with RoadTrip.
            Reach out instantly through WhatsApp or give us a call to plan your journey.
          </Motion.p>

          <Motion.div
            variants={ctaItem}
            className="flex flex-col sm:flex-row justify-center gap-4 relative"
          >

            <a
              href="https://wa.me/254724273784"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact RoadTrip on WhatsApp"
              className="
                flex items-center justify-center gap-2
                px-8 py-3
                rounded-lg
                bg-primary text-white
                font-abhaya font-extrabold
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_15px_35px_rgba(255,92,11,0.45)]
                active:scale-95
              "
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>

            <a
              href="tel:+254724273784"
              aria-label="Call RoadTrip Travel Services"
              className="
                flex items-center justify-center gap-2
                px-8 py-3
                rounded-lg
                border border-[#171E67]/30
                text-[#171E67]
                font-abhaya font-extrabold
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-[#171E67] hover:text-white
                active:scale-95
              "
            >
              <Phone size={18} />
              Call Now (+254 724 273 784)
            </a>

          </Motion.div>

        </Motion.div>
      </div>

      {/* Footer Surface */}
      <div className="relative rounded-t-[60px] overflow-hidden bg-gradient-to-b from-[#d9f1f7] to-[#cfe8ef] shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #171E67 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5C0B]/40 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 pt-40 pb-14">

          <Motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >

            <nav aria-label="Footer navigation">
              <div className="grid md:grid-cols-3 gap-20 lg:gap-28 items-start justify-between mb-20">

                {/* Brand */}
                <Motion.div variants={childVariant}>
                  <img
                    src={roadtrip}
                    alt="RoadTrip Travel & Courier Services logo"
                    className="h-14 w-auto mb-6 transition-transform duration-300 hover:scale-[1.02] will-change-transform"
                  />

                  <p className="font-abhaya font-extrabold text-[15px] text-[#171E67] leading-relaxed opacity-90">
                    RoadTrip Travel & Courier Services delivers premium,
                    secure and reliable mobility solutions across Kenya.
                    From executive chauffeur services to flexible self-drive
                    and courier solutions, we ensure every journey is seamless,
                    safe and professionally managed.
                  </p>
                </Motion.div>

                {/* Services */}
                <Motion.div variants={childVariant} className="text-center">
                  <h4 className="font-abhaya font-extrabold text-xl text-[#FF5C0B] mb-5">
                    Services
                  </h4>

                  <ul className="space-y-3 font-abhaya font-extrabold text-[15px] text-[#171E67]">
                    {[
                      "Self-Drive Car Hire",
                      "Chauffeur Services",
                      "Lease Hire",
                      "Transfer Services",
                      "Courier Services",
                    ].map((service) => (
                      <li key={service} className="transition hover:text-[#FF5C0B]">
                        {service}
                      </li>
                    ))}
                  </ul>
                </Motion.div>

                {/* Contact */}
                <Motion.div variants={childVariant}>
                  <h4 className="font-abhaya font-extrabold text-xl text-[#FF5C0B] mb-5">
                    Contact Us
                  </h4>

                  <div className="space-y-5 font-abhaya font-extrabold text-[15px] text-[#171E67]">

                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-[#FF5C0B] mt-[2px]" />
                      <div>
                        <a href="tel:+254711273884">+254 711 273 884</a><br />
                        <a href="tel:+254724273784">+254 724 273 784</a><br />
                        <a href="tel:+254724740769">+254 724 740 769</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-[#FF5C0B]" />
                      <a href="mailto:roadtriptravel.courier@gmail.com">
                        roadtriptravel.courier@gmail.com
                      </a>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-[#FF5C0B] mt-[2px]" />
                      <span>Hurlingham, Nairobi Kenya</span>
                    </div>

                  </div>
                </Motion.div>

              </div>
            </nav>

            <Motion.div
              variants={childVariant}
              className="border-t border-[#171E67]/20 pt-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

                <p className="font-abhaya font-extrabold text-sm text-[#171E67] opacity-90">
                  © {new Date().getFullYear()} RoadTrip Travel & Courier Services. All rights reserved.
                </p>

                <div className="flex gap-6 font-abhaya font-extrabold text-sm text-[#171E67]">
                  <span className="cursor-pointer transition hover:text-[#FF5C0B]">
                    Privacy Policy
                  </span>

                  <span className="cursor-pointer transition hover:text-[#FF5C0B]">
                    Terms of Service
                  </span>
                </div>

              </div>
            </Motion.div>

          </Motion.div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;

