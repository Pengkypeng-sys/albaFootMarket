"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatRp, getProduct } from "@/data/products";

// Foto asli resolusi tinggi (Wikimedia Commons; kredit di public/products/ATRIBUSI.md).
// `steam`: tampilkan uap tipis untuk makanan yang disajikan hangat.
const slides = [
  { slug: "sambosa-daging", src: "/hero/sambosa.webp", alt: "Sambosa goreng keemasan di atas piring", steam: true },
  { slug: "kebab-daging", src: "/hero/kebab.webp", alt: "Kebab panggang dipotong dua dengan sayuran segar", steam: true },
  { slug: "roti-canai-original", src: "/hero/roti-canai.webp", alt: "Roti canai hangat dengan kuah kari", steam: true },
  { slug: "onde-onde", src: "/hero/onde-onde.webp", alt: "Onde-onde wijen yang renyah", steam: false },
  { slug: "kurma", src: "/hero/kurma.webp", alt: "Kurma lembut dalam mangkuk putih", steam: false },
] as const;

const AUTO_MS = 6000;

/** Panggung foto makanan di hero: geser otomatis, swipe, panah, titik. */
export function HeroStage() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  // Maju sendiri; berhenti saat disentuh/fokus atau bila pengguna membatasi animasi
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, paused]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      className="stage"
      role="group"
      aria-roledescription="carousel"
      aria-label="Makanan andalan"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        onTouchEnd(e);
        setPaused(false);
      }}
    >
      {slides.map((s, n) => {
        const p = getProduct(s.slug);
        if (!p) return null;
        const on = n === i;
        return (
          <Link
            key={s.slug}
            href={`/produk/${p.slug}`}
            className="stage-slide"
            data-on={on}
            aria-hidden={!on}
            tabIndex={on ? 0 : -1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="stage-img"
              src={s.src}
              alt={s.alt}
              width={1400}
              height={1050}
              loading={n === 0 ? "eager" : "lazy"}
              fetchPriority={n === 0 ? "high" : undefined}
            />
            {s.steam ? (
              <span className="steam" aria-hidden>
                <i />
                <i />
                <i />
              </span>
            ) : null}
            <span className="stage-cap">
              <span>
                <b>{p.name}</b>
                {p.flavor || p.pack ? <small>{[p.flavor, p.pack].filter(Boolean).join(" · ")}</small> : null}
              </span>
              {p.price ? <span className="stage-price">{formatRp(p.price)}</span> : null}
            </span>
          </Link>
        );
      })}

      <button type="button" className="stage-nav stage-prev" aria-label="Sebelumnya" onClick={() => go(i - 1)}>
        ‹
      </button>
      <button type="button" className="stage-nav stage-next" aria-label="Berikutnya" onClick={() => go(i + 1)}>
        ›
      </button>
      <div className="stage-dots">
        {slides.map((s, n) => (
          <button key={s.slug} type="button" aria-label={`Foto ${n + 1}`} aria-current={n === i} onClick={() => go(n)} />
        ))}
      </div>
    </div>
  );
}
