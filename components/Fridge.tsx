"use client";

import Link from "next/link";
import { useState } from "react";
import { featured, thumb } from "@/data/products";

const flakes = Array.from({ length: 9 }, (_, i) => i);

export function Fridge() {
  const [zoom] = useState(true);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <div className="fridge" data-zoom={zoom} data-open={open}>
      <div className="fr-body">
        {/* Header Kulkas */}
        <div className="fr-top">
          <i className="led" aria-hidden />
          <p>Frozen &amp; Fresh Showcase</p>
        </div>

        {/* Unit Kabinet & Pintu Kulkas */}
        <div className="fr-unit">
          {/* Bagian Dalam Rak (Produk) */}
          <div className="fr-cab">
            <ul className="shelf">
              {featured.map((p, i) => {
                // Kolom 1..4 (dari kiri ke kanan)
                const col = (i % 4) + 1;
                // Saat kedua pintu terbuka berbarengan dari tengah:
                // Kolom tengah (2 & 3) terlihat bersamaan di awal, lalu kolom luar (1 & 4)
                const order = col === 2 || col === 3 ? 1 : 2;
                return (
                  <li
                    key={p.slug}
                    data-cat={p.category}
                    data-col={col}
                    style={{
                      "--i": i,
                      "--col": col,
                      "--order": order,
                    } as React.CSSProperties}
                  >
                    <Link href={`/produk/${p.slug}`} tabIndex={open ? 0 : -1}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumb(p.image, 240)} alt={p.name} width={96} height={96} />
                      <span>{p.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Efek Kabut Uap Dingin & Butiran Es Melayang */}
            <div className="mist" aria-hidden />
            {flakes.map((i) => (
              <i key={i} className="flake" style={{ "--k": i } as React.CSSProperties} aria-hidden />
            ))}
          </div>

          {/* PINTU KIRI (Bergeser ke Kiri - Icon Sambosa & Kulit Sambosa) */}
          <button
            className="door"
            data-side="l"
            type="button"
            onClick={toggle}
            aria-label={open ? "Tutup pintu showcase" : "Buka showcase pendingin"}
            tabIndex={open ? -1 : 0}
          >
            <div className="door-decor-snow door-snow-tl">❄</div>
            <div className="door-decor-snow door-snow-br">✻</div>

            {/* Panel Pintu Kiri: Icon Menarik Tanpa Teks */}
            <div className="door-panel-icons">
              {/* Icon 1: Sambosa Renyah Emas */}
              <div className="door-icon-badge" title="Sambosa Frozen">
                <svg width="46" height="46" viewBox="0 0 64 64" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="samGrad" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="45%" stopColor="#f59e0b" />
                      <stop offset="85%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                    <linearGradient id="samFold" x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="samShad" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#78350f" floodOpacity="0.4" />
                    </filter>
                  </defs>
                  <path d="M32 10 L52 48 C50 51 46 52 42 52 L22 52 C18 52 14 51 12 48 Z" fill="url(#samGrad)" filter="url(#samShad)" />
                  <path d="M32 10 L30 52" stroke="url(#samFold)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M32 10 L44 50" stroke="#fef08a" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
                  <circle cx="24" cy="38" r="1.5" fill="#78350f" opacity="0.6" />
                  <circle cx="28" cy="44" r="1.2" fill="#78350f" opacity="0.5" />
                  <circle cx="38" cy="36" r="1.5" fill="#fef08a" opacity="0.8" />
                  <circle cx="36" cy="45" r="1.2" fill="#78350f" opacity="0.6" />
                  <circle cx="42" cy="42" r="1.4" fill="#fef08a" opacity="0.8" />
                  <path d="M22 28 L28 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
                  <path d="M48 16 L49 19 L52 20 L49 21 L48 24 L47 21 L44 20 L47 19 Z" fill="#fef08a" />
                </svg>
                <div className="door-icon-glare" />
              </div>

              {/* Icon 2: Kulit Sambosa Berlapis */}
              <div className="door-icon-badge" title="Kulit Sambosa">
                <svg width="46" height="46" viewBox="0 0 64 64" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="sheet1" x1="10" y1="20" x2="54" y2="44" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fffbeb" />
                      <stop offset="60%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="sheet2" x1="12" y1="26" x2="52" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="32" cy="44" rx="22" ry="9" fill="#b45309" opacity="0.35" />
                  <ellipse cx="32" cy="41" rx="21" ry="8" fill="url(#sheet2)" stroke="#d97706" strokeWidth="1.2" />
                  <ellipse cx="32" cy="35" rx="21" ry="8" fill="url(#sheet1)" stroke="#f59e0b" strokeWidth="1.2" />
                  <ellipse cx="32" cy="29" rx="21" ry="8" fill="url(#sheet1)" stroke="#d97706" strokeWidth="1.2" />
                  <ellipse cx="32" cy="23" rx="21" ry="8" fill="#fffef7" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M20 21 C26 19 38 19 44 21" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
                  <path d="M46 14 L48 17 L51 18 L48 19 L47 22 L46 19 L43 18 L46 17 Z" fill="#f59e0b" />
                  <path d="M14 16 L15 18 L17 19 L15 20 L14 22 L13 20 L11 19 L13 18 Z" fill="#fbbf24" />
                </svg>
                <div className="door-icon-glare" />
              </div>
            </div>

            {/* Gagang Pintu Krom Perak */}
            <i className="handle" aria-hidden />
          </button>

          {/* PINTU KANAN (Bergeser ke Kanan - Icon Kebab & Roti Canai) */}
          <button
            className="door"
            data-side="r"
            type="button"
            onClick={toggle}
            aria-label={open ? "Tutup pintu showcase" : "Buka showcase pendingin"}
            tabIndex={open ? -1 : 0}
          >
            <div className="door-decor-snow door-snow-tr">❄</div>
            <div className="door-decor-snow door-snow-bl">✻</div>

            {/* Panel Pintu Kanan: Icon Menarik Tanpa Teks */}
            <div className="door-panel-icons">
              {/* Icon 3: Kebab Daging Panggang */}
              <div className="door-icon-badge" title="Kebab Daging">
                <svg width="46" height="46" viewBox="0 0 64 64" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="kebabWrap" x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fffbeb" />
                      <stop offset="50%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="meatGrad" x1="42" y1="12" x2="54" y2="24" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#b91c1c" />
                      <stop offset="100%" stopColor="#7f1d1d" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="30" cy="50" rx="18" ry="6" fill="#78350f" opacity="0.3" />
                  <path d="M18 48 L14 42 L38 14 C42 10 48 12 50 16 L44 40 C42 46 36 50 30 50 Z" fill="url(#kebabWrap)" stroke="#b45309" strokeWidth="1.5" />
                  <path d="M40 12 C44 8 50 10 52 14 C54 18 50 22 46 20 Z" fill="url(#meatGrad)" />
                  <path d="M38 16 C36 13 40 10 43 11 C42 14 39 16 38 16 Z" fill="#22c55e" />
                  <circle cx="46" cy="15" r="1.5" fill="#fde047" />
                  <path d="M22 41 L27 34" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
                  <path d="M28 35 L34 27" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
                  <path d="M34 28 L40 21" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
                  <path d="M20 44 L32 28" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </svg>
                <div className="door-icon-glare" />
              </div>

              {/* Icon 4: Roti Canai Gurih Berlapis */}
              <div className="door-icon-badge" title="Roti Canai">
                <svg width="46" height="46" viewBox="0 0 64 64" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="canaiGrad" x1="12" y1="14" x2="52" y2="50" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fffbeb" />
                      <stop offset="40%" stopColor="#fde047" />
                      <stop offset="80%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="32" cy="48" rx="20" ry="6" fill="#78350f" opacity="0.3" />
                  <circle cx="32" cy="32" r="20" fill="url(#canaiGrad)" stroke="#b45309" strokeWidth="1.5" />
                  <path d="M32 20 C38 20 44 24 44 32 C44 40 36 44 28 44 C20 44 16 36 18 28 C20 22 26 18 32 18" stroke="#b45309" strokeWidth="2" strokeLinecap="round" opacity="0.65" fill="none" />
                  <path d="M26 26 C30 24 36 26 38 30 C40 34 36 38 32 38 C28 38 26 34 28 30" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" fill="none" />
                  <circle cx="26" cy="24" r="2.2" fill="#78350f" opacity="0.6" />
                  <circle cx="38" cy="34" r="2" fill="#78350f" opacity="0.5" />
                  <circle cx="32" cy="40" r="1.8" fill="#78350f" opacity="0.6" />
                  <circle cx="22" cy="36" r="1.5" fill="#78350f" opacity="0.5" />
                  <path d="M22 18 L26 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                  <path d="M48 16 L50 18 L52 19 L50 20 L49 22 L48 20 L46 19 L48 18 Z" fill="#fbbf24" />
                </svg>
                <div className="door-icon-glare" />
              </div>
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
          aria-expanded={open}
          onClick={toggle}
        >
          <span className="fr-pill-icon">{open ? "❄️" : "✨"}</span>
          <span>{open ? "Tutup Showcase Pendingin" : "Buka Showcase Pendingin"}</span>
        </button>
      </div>
    </div>
  );
}
