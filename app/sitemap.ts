import type { MetadataRoute } from "next";
import { products } from "@/data/products";

// TODO: konfirmasi domain produksi
const base = "https://albafoodmarket.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/produk", "/lokasi"];
  return [
    ...routes.map((p) => ({ url: `${base}${p}` })),
    ...products.map((p) => ({ url: `${base}/produk/${p.slug}` })),
  ];
}
