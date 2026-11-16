"use client";

import Link from "next/link";
import { useState } from "react";
import { featured, thumb } from "@/data/products";

const flakes = Array.from({ length: 9 }, (_, i) => i);

export function Fridge() {
  const [zoom] = useState(true);
  // Default langsung terbuka agar customer tidak perlu banyak klik untuk melihat produk
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

          {/* PINTU KIRI (Bergeser ke Kiri) */}
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

          {/* PINTU KANAN (Bergeser ke Kanan) */}
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
    </div>
  );
}
