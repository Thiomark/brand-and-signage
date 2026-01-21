"use client";

import React, { useState } from "react";
import Image from "next/image";

const categories = ["All", "Prints", "Stickers", "Signage"];

const galleryItems = [
  {
    id: 1,
    category: "Prints",
    title: "Large Format Poster",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  },
  {
    id: 2,
    category: "Signage",
    title: "Neon Business Sign",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  },
  {
    id: 3,
    category: "Stickers",
    title: "Custom Die-Cut Stickers",
    image: "https://images.pexels.com/photos/14602294/pexels-photo-14602294.jpeg",
  },
  {
    id: 4,
    category: "Signage",
    title: "Outdoor Banner",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  },
  {
    id: 5,
    category: "Prints",
    title: "Canvas Print",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
  },
  {
    id: 6,
    category: "Stickers",
    title: "Product Labels",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338",
  },
  {
    id: 7,
    category: "Signage",
    title: "Window Graphics",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
  {
    id: 8,
    category: "Prints",
    title: "Photo Enlargement",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
  },
  {
    id: 9,
    category: "Stickers",
    title: "Vinyl Decals",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3",
  },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
          Our Work
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Browse through our portfolio of prints, stickers, and signage projects.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeCategory === category
                ? "bg-pink-500 text-white"
                : "bg-[#0f1a2e] text-gray-300 hover:bg-[#1a2b4b]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden shadow-xl h-64"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-pink-400 text-sm font-medium uppercase">
                {item.category}
              </span>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
