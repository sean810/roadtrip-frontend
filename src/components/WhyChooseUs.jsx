import { useEffect, useRef, useState } from "react";
import WhyChooseItem from "./WhyChooseItem";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -80px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-skybg">
      <div className="max-w-4xl mx-auto px-6">

        <div
          className={`
            transition-all duration-700 ease-out will-change-transform
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillWhyBg text-pillWhyText">
            Why choose us
          </span>

          <h2 className="text-5xl md:text-6xl font-abhaya font-extrabold text-[#FF5C0B] mb-4">
            Why Choose RoadTrip?
          </h2>

          <p className="font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67] leading-relaxed mb-14">
            Dependable transport services built on trust, care, and consistency.
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "Trusted Performance",
              description:
                "Carefully maintained vehicles and punctual service.",
            },
            {
              title: "Experienced Professionals",
              description:
                "Trained and vetted drivers across Kenya.",
            },
            {
              title: "Tailored Travel Options",
              description:
                "Flexible packages that fit your needs.",
            },
            {
              title: "Always Here for You",
              description:
                "Support team ready anytime.",
            },
          ].map((item, index) => (
            <WhyChooseItem
              key={item.title}
              {...item}
              visible={visible}
              delay={index * 180}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;