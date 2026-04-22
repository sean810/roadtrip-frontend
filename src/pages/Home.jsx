import { lazy, Suspense } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import ErrorBoundary from "../components/ErrorBoundary";


// Lazy loaded sections
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const TrustedBrands = lazy(() => import("../components/TrustedBrands"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <ErrorBoundary>

      <Suspense
        fallback={
          <div className="py-20 flex justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <WhyChooseUs />
        <TrustedBrands />
        <Testimonials />
        <Footer />
      </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Home;