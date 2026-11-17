"use client";

import { useCatalog } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

/** Produk unggulan beranda dari katalog bersama (ikut hasil sunting dashboard). */
export function FeaturedGrid() {
  const { featured } = useCatalog();
  return (
    <div className="grid">
      {featured.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
