"use client";

import Link from "next/link";
import { formatRp, thumb, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useReveal } from "./Reveal";
import { flyToCart } from "@/lib/fly";
import { Stepper } from "./Stepper";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { lines, add, setQty } = useCart();
  const qty = lines.find((l) => l.slug === product.slug)?.qty ?? 0;
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className="card"
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
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: "6px", flexWrap: "wrap" }}>
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
      <h3>
        <Link href={`/produk/${product.slug}`}>{product.name}</Link>
      </h3>
      {product.packSize ? (
        <span style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500, display: "block", marginTop: "-0.2rem" }}>
          {product.packSize}
        </span>
      ) : null}
      <p>{product.summary}</p>
      {product.price ? <strong className="card-price">{formatRp(product.price)}</strong> : null}
      {qty > 0 ? (
        <Stepper qty={qty} onChange={(q) => setQty(product.slug, q)} />
      ) : (
        <button
          className="btn"
          type="button"
          onClick={() => {
            add(product.slug);
            flyToCart(ref.current?.querySelector("img") ?? null);
          }}
        >
          + Keranjang
        </button>
      )}
    </article>
  );
}
