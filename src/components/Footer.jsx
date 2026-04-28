// Footer.jsx
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import roadtrip from "../assets/logos/roadtrip.png";

/* Reveal hook (matches the rest of the site) */
function useReveal(threshold = 0.15, { once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}

const services = [
  "Self-Drive Car Hire",
  "Chauffeur Services",
  "Lease Hire",
  "Transfer Services",
  "Courier Services",
];

const phones = ["+254 711 273 884", "+254 724 273 784", "+254 724 740 769"];

const Footer = () => {
  const ctaCardRef = useRef(null);
  const [ctaRef, ctaVisible] = useReveal(0.15);
  const [footerRef, footerVisible] = useReveal(0.1);

  const handleMove = (e) => {
    const el = ctaCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-skybg">
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-24 w-[520px] h-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,92,11,0.20), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)" }}
      />

      {/* CTA */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div
          ref={ctaRef}
          className={`transition-all duration-[900ms] will-change-[opacity,transform,filter] ${
            ctaVisible
              ? "opacity-100 translate-y-0 blur-0 scale-100"
              : "opacity-0 translate-y-10 blur-sm scale-[0.97]"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div
            ref={ctaCardRef}
            onMouseMove={handleMove}
            className="
              group relative overflow-hidden rounded-3xl border
              p-10 md:p-14 text-center
              transition-all duration-500
              hover:-translate-y-1
            "
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderColor: "rgba(255,255,255,0.6)",
              boxShadow: "0 8px 32px rgba(23,30,103,0.08)",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 32px 70px rgba(23,30,103,0.18), 0 0 0 1px rgba(255,92,11,0.2)";
              e.currentTarget.style.borderColor = "rgba(255,92,11,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(23,30,103,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
            }}
          >
            {/* Top sheen */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
              }}
            />
            {/* Mouse-tracked glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,92,11,0.14), transparent 55%)",
              }}
            />
            {/* Diagonal shine */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <span
                className="absolute top-0 -left-[120%] w-[55%] h-full transition-all duration-[900ms] group-hover:left-[140%]"
                style={{
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent)",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            {/* Accent line */}
            <div
              className="relative mx-auto w-10 h-[2px] rounded-full mb-6 opacity-80 transition-all duration-500 group-hover:w-16"
              style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
            />

            <h3
              className="relative font-abhaya font-extrabold leading-[1.05] mb-4"
              style={{
                fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
                background: "linear-gradient(135deg, #FF5C0B 30%, #f97316 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ready for Your Next Journey?
            </h3>

            <p className="relative max-w-2xl mx-auto font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67]/85 leading-relaxed mb-8">
              Experience reliable travel across Kenya with RoadTrip. Reach out
              instantly through WhatsApp or give us a call to plan your journey.
            </p>

            <div className="relative flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/254724273784"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/btn inline-flex items-center gap-2 px-7 py-3 rounded-full
                  font-abhaya font-extrabold text-white text-[16px]
                  transition-all duration-300 hover:-translate-y-0.5
                "
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  boxShadow: "0 10px 24px rgba(34,197,94,0.35)",
                }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>

              <a
                href="tel:+254724273784"
                className="
                  group/btn inline-flex items-center gap-2 px-7 py-3 rounded-full
                  font-abhaya font-extrabold text-white text-[16px]
                  transition-all duration-300 hover:-translate-y-0.5
                "
                style={{
                  background: "linear-gradient(135deg, #FF5C0B, #f97316)",
                  boxShadow: "0 10px 24px rgba(255,92,11,0.35)",
                }}
              >
                <Phone className="w-5 h-5" />
                Call Now (+254 724 273 784)
              </a>
            </div>

            {/* Bottom accent bar */}
            <div
              className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-700 ease-out group-hover:w-full"
              style={{
                background: "linear-gradient(90deg, #FF5C0B, #f97316)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer Surface */}
      <div
        ref={footerRef}
        className={`relative transition-all duration-[900ms] ${
          footerVisible
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 translate-y-8 blur-sm"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(23,30,103,0.02) 0%, rgba(23,30,103,0.06) 100%)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <img
                src={roadtrip}
                alt="RoadTrip Travel & Courier Services"
                className="h-14 w-auto mb-5"
              />
              <p className="font-abhaya font-extrabold text-[16px] md:text-[17px] text-[#171E67]/85 leading-relaxed">
                RoadTrip Travel & Courier Services delivers premium, secure and
                reliable mobility solutions across Kenya. From executive
                chauffeur services to flexible self-drive and courier solutions,
                we ensure every journey is seamless, safe and professionally
                managed.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4
                className="font-abhaya font-extrabold mb-5 text-[22px]"
                style={{
                  background: "linear-gradient(135deg, #FF5C0B, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Services
              </h4>
              <div
                className="w-8 h-[2px] rounded-full mb-5 opacity-80"
                style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
              />
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="
                        group inline-flex items-center gap-2
                        font-abhaya font-extrabold text-[16px] text-[#171E67]/80
                        transition-all duration-300
                        hover:text-[#FF5C0B] hover:translate-x-1
                      "
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-4"
                        style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
                      />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-abhaya font-extrabold mb-5 text-[22px]"
                style={{
                  background: "linear-gradient(135deg, #FF5C0B, #f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Contact Us
              </h4>
              <div
                className="w-8 h-[2px] rounded-full mb-5 opacity-80"
                style={{ background: "linear-gradient(90deg, #FF5C0B, #f97316)" }}
              />

              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <span
                    className="
                      mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl shrink-0
                      transition-all duration-500
                      group-hover:scale-110 group-hover:-rotate-6
                    "
                    style={{
                      background: "linear-gradient(135deg, #FFF6EE, #FFE5D2)",
                      boxShadow: "0 6px 16px rgba(255,92,11,0.18)",
                    }}
                  >
                    <Phone className="w-4 h-4 text-[#FF5C0B]" />
                  </span>
                  <div className="font-abhaya font-extrabold text-[16px] text-[#171E67]/85 leading-relaxed">
                    {phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s+/g, "")}`}
                        className="block transition-colors duration-300 hover:text-[#FF5C0B]"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </li>

                <li className="flex items-start gap-3 group">
                  <span
                    className="
                      mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl shrink-0
                      transition-all duration-500
                      group-hover:scale-110 group-hover:-rotate-6
                    "
                    style={{
                      background: "linear-gradient(135deg, #FFF6EE, #FFE5D2)",
                      boxShadow: "0 6px 16px rgba(255,92,11,0.18)",
                    }}
                  >
                    <Mail className="w-4 h-4 text-[#FF5C0B]" />
                  </span>
                  <a
                    href="mailto:roadtriptravel.courier@gmail.com"
                    className="font-abhaya font-extrabold text-[16px] text-[#171E67]/85 leading-relaxed transition-colors duration-300 hover:text-[#FF5C0B] break-all"
                  >
                    roadtriptravel.courier@gmail.com
                  </a>
                </li>

                <li className="flex items-start gap-3 group">
                  <span
                    className="
                      mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl shrink-0
                      transition-all duration-500
                      group-hover:scale-110 group-hover:-rotate-6
                    "
                    style={{
                      background: "linear-gradient(135deg, #FFF6EE, #FFE5D2)",
                      boxShadow: "0 6px 16px rgba(255,92,11,0.18)",
                    }}
                  >
                    <MapPin className="w-4 h-4 text-[#FF5C0B]" />
                  </span>
                  <span className="font-abhaya font-extrabold text-[16px] text-[#171E67]/85 leading-relaxed">
                    Hurlingham, Nairobi Kenya
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div
            className="my-10 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(23,30,103,0.18), transparent)",
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-abhaya font-extrabold text-[14px] text-[#171E67]/70 text-center md:text-left">
              © {new Date().getFullYear()} RoadTrip Travel & Courier Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="font-abhaya font-extrabold text-[14px] text-[#171E67]/70 transition-colors duration-300 hover:text-[#FF5C0B]"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-abhaya font-extrabold text-[14px] text-[#171E67]/70 transition-colors duration-300 hover:text-[#FF5C0B]"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
