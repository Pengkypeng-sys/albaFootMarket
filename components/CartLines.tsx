"use client";

import { formatRp, thumb } from "@/data/products";
import { useCart } from "@/lib/cart";
import { Stepper } from "./Stepper";

/** Daftar baris keranjang: harga satuan, stepper (dibatasi stok), dan subtotal per produk. */
export function CartLines() {
  const { items, setQty, remove } = useCart();
  return (
    <>
      {items.map(({ slug, qty, product: p, subtotal, max }) => {
        const packText = p.pack || p.packSize;
        return (
          <div key={slug} className="line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(p.image, 128)} alt={p.name} />
            <div className="line-info">
              <strong>{p.name}</strong>
              {packText ? <span className="pack">{packText}</span> : null}
              <span className="unit">{p.price ? `${formatRp(p.price)} × ${qty}` : "Harga via WhatsApp"}</span>
              {max !== undefined && qty >= max ? <span className="fine">Maks. stok tersedia ({max})</span> : null}
              <button type="button" className="link-btn" onClick={() => remove(slug)}>
                Hapus
              </button>
            </div>
            <div className="line-end">
              <Stepper qty={qty} max={max} onChange={(q) => setQty(slug, q)} />
              <b>{subtotal === undefined ? "–" : formatRp(subtotal)}</b>
            </div>
          </div>
        );
      })}
    </>
  );
}

/** Baris total; item tanpa harga dicatat terpisah, tidak dihitung nol. */
export function CartTotal() {
  const { total } = useCart();
  return (
    <div className="total">
      <div>
        <span>Total</span>
        <strong>{formatRp(total.sum)}</strong>
      </div>
      {total.unpriced ? <p>+ {total.unpriced} item harga dikonfirmasi lewat WhatsApp</p> : null}
    </div>
  );
}
