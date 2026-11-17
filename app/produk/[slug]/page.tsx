import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

/** Produk bawaan dirender statis untuk SEO; slug hasil tambahan dashboard dirender saat diminta dan dibaca dari katalog di perangkat. */
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
  const jsonLd = product && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.image,
    ...(product.price ? { offers: { "@type": "Offer", priceCurrency: "IDR", price: product.price } } : {}),
  };

  return (
    <>
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      <ProductDetail slug={slug} />
    </>
  );
}
