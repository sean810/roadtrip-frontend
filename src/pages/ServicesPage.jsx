import Navbar from "../components/Navbar";
import {
  Car,
  User,
  Plane,
  Package,
  Briefcase,
  Map,
} from "lucide-react";

import chauffeurImg from "../assets/images/Chauffeur1.jpg";
import selfDriveImg from "../assets/images/Self-drive1.jpg";
import airportImg from "../assets/images/airport.jpg";
import courierImg from "../assets/images/courier.jpg";
import leaseImg from "../assets/images/Lease1.jpg";
import safariImg from "../assets/images/safari.jpg";

/* ---------------- OVERVIEW CARD ---------------- */
function OverviewCard({ icon: Icon, title, description, href }) {

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white mb-4">
        <Icon size={20} />
      </div>

      <h4 className="font-abhaya font-extrabold text-[#171E67] text-lg mb-2">
        {title}
      </h4>

      <p className="text-sm text-[#171E67]/80 font-abhaya leading-relaxed">
        {description}
      </p>

      <a href={href} className="text-[#FF5C0B] text-sm font-abhaya font-extrabold mt-3 inline-flex items-center gap-1 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-200/50 transition-all duration-300 group">
        Learn more <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </a>

    </div>
  );
}

/* ---------------- PAGE ---------------- */
function ServicesPage() {
  const overview = [
    {
      icon: User,
      title: "Chauffeur Service",
      description: "Experience luxury and professionalism with our premium chauffeur service.",
      href: "#service-chauffeur",
    },
    {
      icon: Car,
      title: "Self-Drive",
      description: "Freedom at your fingertips with our extensive fleet.",
      href: "#service-selfdrive",
    },
    {
      icon: Plane,
      title: "Airport to Hotel Transfers",
      description: "Reliable and stress-free airport transport.",
      href: "#service-airport",
    },
    {
      icon: Package,
      title: "Package Delivery Services",
      description: "Fast, secure delivery across the city.",
      href: "#service-courier",
    },
    {
      icon: Briefcase,
      title: "Lease Hire Service",
      description: "Flexible long-term vehicle solutions.",
      href: "#service-lease",
    },
    {
      icon: Map,
      title: "Safari Tour Services",
      description: "Explore Kenya with guided experiences.",
      href: "#service-safari",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6fb] via-[#dff1f7] to-[#cfe8ef]">
      
      <Navbar />

      {/* HERO */}
      <div className="pt-32 pb-16 px-6 text-center relative">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(255,92,11,0.15),transparent_70%)] blur-[90px]" />

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block px-5 py-2 mb-6 text-sm rounded-full bg-[#c084fc]/30 text-[#6b21a8] font-abhaya font-extrabold">
            Premium Transport Solutions
          </span>

          <h1 className="text-5xl md:text-6xl font-abhaya font-extrabold text-[#FF5C0B]">
            Our Services
          </h1>

          <p className="mt-6 text-lg md:text-xl font-abhaya font-extrabold text-[#171E67] leading-relaxed">
            Comprehensive transport solutions tailored to your needs.
            Excellence in every journey.
          </p>

          <h3 className="mt-12 text-xl md:text-2xl font-abhaya font-extrabold text-[#FF5C0B]">
            Quick Overview
          </h3>
        </div>
      </div>

      {/* QUICK OVERVIEW */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {overview.map((item, index) => (
            <OverviewCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* ================= DETAILED SECTION ================= */}
      <section className="bg-skybg py-28 px-6">
        <div className="max-w-7xl mx-auto space-y-28">

          {/* TITLE */}
          <h2 className="text-center text-3xl md:text-4xl font-abhaya font-extrabold text-[#FF5C0B]">
            Detailed Service Information
          </h2>

          {/* ================= SERVICE 1 ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="service-chauffeur">

            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur opacity-30 group-hover:opacity-50 transition duration-500" />

              <img
                src={chauffeurImg}
                alt="Chauffeur Service"
                className="relative w-full h-[340px] md:h-[420px] object-cover rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
              />

              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                🚘
              </div>
            </div>

            <div>
              <span className="text-sm font-abhaya font-extrabold text-indigo-500">
                Service 1
              </span>

              <h3 className="text-3xl md:text-4xl font-abhaya font-extrabold text-[#FF5C0B] mt-2 mb-4">
                Chauffeur Service
              </h3>

              <p className="text-[#171E67] font-abhaya leading-relaxed mb-6">
                Experience luxury and professionalism with our premium chauffeur service.
              </p>

              <div className="bg-white/60 backdrop-blur-md rounded-xl p-5 mb-6 border border-white/40 shadow-sm">
                <h4 className="font-abhaya font-extrabold text-[#171E67] mb-2">
                  Why We Excel
                </h4>
                <p className="text-[#171E67]/80 text-sm">
                  We pride ourselves on maintaining a fleet of pristine luxury vehicles and employing only the most experienced, professionally certified drivers who understand the value of discretion and excellence.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-abhaya font-extrabold text-[#FF5C0B] mb-3">
                  What to Expect
                </h4>
                <ul className="space-y-2 text-[#171E67]">
                  <li className="flex gap-2"><span className="text-green-500">✔</span> Professional and courteous drivers</li>
                  <li className="flex gap-2"><span className="text-green-500">✔</span> 24/7 customer support and booking assistance</li>
                  <li className="flex gap-2"><span className="text-green-500">✔</span> Easy pickups, smooth drop-offs</li>
                </ul>
              </div>

              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-abhaya font-extrabold shadow-lg hover:-translate-y-1 transition">
                Book This Service →
              </button>
            </div>
          </div>

          {/* ================= SERVICE 2 ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="service-selfdrive">

            <div>
              <span className="text-sm font-abhaya font-extrabold text-indigo-500">
                Service 2
              </span>

              <h3 className="text-3xl md:text-4xl font-abhaya font-extrabold text-[#FF5C0B] mt-2 mb-4">
                Self-Drive
              </h3>

              <p className="text-[#171E67] font-abhaya leading-relaxed mb-6">
                Freedom at your fingertips. Choose from our extensive range of well-maintained vehicles and explore at your own pace. Perfect for those who prefer the independence of driving themselves.
              </p>

              <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 mb-6 border border-white/40 shadow-sm">
                <h4 className="font-abhaya font-extrabold text-[#171E67] mb-2">
                  Why We Excel 
                </h4>
                <p className="text-[#171E67]/80 text-sm leading-relaxed">
                  Our self-drive service stands out with comprehensive insurance coverage, 24/7 roadside assistance, and a diverse fleet ranging from economy to luxury vehicles, all regularly serviced and sanitized.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-abhaya font-extrabold text-[#FF5C0B] mb-3">
                  What to Expect
                </h4>
                <ul className="space-y-3 text-[#171E67]">
                  <li className="flex items-start gap-2">bv 
                    <span className="text-green-500">✔</span>
                    Flexible rental time that works around you
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Reliable cover for your journey
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Convenient delivery and collection
                  </li>
                </ul>
              </div>

              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-abhaya font-extrabold shadow-lg hover:-translate-y-1 transition">
                Book This Service →
              </button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-blue-500 blur opacity-30 group-hover:opacity-50 transition duration-500" />

              <img
                src={selfDriveImg}
                alt="Self Drive"
                className="relative w-full h-[340px] md:h-[420px] object-cover rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
              />

              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                🚗
              </div>
            </div>
          </div>

          {/* ================= SERVICE 3 ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="service-airport">

            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur opacity-30 group-hover:opacity-50 transition duration-500" />

              <img
                src={airportImg}
                alt="Airport Transfers"
                className="relative w-full h-[340px] md:h-[420px] object-cover rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
              />

              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                ✈️
              </div>
            </div>

            <div>
              <span className="text-sm font-abhaya font-extrabold text-indigo-500">
                Service 3
              </span>

              <h3 className="text-3xl md:text-4xl font-abhaya font-extrabold text-[#FF5C0B] mt-2 mb-4">
                Airport to Hotel Transfers
              </h3>

              <p className="text-[#171E67] font-abhaya leading-relaxed mb-6">
                Start or end your journey stress-free with our reliable airport transfer service.
                We monitor flight schedules and ensure timely pickups, making your transition smooth and comfortable.
              </p>

              <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 mb-6 border border-white/40 shadow-sm">
                <h4 className="font-abhaya font-extrabold text-[#171E67] mb-2">
                  Why We Excel
                </h4>
                <p className="text-[#171E67]/80 text-sm leading-relaxed">
                  With years of experience in airport logistics, we excel at navigating traffic patterns, terminal locations, and timing. Our drivers are familiar with all major hotels and can accommodate last-minute changes.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-abhaya font-extrabold text-[#FF5C0B] mb-3">
                  What to Expect
                </h4>
                <ul className="space-y-3 text-[#171E67]">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Direct rides
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Quick and easy pickup once you land
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Assistance with luggage handling
                  </li>
                </ul>
              </div>

              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-abhaya font-extrabold shadow-lg hover:-translate-y-1 transition">
                Book This Service →
              </button>
            </div>
          </div>

          {/* ================= SERVICE 4 ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="service-courier">

            <div>
              <span className="text-sm font-abhaya font-extrabold text-indigo-500">
                Service 4
              </span>

              <h3 className="text-3xl md:text-4xl font-abhaya font-extrabold text-[#FF5C0B] mt-2 mb-4">
                Package Delivery Services
              </h3>

              <p className="text-[#171E67] font-abhaya leading-relaxed mb-6">
                Fast, secure, and reliable package delivery across the city.
                Whether it's documents, parcels, or urgent deliveries, we handle
                your shipments with care and efficiency.
              </p>

              <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 mb-6 border border-white/40 shadow-sm">
                <h4 className="font-abhaya font-extrabold text-[#171E67] mb-2">
                  Why We Excel
                </h4>
                <p className="text-[#171E67]/80 text-sm leading-relaxed">
                  Fast, secure, and straightforward — that's how we handle deliveries.
                  Expect confirmed drop-offs and same-day options when you need things
                  delivered quickly.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="font-abhaya font-extrabold text-[#FF5C0B] mb-3">
                  What to Expect
                </h4>
                <ul className="space-y-3 text-[#171E67]">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Careful handling from pickup to drop-off
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Same-day and scheduled delivery options
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✔</span>
                    Dedicated customer service team
                  </li>
                </ul>
              </div>

              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-abhaya font-extrabold shadow-lg hover:-translate-y-1 transition">
                Book This Service →
              </button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400 blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <img
                src={courierImg}
                alt="Courier Services"
                className="relative w-full h-[340px] md:h-[420px] object-cover rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
              />
              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                📦
              </div>
            </div>
          </div>

          {/* ================= SERVICE 5 ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="service-lease">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-emerald-500 blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <img
                src={leaseImg}
                alt="Lease Services"
                className="relative w-full h-[340px] md:h-[420px] object-cover rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
              />
              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                💼
              </div>
            </div>

            <div>
              <span className="text-sm font-abhaya font-extrabold text-indigo-500">
                Service 5
              </span>
              <h3 className="text-3xl md:text-4xl font-abhaya font-extrabold text-[#FF5C0B] mt-2 mb-4">
                Lease Hire Service
              </h3>
              <p className="text-[#171E67] font-abhaya leading-relaxed mb-6">
                Flexible long-term vehicle solutions for businesses and individuals. Our lease hire service offers cost-effective transportation without the commitment and overhead of vehicle ownership.
              </p>
              <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 mb-6 border border-white/40 shadow-sm">
                <h4 className="font-abhaya font-extrabold text-[#171E67] mb-2">
                  Why We Excel
                </h4>
                <p className="text-[#171E67]/80 text-sm leading-relaxed">
                  Enjoy a leasing experience designed around flexibility and ease. From managed maintenance to dedicated support, everything is set up to grow with your needs — with exclusive benefits for corporate clients.
                </p>
              </div>
              <div className="mb-8">
                <h4 className="font-abhaya font-extrabold text-[#FF5C0B] mb-3">
                  What to Expect
                </h4>
                <ul className="space-y-3 text-[#171E67]">
                  <li className="flex items-start gap-2"><span className="text-green-500">✔</span> Leasing plans designed to fit your business needs</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✔</span> Simple, hassle-free process from start to finish</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✔</span> Help is always there when you need it</li>
                </ul>
              </div>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-abhaya font-extrabold shadow-lg hover:-translate-y-1 transition">
                Book This Service →
              </button>
            </div>
          </div>

          {/* ================= SERVICE 6 ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="service-safari">
            <div>
              <span className="text-sm font-abhaya font-extrabold text-indigo-500">
                Service 6
              </span>
              <h3 className="text-3xl md:text-4xl font-abhaya font-extrabold text-[#FF5C0B] mt-2 mb-4">
                Safari Tour Services
              </h3>
              <p className="text-[#171E67] font-abhaya leading-relaxed mb-6">
               Embark on unforgettable adventures with our specialized safari tour service. Equipped with rugged 4x4 vehicles and experienced guides, we take you to breathtaking destinations safely and comfortably.
              </p>
              <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 mb-6 border border-white/40 shadow-sm">
                <h4 className="font-abhaya font-extrabold text-[#171E67] mb-2">
                  Why We Excel
                </h4>
                <p className="text-[#171E67]/80 text-sm leading-relaxed">
                 Our safari expertise combines adventure with safety. We use specially modified vehicles for wildlife viewing and maintain strong relationships with parks and reserves.
                </p>
              </div>
              <div className="mb-8">
                <h4 className="font-abhaya font-extrabold text-[#FF5C0B] mb-3">
                  What to Expect
                </h4>
                <ul className="space-y-3 text-[#171E67]">
                  <li className="flex items-start gap-2"><span className="text-green-500">✔</span> Trips planned around what you want to see</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✔</span> Great views all around for photos</li>
                  <li className="flex items-start gap-2"><span className="text-green-500">✔</span> Comfortable, ready-for-anything safari vehicles</li>
                </ul>
              </div>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-abhaya font-extrabold shadow-lg hover:-translate-y-1 transition">
                Book This Service →
              </button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <img
                src={safariImg}
                alt="Safari Tours"
                className="relative w-full h-[340px] md:h-[420px] object-cover rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
              />
              <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                🦒
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default ServicesPage;

