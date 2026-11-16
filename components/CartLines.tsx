"use client";

import { formatRp, thumb } from "@/data/products";
import { cartTotal, lineProduct, lineTotal, useCart } from "@/lib/cart";
import { Stepper } from "./Stepper";

/** Daftar baris keranjang: harga satuan, stepper, dan subtotal per produk. */
export function CartLines() {
  const { lines, setQty, remove } = useCart();
  return (
    <>
      {lines.map((line) => {
        const p = lineProduct(line);
        if (!p) return null;
        const sub = lineTotal(line);
        const packText = p.pack || p.packSize;
        return (
          <div key={line.slug} className="line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(p.image, 128)} alt={p.name} />
            <div className="line-info">
              <strong>{p.name}</strong>
              {packText ? <span className="pack">{packText}</span> : null}
              <span className="unit">{p.price ? `${formatRp(p.price)} × ${line.qty}` : "Harga via WhatsApp"}</span>
              <button type="button" className="link-btn" onClick={() => remove(line.slug)}>
                Hapus
              </button>
            </div>
            <div className="line-end">
              <Stepper qty={line.qty} onChange={(q) => setQty(line.slug, q)} />
              <b>{sub === undefined ? "–" : formatRp(sub)}</b>
            </div>
          </div>
        );
      })}
    </>
  );
}

/** Baris total; item tanpa harga dicatat terpisah, tidak dihitung nol. */
export function CartTotal() {
  const { lines } = useCart();
  const { sum, unpriced } = cartTotal(lines);
  return (
    <div className="total">
      <div>
        <span>Total</span>
        <strong>{formatRp(sum)}</strong>
      </div>
      {unpriced ? <p>+ {unpriced} item harga dikonfirmasi lewat WhatsApp</p> : null}
    </div>
  );
}
