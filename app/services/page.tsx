import React from "react";
import Button from "../components/Button";

const PrinterIcon = () => (
  <svg
    className="w-12 h-12"
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
    className="w-12 h-12"
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
    className="w-12 h-12"
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

const services = [
  {
    icon: <PrinterIcon />,
    title: "Copies & Prints",
    description:
      "From simple document copies to large-format prints, we deliver crisp, vibrant results every time.",
    features: [
      "Black & white and color copies",
      "Large format printing (up to 44 inches wide)",
      "Canvas prints and photo enlargements",
      "Poster printing",
      "Blueprint and architectural prints",
    ],
  },
  {
    icon: <StickerIcon />,
    title: "Custom Stickers",
    description:
      "Durable, eye-catching stickers for branding, packaging, events, and personal expression.",
    features: [
      "Die-cut custom shapes",
      "Waterproof and UV-resistant materials",
      "Matte, gloss, and clear finishes",
      "Labels and product stickers",
      "Bumper stickers and decals",
    ],
  },
  {
    icon: <BuildingIcon />,
    title: "Business Signage",
    description:
      "Professional signage solutions to make your business stand out and attract customers.",
    features: [
      "Indoor and outdoor signs",
      "Vinyl banners and mesh banners",
      "A-frame and sidewalk signs",
      "Window graphics and lettering",
      "Vehicle wraps and magnets",
    ],
  },
];

const ServicesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
          Our Services
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          We offer a full range of printing and signage solutions to help your
          brand make a lasting impression.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-16">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`flex flex-col md:flex-row gap-8 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 bg-gradient-to-br from-blue-600 to-pink-500 p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h2 className="text-2xl font-bold uppercase">{service.title}</h2>
              </div>
              <p className="text-gray-100 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-pink-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#0f1a2e] p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">
                  Ready to get started?
                </h3>
                <p className="text-gray-400 mb-6">
                  Contact us for a free quote on your {service.title.toLowerCase()} project.
                </p>
                <Button href="/contact">Get a Quote</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
