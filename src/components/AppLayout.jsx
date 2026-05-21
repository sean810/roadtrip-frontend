import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * AppLayout: Wrapper that handles synchronized page transitions
 * - Ensures navbar and content load together
 * - Provides consistent 300ms transition timing for all pages
 * - Resets scroll position on route change
 * - Coordinates loading states between navbar and page content
 */
function AppLayout({ children }) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
  requestAnimationFrame(() => {
    setIsTransitioning(true);
  });

  window.scrollTo(0, 0);

  const timer = setTimeout(() => {
    setIsTransitioning(false);
  }, 300);

  return () => clearTimeout(timer);
}, [location.pathname]);
  return (
    <>
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 bg-primary text-white px-4 py-2 rounded-lg"
      >
        Skip to content
      </a>

      <Navbar />
      <main 
        id="main-content"
        className={`transition-opacity duration-300 ${
          isTransitioning ? "opacity-95" : "opacity-100"
        }`}
      >
        {children}
      </main>
    </>
  );
}

export default AppLayout;
