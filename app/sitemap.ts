import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://albafootmarket.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/produk", "/lokasi"];
  return [
    ...routes.map((p) => ({ url: `${base}${p}` })),
    ...products.map((p) => ({ url: `${base}/produk/${p.slug}` })),
  ];
}
