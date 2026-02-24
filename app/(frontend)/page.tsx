import React from "react";
import Image from "next/image";
import { draftMode } from "next/headers";
import ServiceCard from "../components/ServiceCard";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 60;

const PrinterIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const StickerIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h10M7 12h10m-10 5h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  printer: <PrinterIcon />,
  sticker: <StickerIcon />,
  building: <BuildingIcon />,
};

const HomePage = async () => {
  const { isEnabled: isDraftMode } = await draftMode();
  let homePageData;
  try {
    const payload = await getPayloadClient();
    homePageData = await payload.findGlobal({ slug: "home-page", draft: isDraftMode });
  } catch {
    homePageData = null;
  }

  const heroImages = homePageData?.heroImages || [
    { imageUrl: "https://images.pexels.com/photos/14602294/pexels-photo-14602294.jpeg", alt: "Stickers and Prints" },
    { imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d", alt: "Neon Signage" },
  ];

  const headline = homePageData?.headline || "Your Visual Identity, Brought to Life";
  const subheadline = homePageData?.subheadline || "Copies, Stickers, Mounted Prints & Business Signage";

  const serviceCards = homePageData?.serviceCards || [
    { icon: "printer", title: "Copies & Prints", description: "High-quality document reproduction & large-format printing", variant: "blue" },
    { icon: "sticker", title: "Custom Stickers", description: "Die-cut, waterproof, and durable stickers for any purpose", variant: "pink" },
    { icon: "building", title: "Business Signage", description: "Indoor & outdoor signs, banners, and display solutions", variant: "blue" },
  ];

  const getImageUrl = (heroImage: { imageUrl?: string; externalUrl?: string }) => heroImage.imageUrl || heroImage.externalUrl || "";

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-in {
          0% { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-float-in { animation: float-in 700ms ease-out both; }
      ` }} />

      <section className="mb-20 animate-float-in text-center">
        <span className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-blue-600">
          Premium Printing & Mounting
        </span>
        <h1 className="mb-5 text-4xl font-black uppercase leading-[0.9] tracking-tight text-blue-900 md:text-7xl">{headline}</h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-500 md:text-xl">{subheadline}</p>
      </section>

      <section className="mb-16 grid gap-6 md:grid-cols-2">
        {heroImages.slice(0, 2).map((heroImage: { imageUrl?: string; externalUrl?: string; alt: string }, index: number) => (
          <div key={index} className="group relative h-80 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
            <Image src={getImageUrl(heroImage)} alt={heroImage.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-black uppercase tracking-tight text-blue-900">Core Services</h2>
          <a href="/services" className="text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-pink-500">View all</a>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {serviceCards.map((card: { icon: string; title: string; description: string; variant: "blue" | "pink" }, index: number) => (
            <ServiceCard key={index} icon={iconMap[card.icon] || <PrinterIcon />} title={card.title} description={card.description} variant={card.variant as "blue" | "pink"} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
