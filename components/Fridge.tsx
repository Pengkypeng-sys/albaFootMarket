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

          {/* PINTU KIRI (Bergeser ke Kiri - Khusus Gambar Produk Tanpa Teks) */}
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

            {/* Panel Pintu Kiri: Murni Gambar Produk Tanpa Teks */}
            <div className="door-panel door-panel-photos">
              <div className="door-photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/sambosa-frozen.jpg"
                  alt="Sambosa Frozen"
                  className="door-photo-img"
                  width={110}
                  height={110}
                />
                <div className="door-photo-glare" />
              </div>

              <div className="door-photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/kulit-sambosa.jpg"
                  alt="Kulit Sambosa"
                  className="door-photo-img"
                  width={110}
                  height={110}
                />
                <div className="door-photo-glare" />
              </div>
            </div>

            {/* Gagang Pintu Krom Perak */}
            <i className="handle" aria-hidden />
          </button>

          {/* PINTU KANAN (Bergeser ke Kanan - Khusus Gambar Produk Tanpa Teks) */}
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

            {/* Panel Pintu Kanan: Murni Gambar Produk Tanpa Teks */}
            <div className="door-panel door-panel-photos">
              <div className="door-photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/kebab.jpg"
                  alt="Kebab Daging"
                  className="door-photo-img"
                  width={110}
                  height={110}
                />
                <div className="door-photo-glare" />
              </div>

              <div className="door-photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/products/roti-canai.jpg"
                  alt="Roti Canai"
                  className="door-photo-img"
                  width={110}
                  height={110}
                />
                <div className="door-photo-glare" />
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
