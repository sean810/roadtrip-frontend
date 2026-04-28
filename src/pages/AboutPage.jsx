import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";

import aboutImg from "../assets/images/about.jpg";
import heroImg from "../assets/images/hero-about.jpg";
import nairobiImg from "../assets/images/nairobi.jpg";

/* ================= PAGE SETUP ================= */
function usePageSetup() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return loaded;
}

/* ================= REVEAL ================= */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return [ref, visible];
}

/* ================= PAGE ================= */
function AboutPage() {
  const loaded = usePageSetup();

  const [ref2, visible2] = useReveal(200);
  const [ref3, visible3] = useReveal(200);

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src={heroImg}
          alt="About Roadtrip"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-3xl px-6 text-white">
          <span className="inline-block px-4 py-1 mb-6 rounded-full bg-purple-500 text-white text-sm font-bold">
            About Roadtrip
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-[#FF5C0B]">
              Reliable Travel Solutions
            </span>
            <br />
            Across Kenya
          </h1>

          <p className="mt-6 text-lg opacity-90">
            RoadTrip is a trusted transportation partner dedicated to delivering
            reliable, comfortable, and professional travel solutions across Kenya.
          </p>
        </div>
      </section>

      {/* ================= FLOATING STATS ================= */}
      <div className="relative z-20 -mt-20 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] py-8 px-10 flex flex-col md:flex-row justify-between text-center gap-6">
          <div>
            <h3 className="text-3xl font-extrabold text-indigo-500">500+</h3>
            <p className="text-[#FF5C0B] font-semibold text-sm">
              Happy Clients
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-indigo-500">10K+</h3>
            <p className="text-[#FF5C0B] font-semibold text-sm">
              Trips Completed
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-extrabold text-indigo-500">24/7</h3>
            <p className="text-[#FF5C0B] font-semibold text-sm">
              Customer Support
            </p>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <section className="bg-skybg py-28 px-6">
        <div
          ref={ref2}
          className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            visible2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <img
              src={aboutImg}
              alt="Who we are"
              className="w-full h-[360px] object-cover"
            />
          </div>

          <div>
            <span className="text-indigo-500 font-semibold">
              Who We Are
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#FF5C0B] mt-3 mb-6">
              Your Trusted Travel Partner
            </h2>

            <p className="text-[#171E67] leading-relaxed mb-8">
              We are a corporate travel company and we offer quality and
              professional transport services, ranging from long term car hire
              to short term hire, chauffeur driven hire, as well as courier
              services. Our vehicles are clean and well maintained and all our
              drivers are fully qualified.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Clean Vehicles",
                "Qualified Drivers",
                "Professional Service",
                "Flexible Options",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg"
                >
                  <span className="text-orange-500">✔</span>
                  <span className="text-sm text-[#171E67] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3 ================= */}
      <section className="bg-skybg py-24 px-6 text-center">
        <div
          ref={ref3}
          className={`max-w-6xl mx-auto transition-all duration-700 ${
            visible3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#FF5C0B] mb-4">
            Our Direction
          </h2>

          <p className="text-[#171E67] mb-12 max-w-xl mx-auto">
            Driven by purpose and guided by vision, we strive to deliver excellence in every journey.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-40" />
              <div className="relative bg-white rounded-2xl p-8 text-left shadow-xl">
                <h3 className="text-xl font-extrabold text-[#FF5C0B] mb-3">
                  Company Mission
                </h3>
                <p className="text-[#171E67] text-sm">
                  Our mission is to see all our clients happy and satisfied with excellent services.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-40" />
              <div className="relative bg-white rounded-2xl p-8 text-left shadow-xl">
                <h3 className="text-xl font-extrabold text-[#FF5C0B] mb-3">
                  Company Vision
                </h3>
                <p className="text-[#171E67] text-sm">
                  To be the most preferred travel company delivering reliable services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4 ================= */}
      <section className="bg-skybg py-32 px-6 text-center">
        <h2 className="text-4xl font-extrabold text-[#FF5C0B] mb-6">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            "Responsibility",
            "Professionalism",
            "Team Work",
            "Integrity",
            "Dedication",
            "Safety",
          ].map((val, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-2 transition"
            >
              <h4 className="font-bold text-[#FF5C0B] mb-2">{val}</h4>
              <p className="text-sm text-[#171E67]">
                We uphold {val.toLowerCase()} in everything we do.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 5 ================= */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src={nairobiImg}
          alt="Nairobi"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white px-6">
          <h2 className="text-4xl font-extrabold">
            Ready to Experience Excellence?
          </h2>

          <p className="mt-4">
            Join hundreds of satisfied clients who trust RoadTrip
          </p>

          <button className="mt-6 px-8 py-4 bg-[#FF5C0B] rounded-full font-bold hover:-translate-y-1 transition">
            Get Started Today
          </button>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;