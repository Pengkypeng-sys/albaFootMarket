"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { featured, thumb } from "@/data/products";

const flakes = Array.from({ length: 9 }, (_, i) => i);
const sides = ["l", "r"] as const;

export function Fridge() {
  const [zoom] = useState(true);
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen((o) => !o);

  return (
    <div className="fridge" data-zoom={zoom} data-open={open}>
      <div className="fr-body">
        <div className="fr-top">
          <i className="led" aria-hidden />
          <p>Frozen &amp; Fresh</p>
        </div>
        <div className="fr-unit">
          <div className="fr-cab">
            <ul className="shelf">
              {featured.map((p, i) => (
                <li key={p.slug} data-cat={p.category} style={{ "--i": i } as React.CSSProperties}>
                  <Link href={`/produk/${p.slug}`} tabIndex={open ? 0 : -1}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb(p.image, 240)} alt="" width={96} height={96} />
                    <span>{p.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mist" aria-hidden />
            {flakes.map((i) => (
              <i key={i} className="flake" style={{ "--k": i } as React.CSSProperties} aria-hidden />
            ))}
          </div>
          {sides.map((s) => (
            <button
              key={s}
              className="door"
              data-side={s}
              type="button"
              onClick={toggle}
              aria-label={s === "l" ? "Buka atau tutup kulkas" : undefined}
              aria-hidden={s === "r" || undefined}
              tabIndex={s === "r" ? -1 : undefined}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <i className="handle" aria-hidden />
            </button>
          ))}
        </div>
      </div>
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
