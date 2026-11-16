"use client";

import { useMemo, useState } from "react";
import { categories, searchProducts, type CategoryId } from "@/data/products";
import { waLink } from "@/lib/brand";
import { ProductCard } from "./ProductCard";

export function Catalog({
  query = "",
  initialCategory = "semua",
}: {
  query?: string;
  initialCategory?: CategoryId | "semua";
}) {
  const [category, setCategory] = useState<CategoryId | "semua">(initialCategory);

  const list = useMemo(
    () => searchProducts(query).filter((p) => category === "semua" || p.category === category),
    [query, category],
  );

  return (
    <div>
      <div className="chips-bar">
        <div className="chips" role="group" aria-label="Kategori">
          {categories.map((c) => (
            <button
              key={c.id}
              className="chip"
              type="button"
              data-on={category === c.id}
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <p className="muted" style={{ margin: "1.2rem 0" }} aria-live="polite">
        {query ? `${list.length} hasil untuk “${query}”` : `${list.length} produk`}
        {category !== "semua" ? (
          <>
            {" · "}
            <button type="button" className="link-btn" onClick={() => setCategory("semua")}>
              Reset
            </button>
          </>
        ) : null}
      </p>
      {list.length === 0 ? (
        <p className="empty">
          Tidak ketemu.{" "}
          <a href={waLink(`Halo Alba Food Market, apakah ada ${query || "produk ini"}?`)}>Tanya via WhatsApp</a>
        </p>
      ) : (
        <div className="grid">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
