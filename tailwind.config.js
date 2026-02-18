/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abhaya: ["'Abhaya Libre'", "serif"],
        body: ["Inter", "sans-serif"],
      },
      textShadow: {
        glowOrange: `
          0 0 12px rgba(255, 124, 0, 0.6),
          0 0 28px rgba(255, 124, 0, 0.45),
          0 0 60px rgba(255, 124, 0, 0.25)
        `,
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      backgroundImage: {
        page:
          "linear-gradient(to bottom, #D9F1F7 25%, #D9F1F7 19%, #D9F1F7 56%, #D9F1F7 82%, #D9F1F7 98%)", 
      },
      colors: {
        primary: "#FF5C0B",
        heading: "#171E67",
        body: "#707499",
        page: "#BFD8F9",
        soft: "#E9F1FF",

        pillServicesBg: "#C8FFE0",
        pillServicesText: "#05C0E1",

        pillWhyBg: "#e7c5f0",
        pillWhyText: "#D454F4",

        pillTestimonialBg: "#eeb1b1",
        pillTestimonialText: "#ff0000",

        accentBlue: "#05C0E1",
        success: "#0DBD58",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-glow-orange": {
          textShadow: `
            0 0 12px rgba(255, 124, 0, 0.6),
            0 0 28px rgba(255, 124, 0, 0.45),
            0 0 60px rgba(255, 124, 0, 0.25)
          `,
        },
      });
    },
  ],
};
