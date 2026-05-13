import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import App from "./App";
import "./index.css";

const lenis = new Lenis({
  duration: 1.1,
  smooth: true,
  smoothTouch: false,
});

// ✅ expose globally
window.lenis = lenis;

// ✅ FORCE Lenis to emit scroll updates
lenis.on("scroll", () => {
  // This ensures scroll events propagate properly
});

// Animation frame loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);