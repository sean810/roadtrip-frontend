import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import WhyChooseUs from "./components/WhyChooseUs";
import TrustedBrands from "./components/TrustedBrands";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";



function App() {
  return (
    <div className="min-h-screen bg-page font-body">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <TrustedBrands />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App
