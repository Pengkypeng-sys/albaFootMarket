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
}: {
  large?: boolean;
  initial?: string;
  initialCategory?: CategoryId | "semua";
  placeholder?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const menuId = useId();
  const root = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(initial);
  const [category, setCategory] = useState<CategoryId | "semua">(initialCategory);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);

  // Filter saran pencarian berdasarkan kategori yang dipilih
  const hits = q.trim()
    ? searchProducts(q)
        .filter((p) => category === "semua" || p.category === category)
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setOpen(false);
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  function handleSelectCategory(catId: CategoryId | "semua") {
    setCategory(catId);
    setFilterOpen(false);
    setCursor(-1);
    // Jika tidak ada ketikan pencarian dan memilih kategori tertentu, langsung arahkan ke kategori tsb
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
    category === "semua"
      ? "Kategori"
      : categories.find((c) => c.id === category)?.label ?? "Kategori";

  return (
    <div className={large ? "search search-lg" : "search"} ref={root}>
      <form role="search" onSubmit={go}>
        {/* Ikon Pencarian */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="search-icon"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Kolom Input Pencarian */}
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

        {/* Tombol Clear Pencarian */}
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

        {/* Garis Pemisah (Divider) */}
        <span className="search-in-divider" aria-hidden />

        {/* Tombol Filter Kategori Terintegrasi di Dalam Kolom Pencarian */}
        <div className="search-in-filter-wrap">
          <button
            type="button"
            className="search-in-filter-btn"
            data-active={category !== "semua"}
            aria-expanded={filterOpen}
            aria-controls={menuId}
            aria-label="Pilih kategori filter"
            onClick={() => {
              setFilterOpen((o) => !o);
              setOpen(false);
            }}
          >
            <span className="search-in-filter-icon">🏷️</span>
            <span className="search-in-filter-text">{selectedCategoryLabel}</span>
            <svg
              className="search-in-chevron"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Menu Dropdown Filter Pilihan Kategori */}
          {filterOpen && (
            <div className="search-in-menu" id={menuId} role="menu">
              <div className="search-in-menu-header">Filter Kategori</div>
              <div className="search-in-menu-list">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="menuitem"
                    className="search-in-menu-item"
                    data-selected={category === c.id}
                    onClick={() => handleSelectCategory(c.id)}
                  >
                    <span>{c.label}</span>
                    {category === c.id && <span className="search-in-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Dropdown Hasil Pencarian Otomatis */}
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
  );
}
