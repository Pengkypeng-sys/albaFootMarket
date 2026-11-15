"use client";

import Link from "next/link";
import { useEffect } from "react";
import { lineProduct, useCart } from "@/lib/cart";
import { thumb } from "@/data/products";
import { Stepper } from "./Stepper";

export function CartDrawer({ onClose }: { onClose: () => void }) {
  const { lines, setQty, remove } = useCart();
  const items = lines.map((l) => ({ line: l, product: lineProduct(l) })).filter((x) => x.product);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="drawer-bg" onClick={onClose} role="presentation">
      <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Keranjang">
        <div className="drawer-top">
          <h2>Keranjang</h2>
          <button className="btn" type="button" onClick={onClose}>Tutup</button>
        </div>
        {items.length === 0 ? (
          <p className="muted">Masih kosong.</p>
        ) : (
          items.map(({ line, product }) => (
            <div key={line.slug} className="line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(product!.image, 128)} alt="" />
              <div>
                <strong>{product!.name}</strong>
                <button type="button" className="link-btn" onClick={() => remove(line.slug)}>Hapus</button>
              </div>
              <Stepper qty={line.qty} onChange={(q) => setQty(line.slug, q)} />
            </div>
          ))
        )}
        {items.length > 0 ? (
          <Link className="btn btn-red btn-block" href="/keranjang" onClick={onClose} style={{ marginTop: "auto" }}>
            Pesan via WhatsApp
          </Link>
        ) : null}
      </aside>
    </div>
  );
}
