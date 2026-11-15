"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, searchProducts, type BrandName, type CategoryId } from "@/data/products";
import { waLink } from "@/lib/brand";
import { ProductCard } from "./ProductCard";

const brandTabs: { id: BrandName | "semua"; label: string }[] = [
  { id: "semua", label: "Semua Brand" },
  { id: "Alba Food Market", label: "Alba Food Market (Bahan Dasar)" },
  { id: "Albafroz", label: "Albafroz (Frozen Siap Masak)" },
  { id: "Hey Honey", label: "Hey Honey (Madu)" },
];

export function Catalog({
  query = "",
  initialCategory = "semua",
  initialBrand = "semua",
}: {
  query?: string;
  initialCategory?: CategoryId | "semua";
  initialBrand?: BrandName | "semua";
}) {
  const [category, setCategory] = useState<CategoryId | "semua">(initialCategory);
  const [brand, setBrand] = useState<BrandName | "semua">(initialBrand);

  const list = useMemo(
    () =>
      searchProducts(query).filter(
        (p) =>
          (category === "semua" || p.category === category) &&
          (brand === "semua" || p.brand === brand),
      ),
    [query, category, brand],
  );

  return (
    <div>
      {/* Brand Selector */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", marginBottom: "0.5rem" }}>
        {brandTabs.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBrand(b.id)}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: brand === b.id ? "1.5px solid var(--ink)" : "1px solid var(--line)",
              background: brand === b.id ? "var(--ink)" : "#fff",
              color: brand === b.id ? "#fff" : "var(--ink)",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease",
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

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
        {query || category !== "semua" || brand !== "semua" ? (
          <>
            {" · "}
            <button
              type="button"
              onClick={() => {
                setCategory("semua");
                setBrand("semua");
              }}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "var(--red)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Reset filter
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
