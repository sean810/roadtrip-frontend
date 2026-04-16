import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/videos/hero-sequence.mp4";

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Cinematic entrance delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Pause video when not visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setVideoLoaded(true);
    video.addEventListener("loadeddata", handleLoaded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-[100svh] overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />

      {/* Base Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Cinematic Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(5,192,225,0.25),transparent_60%)]" />

      {/* Top & Bottom Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="relative max-w-3xl">

          {/* Soft Spotlight Behind Text */}
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />

          {/* Heading */}
          <h1
            className={`
              relative
              font-abhaya font-extrabold
              text-6xl md:text-7xl leading-tight
              text-white
              transition-all duration-[1400ms]
              ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Where Every Trip{" "}
            <span className="text-primary drop-shadow-[0_0_35px_rgba(255,92,11,0.85)]">
              Fits You
            </span>
          </h1>

          {/* Paragraph */}
          <p
            className={`
              mt-6 text-lg md:text-xl
              text-white/85
              font-abhaya font-medium
              transition-all duration-[1400ms] delay-200
              ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Quality rides, professional drivers, seamless travel across
            Nairobi and beyond.
          </p>

          {/* Buttons */}
          <div
            className={`
              mt-10 flex gap-6
              transition-all duration-[1400ms] delay-400
              ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Primary */}
            <button
              className="
                relative
                px-8 py-4
                rounded-lg
                font-abhaya font-extrabold
                text-white
                bg-primary
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(255,92,11,0.6)]
                active:scale-95
              "
            >
              Book Now
            </button>

            {/* Secondary */}
            <button
              className="
                px-8 py-4
                rounded-lg
                font-abhaya font-extrabold
                text-white
                border border-white/40
                backdrop-blur-sm
                bg-white/5
                transition-all duration-500
                hover:-translate-y-1
                hover:bg-white hover:text-[#171E67]
                active:scale-95
              "
            >
              View Services
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;