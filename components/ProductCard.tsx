"use client";

import Link from "next/link";
import { useState } from "react";
import { formatRp, thumb, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useCatalog } from "@/lib/catalog";
import { useSales } from "@/lib/sales";
import { useReveal } from "./Reveal";
import { flyToCart } from "@/lib/fly";
import { Stepper } from "./Stepper";
import { VariantModal } from "./VariantModal";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { lines, add, setQty } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const qty = lines.find((l) => l.slug === product.slug)?.qty ?? 0;
  const ref = useReveal<HTMLElement>();
  const { variantsOf } = useCatalog();
  const variants = variantsOf(product.category);
  const hasVariants = variants.length > 1;

  const { stock, sold, max, isLowStock, isOutOfStock } = useSales().metaOf(product.slug);

  return (
    <article
      ref={ref}
      className="card"
      data-cat={product.category}
      data-reveal
      style={{ "--d": `${(index % 4) * 70}ms` } as React.CSSProperties}
    >
      <Link className="card-photo" href={`/produk/${product.slug}`} aria-label={product.name}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb(product.image, 640)}
          alt={product.imageAlt}
          loading={index < 4 ? "eager" : "lazy"}
          width={640}
          height={640}
        />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: "6px", flexWrap: "wrap", zIndex: 2 }}>
          {product.brand === "Albafroz" ? (
            <span style={{ background: "#e10600", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", letterSpacing: "0.02em" }}>
              Albafroz
            </span>
          ) : product.brand === "Hey Honey" ? (
            <span style={{ background: "#cfa600", color: "#231a00", fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
              Hey Honey
            </span>
          ) : null}
          {product.preorder ? <span className="tag">Pre-order</span> : null}
          {product.wholesalePrice ? (
            <span style={{ background: "#006d30", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
              Grosir
            </span>
          ) : null}
        </div>
      </Link>
      <div className="card-body">
        <h3>
          <Link href={`/produk/${product.slug}`}>{product.name}</Link>
        </h3>
        {product.pack || product.packSize ? (
          <span className="pack">{product.pack || product.packSize}</span>
        ) : null}
        <p>{product.summary}</p>
        <div className="card-price-row">
          {product.price ? (
            <strong className="card-price">{formatRp(product.price)}</strong>
          ) : (
            <span className="card-ask">Tanya harga</span>
          )}
        </div>
        <div className="card-meta-row">
          <span className="card-sold" title="Total produk terjual">
            🔥 {sold}+ terjual
          </span>
          <span
            className="card-stock"
            data-low={isLowStock}
            data-empty={isOutOfStock}
            title="Stok tersedia di toko"
          >
            {isOutOfStock ? "Habis" : isLowStock ? `Sisa ${stock}!` : `Stok: ${stock}`}
          </span>
        </div>
      </div>
      {qty > 0 ? (
        <Stepper qty={qty} max={max} onChange={(q) => setQty(product.slug, q)} />
      ) : (
        <button
          className="btn btn-red"
          type="button"
          disabled={isOutOfStock}
          onClick={() => {
            if (isOutOfStock) return;
            if (hasVariants) {
              setModalOpen(true);
            } else {
              add(product.slug);
              flyToCart(ref.current?.querySelector("img") ?? null);
            }
          }}
        >
          {isOutOfStock ? "Stok Habis" : hasVariants ? "Tambah (Pilih Rasa)" : "Tambah"}
        </button>
      )}

      {hasVariants && (
        <VariantModal
          isOpen={modalOpen}
          initialProduct={product}
          variants={variants}
          onClose={() => setModalOpen(false)}
          onAdd={(slug, q, targetEl) => {
            add(slug, q);
            flyToCart(targetEl || ref.current?.querySelector("img") || null);
          }}
        />
      )}
    </article>
  );
}
