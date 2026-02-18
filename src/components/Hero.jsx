import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/videos/hero-sequence.mp4";

function Hero() {
  const [loaded, setLoaded] = useState(false); // text animation
  const [videoLoaded, setVideoLoaded] = useState(false); // video fade
  const videoRef = useRef(null);

  // Text animation (your original logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Detect when video is ready
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleLoaded = () => setVideoLoaded(true);
      video.addEventListener("loadeddata", handleLoaded);

      return () => video.removeEventListener("loadeddata", handleLoaded);
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover brightness-110 contrast-110 transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-secondary/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div>

          {/* Heading */}
          <h1
            className={`
              font-abhaya font-extrabold
              text-6xl md:text-7xl leading-tight
              text-white max-w-2xl
              transition-all duration-[1400ms] ease-out
              ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            Where Every Trip{" "}
            <span className="text-primary text-glow-orange">
              Fits You
            </span>
          </h1>

          {/* Paragraph */}
          <p
            className={`
              mt-6 max-w-lg
              font-abhaya font-extrabold
              text-lg md:text-xl text-white/90
              transition-all duration-[1400ms] delay-200 ease-out
              ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            Quality rides, professional drivers, seamless travel across
            Nairobi and beyond.
          </p>

          {/* Buttons */}
          <div
            className={`
              mt-10 flex gap-5
              transition-all duration-[1400ms] delay-400 ease-out
              ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
          >
            <button className="
              bg-primary text-white
              px-7 py-3.5 rounded-md
              font-abhaya font-extrabold
              transition hover:opacity-90
            ">
              Book Now
            </button>

            <button className="
              border border-white text-white
              px-7 py-3.5 rounded-md
              font-abhaya font-extrabold
              transition
              hover:bg-white hover:text-[#171E67]
            ">
              View Fleet
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;
