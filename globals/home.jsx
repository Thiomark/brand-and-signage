import React, { useState, useEffect } from "react";
import {
  Printer,
  Layers,
  Store,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      title: "Copies & Bulk Prints",
      desc: "High-speed digital reproduction for flyers, manuals, and business documents.",
      icon: <Printer className="w-8 h-8" />,
      color: "blue",
    },
    {
      title: "Custom Stickers",
      desc: "Waterproof vinyl decals and die-cut stickers for branding and packaging.",
      icon: <Layers className="w-8 h-8" />,
      color: "pink",
    },
    {
      title: "Business Signage",
      desc: "Professional mounting for shopfronts, directional signs, and lightboxes.",
      icon: <Store className="w-8 h-8" />,
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-pink-100 overflow-x-hidden">
      {/* Custom Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes heartbeat {
          0% { transform: scale(1); }
          10% { transform: scale(1.12); }
          20% { transform: scale(1); }
          30% { transform: scale(1.12); }
          40% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .animate-heartbeat-once {
          /* 1.25s per beat cycle * 4 cycles = 5 seconds total */
          animation: heartbeat 1.25s cubic-bezier(0.4, 0, 0.6, 1) 4 forwards;
          display: inline-block;
        }
      `,
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-lg group-hover:bg-pink-500 transition-colors duration-500 transform group-hover:rotate-12">
              <span className="text-white font-black text-xl">BS</span>
            </div>
            <span className="font-black text-xl tracking-tighter text-blue-900 uppercase">
              Brand & Signage
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Services", "Gallery", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <button className="bg-pink-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-pink-100 hover:shadow-blue-100 transform hover:-translate-y-1">
              Get A Quote
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div
            className={`transition-all duration-1000 delay-100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-8 inline-block">
              Premium Printing & Mounting
            </span>
          </div>

          <h1
            className={`text-5xl md:text-8xl font-black text-blue-900 leading-[0.9] mb-12 transition-all duration-1000 delay-300 ${isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
            <span className="animate-heartbeat-once">
              YOUR ONE STOP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">
                PRINTING SHOP.
              </span>
            </span>
          </h1>

          <p
            className={`text-xl text-slate-500 max-w-2xl mb-12 transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            From custom vinyl stickers to massive industrial signage, we provide
            the mounting and precision your business deserves.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-2 group shadow-xl shadow-blue-100 transform hover:scale-105 transition-all">
              Start Your Project{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border-2 border-slate-200 hover:border-pink-500 hover:text-pink-500 text-slate-600 px-10 py-5 rounded-2xl font-bold transition-all transform hover:scale-105">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Animated Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="services">
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 200 + 800}ms` }}
              className={`group bg-white border border-slate-100 p-10 rounded-[3rem] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-4 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${service.color === "blue" ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600" : "bg-pink-50 text-pink-500 group-hover:bg-pink-500"} group-hover:text-white group-hover:rotate-6`}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-blue-900 uppercase mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                {service.desc}
              </p>
              <div
                className={`h-1.5 w-12 rounded-full transition-all duration-500 group-hover:w-full ${service.color === "blue" ? "bg-blue-600" : "bg-pink-500"}`}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Mounting Gallery */}
      <section className="bg-slate-50 py-24 px-6 overflow-hidden" id="gallery">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-blue-900 uppercase mb-4">
                Precision Installation
              </h2>
              <p className="text-slate-500 text-lg">
                We don't just print — we mount. Our team handles professional
                application on glass, metal, and wood.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-4 bg-white rounded-full hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <ChevronRight className="rotate-180" size={20} />
              </button>
              <button className="p-4 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-sm"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    [
                      "1589939705384-5185138a04b9",
                      "1563245372-f21724e3856d",
                      "1626785774573-4b799315345d",
                      "1516035069371-29a1b244cc32",
                    ][i - 1]
                  }?auto=format&fit=crop&q=80&w=600`}
                  alt="Signage project"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white">
                    <p className="font-black uppercase tracking-widest text-xs mb-1">
                      Project 0{i}
                    </p>
                    <p className="font-bold">Business Branding</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-16 px-6" id="about">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-black">BS</span>
              </div>
              <span className="font-black text-xl tracking-tighter text-blue-900 uppercase">
                Brand & Signage
              </span>
            </div>
            <p className="text-slate-400 max-w-xs mb-8 font-medium">
              Your partner in high-quality visual identity. From the printer to
              the shopfront, we mount excellence.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest text-blue-900 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-slate-500 font-bold text-sm">
              <li>
                <a
                  href="#services"
                  className="hover:text-pink-500 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-pink-500 transition-colors"
                >
                  Project Gallery
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-pink-500 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition-colors">
                  Terms of Work
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest text-blue-900 mb-6">
              Contact Us
            </h4>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="text-pink-500 shrink-0" size={18} />
                <p className="text-slate-500 font-bold text-sm leading-tight">
                  BNP Center ground floor room A26
                  <br />
                  Maseru, Lesotho
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-blue-600 shrink-0" size={18} />
                <p className="text-slate-500 font-bold text-sm">
                  5683 4053 / 2232 5197
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-blue-600 shrink-0" size={18} />
                <p className="text-slate-500 font-bold text-sm break-all">
                  branding1.signage@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            ©️ 2026 Brand and Signage. All rights reserved.
          </p>
          <p className="text-slate-300 text-[10px] font-black uppercase tracking-tighter italic">
            Maseru's Choice for Excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
