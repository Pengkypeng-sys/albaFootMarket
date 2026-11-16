"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { featured, formatRp, thumb } from "@/data/products";

const flakes = Array.from({ length: 9 }, (_, i) => i);

export function Fridge() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggle = () => setOpen((o) => !o);

  const prev = useCallback(() => {
    setCurrent((i) => (i > 0 ? i - 1 : featured.length - 1));
  }, []);

  const next = useCallback(() => {
    setCurrent((i) => (i < featured.length - 1 ? i + 1 : 0));
  }, []);

  // Otomatis bergeser pelan setiap 5 detik agar interaktif, pause saat hover/interaksi
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const pauseAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseAuto();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 35) {
        next(); // Swipe ke kiri -> produk selanjutnya
      } else if (diff < -35) {
        prev(); // Swipe ke kanan -> produk sebelumnya
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    resumeAuto();
  };

  return (
    <div className="fridge" data-open={open}>
      <div className="fr-body">
        {/* Header Showcase Pendingin */}
        <div className="fr-top">
          <i className="led" aria-hidden />
          <p>Frozen &amp; Fresh Showcase</p>
        </div>

        {/* Unit Kabinet Showcase */}
        <div className="fr-unit">
          {/* Rak Spotlight Produk: Tampil Satu per Satu, Bisa Digeser / Di-swipe */}
          <div
            className="fr-cab fr-cab-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={pauseAuto}
            onMouseLeave={resumeAuto}
          >
            {/* Tombol Geser Kiri */}
            <button
              type="button"
              className="fr-slide-nav fr-slide-prev"
              onClick={() => {
                prev();
                pauseAuto();
              }}
              aria-label="Produk sebelumnya"
            >
              ‹
            </button>

            {/* Tombol Geser Kanan */}
            <button
              type="button"
              className="fr-slide-nav fr-slide-next"
              onClick={() => {
                next();
                pauseAuto();
              }}
              aria-label="Produk selanjutnya"
            >
              ›
            </button>

            {/* Kontainer Produk Satu per Satu */}
            <div className="fr-spotlight-wrap">
              {featured.map((p, i) => {
                const isActive = i === current;
                return (
                  <div
                    key={p.slug}
                    className="fr-spotlight-card"
                    data-active={isActive}
                    aria-hidden={!isActive}
                  >
                    <Link
                      href={`/produk/${p.slug}`}
                      className="fr-spotlight-link"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <div className="fr-spotlight-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumb(p.image, 480)}
                          alt={p.name}
                          className="fr-spotlight-img"
                          width={200}
                          height={200}
                        />
                        {p.brand && (
                          <span className="fr-spotlight-badge">{p.brand}</span>
                        )}
                      </div>
                      <div className="fr-spotlight-info">
                        <strong className="fr-spotlight-name">{p.name}</strong>
                        {p.price ? (
                          <span className="fr-spotlight-price">{formatRp(p.price)}</span>
                        ) : (
                          <span className="fr-spotlight-ask">Tanya via WhatsApp</span>
                        )}
                        <span className="fr-spotlight-cta">Lihat Produk →</span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Indikator Titik Navigasi (Dots) */}
            <div className="fr-spotlight-dots">
              {featured.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  className="fr-dot"
                  data-active={i === current}
                  onClick={() => {
                    setCurrent(i);
                    pauseAuto();
                  }}
                  aria-label={`Lihat ${p.name}`}
                />
              ))}
            </div>

            {/* Efek Kabut Uap Dingin & Butiran Es Melayang */}
            <div className="mist" aria-hidden />
            {flakes.map((i) => (
              <i key={i} className="flake" style={{ "--k": i } as React.CSSProperties} aria-hidden />
            ))}
          </div>

          {/* PINTU KIRI (Bergeser ke Kiri saat dibuka) */}
          <button
            className="door"
            data-side="l"
            type="button"
            onClick={toggle}
            aria-label={open ? "Tutup pintu showcase" : "Buka showcase pendingin"}
            tabIndex={open ? -1 : 0}
          >
            <div className="door-snowflake" aria-hidden>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Gagang Pintu Krom Perak */}
            <i className="handle" aria-hidden />
          </button>

          {/* PINTU KANAN (Bergeser ke Kanan saat dibuka) */}
          <button
            className="door"
            data-side="r"
            type="button"
            onClick={toggle}
            aria-label={open ? "Tutup pintu showcase" : "Buka showcase pendingin"}
            tabIndex={open ? -1 : 0}
          >
            <div className="door-snowflake" aria-hidden>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Gagang Pintu Krom Perak */}
            <i className="handle" aria-hidden />
          </button>
        </div>
      </div>

      {/* Tombol Kontrol Buka/Tutup di Bawah Showcase */}
      <div className="fr-foot">
        <button
          className="fr-pill-btn"
          type="button"
          data-open={open}
          aria-expanded={open}
          onClick={toggle}
          aria-label={open ? "Tutup showcase pendingin" : "Buka showcase pendingin"}
        >
          <span className="fr-pill-icon-wrap" aria-hidden>
            {/* Ikon Buka */}
            <span className="fr-icon-open">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
                <line x1="6" y1="10" x2="6" y2="14" />
                <line x1="18" y1="10" x2="18" y2="14" />
              </svg>
            </span>
            {/* Ikon Tutup */}
            <span className="fr-icon-close">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </span>

          <span className="fr-pill-label">
            {open ? "Tutup Showcase Pendingin" : "Buka Showcase Pendingin"}
          </span>

          <svg
            className="fr-pill-arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
