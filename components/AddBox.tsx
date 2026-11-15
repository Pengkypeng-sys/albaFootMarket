"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/brand";
import { flyToCart } from "@/lib/fly";
import { Stepper } from "./Stepper";

export function AddBox({ slug, name, preorder = false }: { slug: string; name: string; preorder?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  return (
    <>
      <div className="buybar">
        <Stepper qty={qty} min={1} onChange={setQty} />
        <button
          className="btn btn-red"
          type="button"
          data-done={done}
          onClick={() => {
            add(slug, qty);
            flyToCart(document.querySelector<HTMLImageElement>(".gal-main"));
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          }}
        >
          {done ? "Masuk keranjang ✓" : "Tambah ke keranjang"}
        </button>
      </div>
      <a
        className="btn btn-block"
        href={waLink(`Halo Alba Food Market, saya mau ${preorder ? "pre-order" : "pesan"} ${name} sebanyak ${qty}.`)}
      >
        Tanya via WhatsApp
      </a>
    </>
  );
}
