import React from "react";
import Button from "../../components/Button";
import { getPayloadClient } from "@/lib/payload";

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

const iconMap: Record<string, React.ReactNode> = {
  printer: <PrinterIcon />,
  sticker: <StickerIcon />,
  building: <BuildingIcon />,
};

interface Service {
  id?: string;
  title: string;
  description: string;
  icon: string;
  features: { feature: string }[];
  order?: number;
}

const defaultServices: Service[] = [
  {
    icon: 'printer',
    title: 'Copies & Prints',
    description: 'From simple document copies to large-format prints, we deliver crisp, vibrant results every time.',
    features: [
      { feature: 'Black & white and color copies' },
      { feature: 'Large format printing (up to 44 inches wide)' },
      { feature: 'Canvas prints and photo enlargements' },
      { feature: 'Poster printing' },
      { feature: 'Blueprint and architectural prints' },
    ],
  },
  {
    icon: 'sticker',
    title: 'Custom Stickers',
    description: 'Durable, eye-catching stickers for branding, packaging, events, and personal expression.',
    features: [
      { feature: 'Die-cut custom shapes' },
      { feature: 'Waterproof and UV-resistant materials' },
      { feature: 'Matte, gloss, and clear finishes' },
      { feature: 'Labels and product stickers' },
      { feature: 'Bumper stickers and decals' },
    ],
  },
  {
    icon: 'building',
    title: 'Business Signage',
    description: 'Professional signage solutions to make your business stand out and attract customers.',
    features: [
      { feature: 'Indoor and outdoor signs' },
      { feature: 'Vinyl banners and mesh banners' },
      { feature: 'A-frame and sidewalk signs' },
      { feature: 'Window graphics and lettering' },
      { feature: 'Vehicle wraps and magnets' },
    ],
  },
];

const ServicesPage = async () => {
  let servicesData: Service[] = [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'services',
      sort: 'order',
      limit: 100,
    });
    if (result.docs.length > 0) {
      servicesData = result.docs as Service[];
    }
  } catch {
    // PayloadCMS unavailable, use default values
    servicesData = [];
  }

  const services = servicesData.length > 0 ? servicesData : defaultServices;

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
                {iconMap[service.icon] || <PrinterIcon />}
                <h2 className="text-2xl font-bold uppercase">{service.title}</h2>
              </div>
              <p className="text-gray-100 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((item) => (
                  <li key={item.feature} className="flex items-center gap-2">
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
                    {item.feature}
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
