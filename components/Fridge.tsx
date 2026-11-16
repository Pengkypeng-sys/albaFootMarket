"use client";

import Link from "next/link";
import { useState } from "react";
import { featured, thumb } from "@/data/products";

const flakes = Array.from({ length: 9 }, (_, i) => i);

export function Fridge() {
  const [zoom] = useState(true);
  const [open, setOpen] = useState(true);
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
                // Urutan muncul produk saat pintu bergeser terbuka satu per satu:
                // Pintu kiri geser ke kiri: kolom 2 tampak dulu, baru kolom 1
                // Pintu kanan geser ke kanan: kolom 3 tampak dulu, baru kolom 4
                const order = col === 2 ? 1 : col === 1 ? 2 : col === 3 ? 3 : 4;
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

          {/* PINTU KIRI (Bergeser ke Kiri) */}
          <button
            className="door"
            data-side="l"
            type="button"
            onClick={toggle}
            aria-label={open ? "Tutup pintu showcase" : "Buka pintu kiri showcase"}
            tabIndex={open ? -1 : 0}
          >
            <div className="door-decor-snow door-snow-tl">❄</div>
            <div className="door-decor-snow door-snow-br">✻</div>

            <div className="door-panel">
              {/* Badge Brand Albafroz */}
              <div className="door-brand-badge">
                <span className="door-crown">👑</span>
                <strong className="door-brand-name">ALBAFROZ</strong>
                <span className="door-brand-sub">Frozen Food Market</span>
              </div>

              {/* Jendela Kaca Berembun dengan Produk Spesial */}
              <div className="door-glass-window">
                <div className="door-glass-glare" />
                <div className="door-glass-content">
                  <span className="door-food-icon">🥟</span>
                  <strong className="door-food-title">Kulit Sambosa</strong>
                  <span className="door-food-tag">Crispy &amp; Renyah</span>
                </div>
              </div>

              {/* Stiker Kualitas Halal & Fresh */}
              <div className="door-tag-badge">
                <span className="door-tag-check">✓</span>
                <span>100% Halal &amp; Higienis</span>
              </div>
            </div>

            {/* Gagang Pintu Krom Perak */}
            <i className="handle" aria-hidden />
          </button>

          {/* PINTU KANAN (Bergeser ke Kanan dengan Jeda Halus) */}
          <button
            className="door"
            data-side="r"
            type="button"
            onClick={toggle}
            aria-label={open ? "Tutup pintu showcase" : "Buka pintu kanan showcase"}
            tabIndex={open ? -1 : 0}
          >
            <div className="door-decor-snow door-snow-tr">❄</div>
            <div className="door-decor-snow door-snow-bl">✻</div>

            <div className="door-panel">
              {/* Indikator Digital Suhu Dingin */}
              <div className="door-temp-badge">
                <span className="door-temp-dot" />
                <strong className="door-temp-val">-18°C</strong>
                <span className="door-temp-label">EXTRA FRESH</span>
              </div>

              {/* Jendela Kaca Berembun Kebab & Canai */}
              <div className="door-glass-window">
                <div className="door-glass-glare" />
                <div className="door-glass-content">
                  <span className="door-food-icon">🌯</span>
                  <strong className="door-food-title">Kebab &amp; Canai</strong>
                  <span className="door-food-tag">Daging Sapi Pilihan</span>
                </div>
              </div>

              {/* Ajakan Interaktif Klik Buka */}
              <div className="door-cta-badge">
                <span className="door-cta-icon">✨</span>
                <span>Buka Showcase ➔</span>
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
