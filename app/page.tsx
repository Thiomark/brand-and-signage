import React from "react";

const BrandAndSignageLanding = () => {
  return (
    <div className="min-h-screen bg-[#1a2b4b] text-white font-sans selection:bg-pink-500">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-[#1a2b4b]">
        <div className="flex items-center space-x-2">
          <div className="relative flex flex-col items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-pink-500 rounded-sm">
            <span className="font-bold text-xl leading-none">BS</span>
          </div>
          <span className="font-bold tracking-wider text-lg">
            BRAND AND SIGNAGE
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wide">
          <a href="#" className="border-b-2 border-pink-500 pb-1">
            Services
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            Gallery
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            About Us
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            Contact
          </a>
        </div>

        <button className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-full font-bold text-sm transition shadow-lg">
          Get a Quote
        </button>
      </nav>

      {/* Hero Images Section */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-2xl overflow-hidden h-80 shadow-2xl">
            <img
              src="https://images.pexels.com/photos/14602294/pexels-photo-14602294.jpeg?_gl=1*11gblpa*_ga*NDQ2MDI3ODMzLjE3NTEzMTAzNjg.*_ga_8JE65Q40S6*czE3NjkwMTU3OTIkbzIxJGcxJHQxNzY5MDE1ODQ0JGo4JGwwJGgw"
              alt="Stickers and Prints"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-80 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800"
              alt="Neon Signage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-4">
            Your Visual Identity, Brought to Life
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Copies, Stickers, Mounted Prints & Business Signage
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-blue-600 p-8 rounded-2xl flex flex-col items-center text-center shadow-xl transform hover:-translate-y-2 transition-transform">
            <div className="mb-6">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase mb-4">
              Copies & Prints
            </h3>
            <p className="text-blue-100 mb-8 flex-grow">
              High-quality document reproduction & large-format printing
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 px-8 py-2 rounded-full font-bold transition">
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-pink-500 p-8 rounded-2xl flex flex-col items-center text-center shadow-xl transform hover:-translate-y-2 transition-transform">
            <div className="mb-6">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 7h10M7 12h10m-10 5h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase mb-4">
              Custom Stickers
            </h3>
            <p className="text-pink-100 mb-8 flex-grow">
              Die-cut, waterproof, and durable stickers for any purpose
            </p>
            <button className="bg-[#1a2b4b] hover:bg-[#132038] px-8 py-2 rounded-full font-bold transition">
              Learn More
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-600 p-8 rounded-2xl flex flex-col items-center text-center shadow-xl transform hover:-translate-y-2 transition-transform">
            <div className="mb-6">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase mb-4">
              Business Signage
            </h3>
            <p className="text-blue-100 mb-8 flex-grow">
              Indoor & outdoor signs, banners, and display solutions
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 px-8 py-2 rounded-full font-bold transition">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-10 px-8 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:text-white transition">
            FB
          </a>
          <a href="#" className="hover:text-white transition">
            TW
          </a>
          <a href="#" className="hover:text-white transition">
            IG
          </a>
        </div>
        <div>©️ 2026 BRAND AND SIGNAGE. All rights reserved.</div>
        <div className="mt-6 md:mt-0">
          <a
            href="#"
            className="border border-gray-600 rounded-full px-4 py-1 hover:text-white hover:border-white transition"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default BrandAndSignageLanding;
