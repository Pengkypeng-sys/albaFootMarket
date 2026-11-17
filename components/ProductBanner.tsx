"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatRp } from "@/data/products";
import { useCatalog } from "@/lib/catalog";
import { waLink } from "@/lib/brand";

interface BannerSlide {
  slug: string;
  tabLabel: string;
  title: string;
  tagline: string;
  badge: string;
  image: string;
  alt: string;
  highlights: string[];
}

const slides: BannerSlide[] = [
  {
    slug: "sambosa-daging",
    tabLabel: "Sambosa Daging",
    title: "Sambosa Daging Gurih & Renyah",
    tagline: "Kulit renyah keemasan berpadu isian daging sapi berbumbu rempah autentik. Praktis tinggal goreng beberapa menit, favorit untuk suguhan hangat keluarga.",
    badge: "🔥 Best Seller #1",
    image: "/hero/sambosa.webp",
    alt: "Sambosa goreng segitiga renyah keemasan di atas piring",
    highlights: ["Kulit renyah tahan lama", "Isian daging sapi melimpah", "Siap saji dalam 5 menit"],
  },
  {
    slug: "kebab-daging",
    tabLabel: "Kebab Daging",
    title: "Kebab Daging Khas Timur Tengah",
    tagline: "Tortilla lembut berbalut daging sapi berbumbu tebal khas rempah istimewa. Praktis dipanggang di teflon tanpa repot.",
    badge: "⭐ Rekomendasi Pelanggan",
    image: "/hero/kebab.webp",
    alt: "Kebab panggang dipotong dua dengan sayuran dan saus lezat",
    highlights: ["Daging sapi tebal & berbumbu", "Panggang teflon tanpa ribet", "Cocok untuk sarapan & bekal"],
  },
  {
    slug: "roti-canai-original",
    tabLabel: "Roti Canai",
    title: "Roti Canai Lembut Berlapis",
    tagline: "Tekstur berlapis khas yang garing di luar dan lembut di dalam. Sangat nikmat disajikan dengan kuah kari gurih atau taburan gula & susu kental manis.",
    badge: "✨ Gurih & Berlapis",
    image: "/hero/roti-canai.webp",
    alt: "Roti canai hangat dengan kuah kari gurih",
    highlights: ["Tekstur berlapis autentik", "Aroma butter menggugah selera", "Bisa manis maupun gurih"],
  },
  {
    slug: "onde-onde",
    tabLabel: "Onde-Onde Frozen",
    title: "Onde-Onde Wijen Isi Kacang Hijau",
    tagline: "Taburan wijen wangi yang renyah dengan isian kacang hijau manis lembut yang lumer di mulut saat dinikmati hangat.",
    badge: "🌿 Camilan Tradisional",
    image: "/hero/onde-onde.webp",
    alt: "Onde-onde wijen goreng yang renyah",
    highlights: ["Kacang hijau asli tanpa pengawet", "Wijen rapat & renyah", "Goreng hangat langsung nikmat"],
  },
];

export function ProductBanner() {
  const { getProduct } = useCatalog();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const current = slides[activeIdx];
  const prod = getProduct(current.slug);

  const next = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  }, []);

  // Auto slide setiap 6 detik bila tidak di-hover atau disentuh
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 40) next();
      else if (diff < -40) prev();
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="pbanner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Banner Produk Unggulan"
    >
      {/* Tab Navigasi Pilihan Produk di Atas Banner */}
      <div className="pbanner-tabs" role="tablist" aria-label="Pilih produk unggulan">
        {slides.map((s, idx) => (
          <button
            key={s.slug}
            type="button"
            role="tab"
            aria-selected={idx === activeIdx}
            className="pbanner-tab"
            onClick={() => {
              setActiveIdx(idx);
              setPaused(true);
            }}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      <div className="pbanner-body">
        {/* Kolom Informasi & Penjelasan Produk */}
        <div className="pbanner-info">
          <div className="pbanner-badge-row">
            <span className="pbanner-badge">{current.badge}</span>
            {prod?.pack && <span className="pbanner-pack">{prod.pack}</span>}
          </div>

          <h3 className="pbanner-title">{current.title}</h3>
          <p className="pbanner-desc">{current.tagline}</p>

          <ul className="pbanner-feats">
            {current.highlights.map((h) => (
              <li key={h}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="pbanner-foot">
            <div className="pbanner-price-wrap">
              <span className="pbanner-price-label">Harga Spesial</span>
              <span className="pbanner-price">
                {prod?.price ? formatRp(prod.price) : "Tanya via WA"}
              </span>
            </div>

            <div className="pbanner-cta-group">
              <Link href={`/produk/${current.slug}`} className="btn btn-red pbanner-btn">
                Lihat Detail Produk →
              </Link>
              <a
                href={waLink(`Halo Alba Food Market, saya mau pesan ${current.title} (${prod?.pack || "pack"}).`)}
                target="_blank"
                rel="noreferrer"
                className="btn pbanner-btn-wa"
              >
                Pesan Cepat via WA
              </a>
            </div>
          </div>
        </div>

        {/* Kolom Visual Foto Produk HD */}
        <div className="pbanner-visual">
          <Link
            href={`/produk/${current.slug}`}
            className="pbanner-img-link"
            tabIndex={-1}
            aria-label={`Lihat detail ${current.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.alt}
              className="pbanner-img"
              width={640}
              height={480}
              loading="lazy"
            />
            <span className="pbanner-floating-tag">
              <span>Produk Pilihan</span>
              <strong>{prod?.name || current.tabLabel}</strong>
            </span>
          </Link>

          {/* Tombol Panah Geser Gambar */}
          <div className="pbanner-nav-arrows">
            <button
              type="button"
              className="pbanner-arrow"
              onClick={() => {
                prev();
                setPaused(true);
              }}
              aria-label="Produk sebelumnya"
            >
              ‹
            </button>
            <button
              type="button"
              className="pbanner-arrow"
              onClick={() => {
                next();
                setPaused(true);
              }}
              aria-label="Produk berikutnya"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
