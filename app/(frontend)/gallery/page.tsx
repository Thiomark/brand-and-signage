import React from "react";
import { getPayloadClient } from "@/lib/payload";
import GalleryClient from "./GalleryClient";

interface GalleryCategory {
  id: string;
  name: string;
  order?: number;
}

interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory | string;
  imageUrl?: string;
  order?: number;
}

const defaultCategories = ["All", "Prints", "Stickers", "Signage"];

const defaultGalleryItems = [
  {
    id: '1',
    category: "Prints",
    title: "Large Format Poster",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  },
  {
    id: '2',
    category: "Signage",
    title: "Neon Business Sign",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  },
  {
    id: '3',
    category: "Stickers",
    title: "Custom Die-Cut Stickers",
    imageUrl: "https://images.pexels.com/photos/14602294/pexels-photo-14602294.jpeg",
  },
  {
    id: '4',
    category: "Signage",
    title: "Outdoor Banner",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  },
  {
    id: '5',
    category: "Prints",
    title: "Canvas Print",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
  },
  {
    id: '6',
    category: "Stickers",
    title: "Product Labels",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338",
  },
  {
    id: '7',
    category: "Signage",
    title: "Window Graphics",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
  {
    id: '8',
    category: "Prints",
    title: "Photo Enlargement",
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
  },
  {
    id: '9',
    category: "Stickers",
    title: "Vinyl Decals",
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3",
  },
];

const GalleryPage = async () => {
  let categories: string[] = defaultCategories;
  let galleryItems: Array<{
    id: string;
    title: string;
    category: string;
    image: string;
  }> = [];

  try {
    const payload = await getPayloadClient();
    // Fetch categories
    const categoriesResult = await payload.find({
      collection: 'gallery-categories',
      sort: 'order',
      limit: 100,
    });

    if (categoriesResult.docs.length > 0) {
      categories = ['All', ...categoriesResult.docs.map((cat) => (cat as GalleryCategory).name)];
    }

    // Fetch gallery items
    const itemsResult = await payload.find({
      collection: 'gallery-items',
      sort: 'order',
      limit: 100,
      depth: 2,
    });

    if (itemsResult.docs.length > 0) {
      galleryItems = (itemsResult.docs as GalleryItem[]).map((item) => {
        const categoryName = typeof item.category === 'string'
          ? item.category
          : (item.category as GalleryCategory)?.name || 'Uncategorized';

        return {
          id: item.id,
          title: item.title,
          category: categoryName,
          image: item.imageUrl || '',
        };
      });
    }
  } catch {
    // Use defaults if there's an error
  }

  // If no items from CMS, use defaults
  if (galleryItems.length === 0) {
    galleryItems = defaultGalleryItems.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      image: item.imageUrl,
    }));
  }

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

      <GalleryClient categories={categories} items={galleryItems} />
    </div>
  );
};

export default GalleryPage;
