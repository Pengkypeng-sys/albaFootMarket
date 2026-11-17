"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/brand";
import { flyToCart } from "@/lib/fly";
import { useSales } from "@/lib/sales";
import { Stepper } from "./Stepper";

export function AddBox({ slug, name, preorder = false }: { slug: string; name: string; preorder?: boolean }) {
  const { add, lines } = useCart();
  const { max, isOutOfStock } = useSales().metaOf(slug);
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  const inCart = lines.find((l) => l.slug === slug)?.qty ?? 0;
  const room = max === undefined ? undefined : Math.max(0, max - inCart);
  const full = !isOutOfStock && room === 0;
  const shown = room === undefined ? qty : Math.max(1, Math.min(qty, room));

  return (
    <>
      <div className="buybar">
        <Stepper qty={shown} min={1} max={room === undefined ? undefined : Math.max(1, room)} onChange={setQty} />
        <button
          className="btn btn-red"
          type="button"
          data-done={done}
          disabled={isOutOfStock || full}
          onClick={() => {
            add(slug, shown);
            flyToCart(document.querySelector<HTMLImageElement>(".gal-main"));
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          }}
        >
          {isOutOfStock ? "Stok habis" : full ? "Semua stok sudah di keranjang" : done ? "Masuk keranjang ✓" : "Tambah ke keranjang"}
        </button>
      </div>
      <a
        className="btn btn-block"
        href={waLink(`Halo Alba Food Market, saya mau ${preorder ? "pre-order" : "pesan"} ${name} sebanyak ${shown}.`)}
      >
        Tanya via WhatsApp
      </a>
    </>
  );
}
