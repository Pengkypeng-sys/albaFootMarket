import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddBox } from "@/components/AddBox";
import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { ProductMetaBadges } from "@/components/ProductMetaBadges";
import { categories, formatRp, getProduct, products } from "@/data/products";

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
      <div className="detail" data-cat={product.category}>
        <Gallery product={product} />
        <div className="detail-info">
          <span className="cat-pill">{categories.find((c) => c.id === product.category)?.label}</span>
          <h1>{product.name}</h1>
          <ProductMetaBadges
            slug={product.slug}
            baseStock={product.stock ?? 25}
            baseSold={product.sold ?? 120}
          />
          <p className="lede">{product.summary}</p>
          {product.flavor ? (
            <p className="flavor">
              <span>Rasa</span>
              <b>{product.flavor}</b>
            </p>
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
