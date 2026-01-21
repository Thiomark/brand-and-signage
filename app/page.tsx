import React from "react";
import ServiceCard from "./components/ServiceCard";

const PrinterIcon = () => (
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
);

const StickerIcon = () => (
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
);

const BuildingIcon = () => (
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
);

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
      {/* Hero Images Section */}
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
        <ServiceCard
          icon={<PrinterIcon />}
          title="Copies & Prints"
          description="High-quality document reproduction & large-format printing"
          variant="blue"
        />
        <ServiceCard
          icon={<StickerIcon />}
          title="Custom Stickers"
          description="Die-cut, waterproof, and durable stickers for any purpose"
          variant="pink"
        />
        <ServiceCard
          icon={<BuildingIcon />}
          title="Business Signage"
          description="Indoor & outdoor signs, banners, and display solutions"
          variant="blue"
        />
      </div>
    </div>
  );
};

export default HomePage;
