"use client";

import { useState } from "react";
import { shotsOf, thumb, type Product } from "@/data/products";

export function Gallery({ product }: { product: Product }) {
  const shots = shotsOf(product);
  const [i, setI] = useState(0);

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="gal-main" src={shots[i].src} alt={shots[i].alt} />
      {shots.length > 1 ? (
        <div className="gal-thumbs" role="tablist" aria-label="Foto produk">
          {shots.map((s, n) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`Foto ${n + 1}`}
              onClick={() => setI(n)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(s.src, 160)} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
