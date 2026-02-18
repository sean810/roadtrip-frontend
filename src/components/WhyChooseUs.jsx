import { useEffect, useRef, useState } from "react";
import WhyChooseItem from "./WhyChooseItem";

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-skybg">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div
          className={`
            transition-all duration-[900ms] ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <span className="inline-block px-4 py-1 mb-6 text-sm rounded-full bg-pillWhyBg text-pillWhyText">
            Why choose us
          </span>

          <h2 className="text-5xl md:text-6xl font-abhaya font-extrabold text-[#FF5C0B] mb-4">
  Why Choose RoadTrip?
</h2>


          <p className="font-abhaya font-extrabold text-[17px] md:text-[18px] text-[#171E67] leading-relaxed mb-14">
  For years, RoadTrip has supported travelers and businesses across Kenya with
  dependable transport services built on trust, care, and consistency. We provide:
</p>

        </div>

        {/* Items */}
        <div className="space-y-8">
          {[
            {
              title: "Trusted Performance",
              description:
                "Our vehicles are carefully maintained, our services run on schedule, and our team is committed to keeping your journey smooth from start to finish.",
            },
            {
              title: "Experienced Professionals",
              description:
                "Every driver is trained, vetted, and equipped with the local experience needed to ensure safe, comfortable travel anywhere in Kenya.",
            },
            {
              title: "Tailored Travel Options",
              description:
                "Whether you're planning a solo trip or organizing transport for your team, we craft flexible packages that fit your needs perfectly.",
            },
            {
              title: "Always Here for You",
              description:
                "Day or night, our support team is ready to assist with inquiries, emergencies, or last-minute changes.",
            },
          ].map((item, index) => (
            <WhyChooseItem
              key={item.title}
              {...item}
              visible={visible}
              delay={index * 200}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
