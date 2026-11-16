"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { categories, searchProducts, thumb, type CategoryId } from "@/data/products";

export function SearchBox({
  large = false,
  initial = "",
  initialCategory = "semua",
  placeholder = "Cari: sambosa, kebab, roti canai…",
  showChips = true,
}: {
  large?: boolean;
  initial?: string;
  initialCategory?: CategoryId | "semua";
  placeholder?: string;
  showChips?: boolean;
}) {
  const router = useRouter();
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(initial);
  const [category, setCategory] = useState<CategoryId | "semua">(initialCategory);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);

  // Filter hasil pencarian berdasarkan kata kunci dan kategori yang dipilih
  const hits = q.trim()
    ? searchProducts(q)
        .filter((p) => category === "semua" || p.category === category)
        .slice(0, 5)
    : [];

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setOpen(false);
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function go(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    setFilterOpen(false);
    if (cursor >= 0 && hits[cursor]) {
      router.push(`/produk/${hits[cursor].slug}`);
    } else {
      const params = new URLSearchParams();
      if (category !== "semua") params.set("kategori", category);
      if (q.trim()) params.set("q", q.trim());
      const queryStr = params.toString();
      router.push(queryStr ? `/produk?${queryStr}` : "/produk");
    }
  }

  function handleCategorySelect(catId: CategoryId | "semua") {
    setCategory(catId);
    setFilterOpen(false);
    setCursor(-1);
    if (!q.trim() && catId !== "semua") {
      router.push(`/produk?kategori=${catId}`);
    }
  }

  function keys(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setFilterOpen(false);
    }
  }

  const selectedCategoryLabel =
    categories.find((c) => c.id === category)?.label ?? "Semua";

  return (
    <div className={large ? "search-wrapper search-wrapper-lg" : "search-wrapper"} ref={root}>
      <div className={large ? "search search-lg" : "search"}>
        <form role="search" onSubmit={go}>
          {/* Filter Kategori Terintegrasi di dalam Input */}
          <div className="search-filter-box">
            <button
              type="button"
              className="search-filter-btn"
              onClick={() => {
                setFilterOpen((o) => !o);
                setOpen(false);
              }}
              aria-label="Pilih Kategori"
              aria-expanded={filterOpen}
            >
              <span className="search-filter-icon">🏷️</span>
              <span className="search-filter-text">{selectedCategoryLabel}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="search-divider" aria-hidden />

            {/* Dropdown Pilihan Kategori */}
            {filterOpen && (
              <div className="search-filter-dropdown" role="menu">
                <div className="search-filter-title">Filter Kategori</div>
                <div className="search-filter-options">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="search-filter-option"
                      data-active={category === c.id}
                      onClick={() => handleCategorySelect(c.id)}
                    >
                      <span>{c.label}</span>
                      {category === c.id && <span className="search-check">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="search-icon">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <input
            type="search"
            name="q"
            value={q}
            placeholder={
              category !== "semua"
                ? `Cari di ${selectedCategoryLabel}…`
                : placeholder
            }
            aria-label="Cari produk"
            aria-controls={listId}
            aria-expanded={open && q.trim() !== ""}
            autoComplete="off"
            onChange={(e) => {
              setQ(e.target.value);
              setCursor(-1);
              setOpen(true);
              setFilterOpen(false);
            }}
            onFocus={() => {
              setOpen(true);
              setFilterOpen(false);
            }}
            onKeyDown={keys}
          />

          {q.trim() && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => {
                setQ("");
                setCursor(-1);
              }}
              aria-label="Hapus kata kunci"
            >
              ✕
            </button>
          )}
        </form>

        {/* Dropdown Hasil Saran Pencarian */}
        {open && q.trim() ? (
          <div className="suggest" id={listId}>
            {hits.length === 0 ? (
              <p className="suggest-empty">
                Tidak ketemu di {category !== "semua" ? `kategori ${selectedCategoryLabel}` : "katalog"}.{" "}
                <Link href="/produk" onClick={() => setOpen(false)}>
                  Lihat semua produk
                </Link>
              </p>
            ) : (
              hits.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/produk/${p.slug}`}
                  data-on={i === cursor}
                  onClick={() => setOpen(false)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(p.image, 120)} alt="" />
                  <span>
                    {p.name}
                    <small>{p.summary}</small>
                  </span>
                </Link>
              ))
            )}
          </div>
        ) : null}
      </div>

      {/* Chip Filter Cepat di Bawah Kolom Pencarian (Hero) */}
      {large && showChips && (
        <div className="search-quick-chips">
          <span className="search-quick-label">Filter:</span>
          <div className="search-chips-scroll">
            {categories.slice(0, 6).map((c) => (
              <button
                key={c.id}
                type="button"
                className="search-quick-chip"
                data-active={category === c.id}
                onClick={() => handleCategorySelect(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
