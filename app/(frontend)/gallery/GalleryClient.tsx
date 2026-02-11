"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GalleryClientProps {
  categories: string[];
  items: {
    id: string;
    title: string;
    category: string;
    image: string;
  }[];
}

const GalleryClient = ({ categories, items }: GalleryClientProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wide transition ${
              activeCategory === category
                ? "bg-pink-500 text-white"
                : "border border-slate-200 bg-white text-slate-500 hover:border-blue-500 hover:text-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="group relative h-72 overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-blue-900/75 via-transparent to-transparent p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xs font-black uppercase tracking-wider text-pink-200">{item.category}</span>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryClient;
