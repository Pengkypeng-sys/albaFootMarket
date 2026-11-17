"use client";

import Link from "next/link";
import { AddBox } from "@/components/AddBox";
import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { ProductMetaBadges } from "@/components/ProductMetaBadges";
import { categories, formatRp } from "@/data/products";
import { useCatalog } from "@/lib/catalog";

/** Halaman detail produk dari katalog bersama, sehingga produk baru dan harga hasil sunting dashboard ikut tampil. */
export function ProductDetail({ slug }: { slug: string }) {
  const { products, ready, getProduct, variantsOf } = useCatalog();
  const product = getProduct(slug);

  if (!product) {
    return (
      <article className="wrap section">
        <Link className="crumb" href="/produk" style={{ display: "inline-block" }}>
          ← Semua Produk
        </Link>
        <h1>{ready ? "Produk tidak ditemukan" : "Memuat…"}</h1>
        {ready ? (
          <p className="muted">
            Produk ini tidak ada di katalog. <Link href="/produk" style={{ color: "var(--red)", fontWeight: 600 }}>Lihat semua produk</Link>
          </p>
        ) : null}
      </article>
    );
  }

  const variants = variantsOf(product.category);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <article className="wrap">
      <Link className="crumb" href="/produk" style={{ display: "inline-block" }}>
        ← Semua Produk
      </Link>
      <div className="detail" data-cat={product.category}>
        <Gallery product={product} />
        <div className="detail-info">
          <span className="cat-pill">{categories.find((c) => c.id === product.category)?.label}</span>
          <h1>{product.name}</h1>
          <ProductMetaBadges slug={product.slug} />
          <p className="lede">{product.summary}</p>
          {product.flavor ? (
            <p className="flavor">
              <span>Rasa</span>
              <b>{product.flavor}</b>
            </p>
          ) : null}
          {variants.length > 1 ? (
            <div className="variant-block">
              <span className="variant-block-label">Pilih Varian / Rasa:</span>
              <div className="variant-pill-list">
                {variants.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/produk/${v.slug}`}
                    className="variant-pill"
                    data-active={v.slug === product.slug}
                    scroll={false}
                  >
                    <span className="variant-pill-name">{v.flavor || v.pack || v.name}</span>
                    {v.price ? <small className="variant-pill-price">{formatRp(v.price)}</small> : null}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          <div className="price-box">
            {product.price ? (
              <>
                <span>Harga</span>
                <p className="price">{formatRp(product.price)}</p>
              </>
            ) : (
              <p className="fine">Harga: tanya via WhatsApp.</p>
            )}
            {product.pack ? <b className="pack-pill">{product.pack}</b> : null}
          </div>
          {product.preorder ? <p className="fine">Pre-order. Jadwal dikonfirmasi admin.</p> : null}
          <AddBox slug={product.slug} name={product.name} preorder={product.preorder} />
        </div>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="head">
          <h2>Lainnya</h2>
        </div>
        <div className="grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </article>
  );
}
