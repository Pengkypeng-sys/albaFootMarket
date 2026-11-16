"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CartLines, CartTotal } from "@/components/CartLines";
import { orderMessage, useCart, type OrderForm } from "@/lib/cart";
import { waLink } from "@/lib/brand";

export default function CartPage() {
  const { lines, clear, ready } = useCart();
  const [form, setForm] = useState<OrderForm>({ name: "", mode: "antar", address: "", note: "" });
  const set = (patch: Partial<OrderForm>) => setForm((f) => ({ ...f, ...patch }));

  const message = useMemo(() => orderMessage(lines, form), [lines, form]);

  return (
    <section className="wrap section">
      <h1 style={{ marginBottom: "1.5rem" }}>Keranjang</h1>
      {!ready ? null : lines.length === 0 ? (
        <p className="muted">
          Masih kosong. <Link href="/produk" style={{ color: "var(--red)", fontWeight: 600 }}>Lihat produk</Link>
        </p>
      ) : (
        <div className="checkout">
          <div>
            <CartLines />
            <button type="button" className="link-btn" style={{ marginTop: "1rem" }} onClick={clear}>
              Kosongkan keranjang
            </button>
          </div>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <CartTotal />
            <label className="field">
              Nama
              <input value={form.name} onChange={(e) => set({ name: e.target.value })} autoComplete="name" />
            </label>
            <label className="field">
              Ambil atau antar
              <select value={form.mode} onChange={(e) => set({ mode: e.target.value as OrderForm["mode"] })}>
                <option value="antar">Pesan antar</option>
                <option value="ambil">Ambil di toko</option>
              </select>
            </label>
            {form.mode === "antar" ? (
              <label className="field">
                Alamat
                <textarea value={form.address} onChange={(e) => set({ address: e.target.value })} autoComplete="street-address" />
              </label>
            ) : null}
            <label className="field">
              Catatan
              <textarea value={form.note} onChange={(e) => set({ note: e.target.value })} />
            </label>
            <a className="btn btn-red btn-block" href={waLink(message)}>
              Kirim pesanan via WhatsApp
            </a>
            <p className="fine">Pesanan lengkap dengan harga terkirim ke WhatsApp. Ongkir dikonfirmasi admin.</p>
          </form>
        </div>
      )}
    </section>
  );
}
