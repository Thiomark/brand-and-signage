import React from "react";
import { getPayloadClient } from "@/lib/payload";
import GalleryClient from "./GalleryClient";

export const revalidate = 60;

interface GalleryCategory {
  id: string;
  name: string;
  order?: number;
}

interface MediaValue {
  url?: string;
  cloudinaryUrl?: string;
  secure_url?: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory | string;
  image?: MediaValue | string;
  order?: number;
}

const resolveImageUrl = (item: GalleryItem) => {
  if (typeof item.image === "string") return item.image;
  if (item.image?.cloudinaryUrl) return item.image.cloudinaryUrl;
  if (item.image?.secure_url) return item.image.secure_url;
  if (item.image?.url) return item.image.url;
  return "";
};

const GalleryPage = async () => {
  let categories: string[] = ["All"];
  let galleryItems: Array<{ id: string; title: string; category: string; image: string }> = [];

  try {
    const payload = await getPayloadClient();

    const categoriesResult = await payload.find({
      collection: "gallery-categories",
      sort: "order",
      limit: 100,
    });

    if (categoriesResult.docs.length > 0) {
      categories = ["All", ...categoriesResult.docs.map((cat) => (cat as GalleryCategory).name)];
    }

    const itemsResult = await payload.find({
      collection: "gallery-items",
      sort: "order",
      limit: 100,
      depth: 2,
    });

    galleryItems = (itemsResult.docs as GalleryItem[])
      .map((item) => {
        const categoryName = typeof item.category === "string" ? item.category : (item.category as GalleryCategory)?.name || "Uncategorized";
        return {
          id: item.id,
          title: item.title,
          category: categoryName,
          image: resolveImageUrl(item),
        };
      })
      .filter((item) => Boolean(item.image));
  } catch (error) {
    console.error("Failed to fetch gallery data from CMS:", error);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black uppercase tracking-tight text-blue-900 md:text-5xl">Our Work</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">Browse through our portfolio of prints, stickers, and signage projects.</p>
      </div>

      {galleryItems.length > 0 ? (
        <GalleryClient categories={categories} items={galleryItems} />
      ) : (
        <p className="text-center text-slate-400">No gallery items yet. Add some in the CMS.</p>
      )}
    </div>
  );
};

export default GalleryPage;
