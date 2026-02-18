import { motion as Motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import roadtrip from "../assets/logos/roadtrip.png";

const containerVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1], // premium smooth easing
      staggerChildren: 0.2,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Footer = () => {
  return (
    <footer className="bg-[#d9f1f7] pt-24 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-6">

        <Motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >

          {/* Top Grid */}
          <div className="grid md:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <Motion.div variants={childVariant}>
              <img
                src={roadtrip}
                alt="RoadTrip Travel & Courier Services"
                className="h-14 w-auto mb-6"
              />

              <p className="font-abhaya font-extrabold text-[15px] text-[#171E67] leading-relaxed">
                RoadTrip Travel & Courier Services delivers premium,
                secure and reliable mobility solutions across Kenya.
                From executive chauffeur services to flexible self-drive
                and courier solutions, we ensure every journey is seamless,
                safe and professionally managed.
              </p>
            </Motion.div>

            {/* Quick Links */}
            <Motion.div variants={childVariant}>
              <h4 className="font-abhaya font-extrabold text-xl text-[#FF5C0B] mb-4">
                Quick Links
              </h4>

              <ul className="space-y-3 font-abhaya font-extrabold text-[15px] text-[#171E67]">
                {["Home", "About Us", "Fleet", "Services", "Clients", "Contact"].map(
                  (item) => (
                    <li
                      key={item}
                      className="hover:text-[#FF5C0B] transition cursor-pointer"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </Motion.div>

            {/* Services */}
            <Motion.div variants={childVariant}>
              <h4 className="font-abhaya font-extrabold text-xl text-[#FF5C0B] mb-4">
                Services
              </h4>

              <ul className="space-y-3 font-abhaya font-extrabold text-[15px] text-[#171E67]">
                <li className="hover:text-[#FF5C0B] transition cursor-pointer">
                  Self-Drive Car Hire
                </li>
                <li className="hover:text-[#FF5C0B] transition cursor-pointer">
                  Chauffeur Services
                </li>
                <li className="hover:text-[#FF5C0B] transition cursor-pointer">
                  Lease Hire
                </li>
                <li className="hover:text-[#FF5C0B] transition cursor-pointer">
                  Transfer Services
                </li>
                <li className="hover:text-[#FF5C0B] transition cursor-pointer">
                  Courier Services
                </li>
              </ul>
            </Motion.div>

            {/* Contact */}
            <Motion.div variants={childVariant}>
              <h4 className="font-abhaya font-extrabold text-xl text-[#FF5C0B] mb-4">
                Contact Us
              </h4>

              <div className="space-y-4 font-abhaya font-extrabold text-[15px] text-[#171E67]">

                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#FF5C0B]" />
                  <div>
                    <div>+254 711 273 884</div>
                    <div>+254 724 273 784</div>
                    <div>+254 724 740 769</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#FF5C0B]" />
                  <span>roadtriptravel.courier@gmail.com</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FF5C0B] mt-1" />
                  <span>Hurlingham, Nairobi Kenya</span>
                </div>
              </div>

              <a
                href="https://wa.me/254724273784"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6 inline-block
                  bg-[#FF5C0B] text-white
                  px-6 py-3 rounded-lg
                  font-abhaya font-extrabold
                  transition duration-300
                  hover:scale-105
                  shadow-[0_0_0px_0px_rgba(255,92,11,0.6)]
                  animate-[glow_2.5s_ease-in-out_infinite]
                "
              >
                WhatsApp Us
              </a>
            </Motion.div>

          </div>

          {/* Bottom Bar */}
          <Motion.div
            variants={childVariant}
            className="border-t border-[#171E67]/20 pt-8 mt-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

              <p className="font-abhaya font-extrabold text-sm text-[#171E67]">
                © {new Date().getFullYear()} RoadTrip Travel & Courier Services. All rights reserved.
              </p>

              <div className="flex gap-6 font-abhaya font-extrabold text-sm text-[#171E67]">
                <span className="hover:text-[#FF5C0B] transition cursor-pointer">
                  Privacy Policy
                </span>
                <span className="hover:text-[#FF5C0B] transition cursor-pointer">
                  Terms of Service
                </span>
              </div>

            </div>
          </Motion.div>

        </Motion.div>

      </div>

      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 0px rgba(255,92,11,0.4); }
            50% { box-shadow: 0 0 18px rgba(255,92,11,0.7); }
            100% { box-shadow: 0 0 0px rgba(255,92,11,0.4); }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
