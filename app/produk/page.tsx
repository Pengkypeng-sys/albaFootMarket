import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { categories, type CategoryId } from "@/data/products";

export const metadata: Metadata = {
  title: "Produk",
  description: "Kulit sambosa, sambosa cokelat, roti cane beku, camilan, kurma, dan bumbu masak.",
  alternates: { canonical: "/produk" },
};

type Props = { searchParams: Promise<{ q?: string; kategori?: string }> };

export default async function ProdukPage({ searchParams }: Props) {
  const { q = "", kategori } = await searchParams;
  const initial = categories.some((c) => c.id === kategori) ? (kategori as CategoryId) : "semua";

  return (
    <section className="wrap section">
      <h1 style={{ marginBottom: "1.2rem" }}>Produk</h1>
      <Catalog key={`${q}|${initial}`} query={q} initialCategory={initial} />
    </section>
  );
}
