import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddBox } from "@/components/AddBox";
import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { formatRp, getProduct, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produk" };
  return {
    title: `${product.name} Depok`,
    description: `${product.name} di Alba Food Market, Sawangan Depok. ${product.summary}`,
    alternates: { canonical: `/produk/${product.slug}` },
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.image,
    brand: product.brand,
    ...(product.price
      ? { offers: { "@type": "Offer", priceCurrency: "IDR", price: product.price } }
      : {}),
  };

  return (
    <article className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link className="crumb" href="/produk" style={{ display: "inline-block" }}>
        ← Semua Produk
      </Link>
      <div className="detail">
        <Gallery product={product} />
        <div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{
              background: product.brand === "Albafroz" ? "#e10600" : product.brand === "Hey Honey" ? "#cfa600" : "var(--ink)",
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "999px"
            }}>
              {product.brand}
            </span>
            {product.packSize ? (
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>
                • {product.packSize}
              </span>
            ) : null}
          </div>
          <h1>{product.name}</h1>
          <p className="lede">{product.summary}</p>
          {product.price ? (
            <p className="price">{formatRp(product.price)}</p>
          ) : (
            <p className="fine">Harga: tanya via WhatsApp.</p>
          )}

          {product.wholesalePrice ? (
            <div style={{
              margin: "1rem 0",
              padding: "0.9rem 1.1rem",
              borderRadius: "12px",
              background: "#f0faf3",
              border: "1px solid #c2e8ce"
            }}>
              <p style={{ fontWeight: 700, color: "#006d30", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
                Harga Grosir & Reseller: {formatRp(product.wholesalePrice)} / pack
              </p>
              <p style={{ fontSize: "0.85rem", color: "#2d5a3c", margin: 0 }}>
                Minimal order {product.wholesaleMin ?? 10} pack. Ingin suplai rutin usaha atau katering?{" "}
                <Link href="/reseller" style={{ fontWeight: 700, textDecoration: "underline" }}>
                  Pelajari Program Reseller →
                </Link>
              </p>
            </div>
          ) : null}

          {product.brand === "Albafroz" ? (
            <div style={{
              margin: "0.8rem 0 1.2rem",
              padding: "0.8rem 1rem",
              borderRadius: "12px",
              background: "#fff5f4",
              border: "1px solid #fbd2ce"
            }}>
              <p style={{ fontSize: "0.85rem", color: "#8a1b16", margin: 0 }}>
                ❄️ <strong>Lini Frozen Food Albafroz:</strong> Disimpan beku -18°C. Cek panduan simpan &amp; masak di{" "}
                <Link href="/albafroz" style={{ fontWeight: 700, textDecoration: "underline" }}>
                  Halaman Albafroz →
                </Link>
              </p>
            </div>
          ) : null}

          {product.preorder ? <p className="fine">Pre-order. Jadwal & menu dikonfirmasi admin.</p> : null}
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
