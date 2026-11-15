"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { thumb } from "@/data/products";
import { Stepper } from "@/components/Stepper";
import { lineProduct, useCart } from "@/lib/cart";
import { waLink } from "@/lib/brand";

export default function CartPage() {
  const { lines, setQty, remove, clear, ready } = useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState("antar");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const items = lines.map((line) => ({ line, product: lineProduct(line) })).filter((x) => x.product);

  const message = useMemo(
    () =>
      [
        "Halo Alba Food Market, saya mau pesan:",
        ...items.map((x, i) => `${i + 1}. ${x.product!.name} × ${x.line.qty}${x.product!.preorder ? " (pre-order)" : ""}`),
        "",
        `Nama: ${name || "-"}`,
        `Ambil/antar: ${mode === "ambil" ? "Ambil di toko" : "Antar"}`,
        ...(mode === "antar" ? [`Alamat: ${address || "-"}`] : []),
        `Catatan: ${note || "-"}`,
      ].join("\n"),
    [items, name, mode, address, note],
  );

  return (
    <section className="wrap section">
      <h1 style={{ marginBottom: "1.5rem" }}>Keranjang</h1>
      {!ready ? null : items.length === 0 ? (
        <p className="muted">
          Masih kosong. <Link href="/produk" style={{ color: "var(--red)", fontWeight: 600 }}>Lihat produk</Link>
        </p>
      ) : (
        <div className="checkout">
          <div>
            {items.map(({ line, product }) => (
              <div key={line.slug} className="line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(product!.image, 128)} alt="" />
                <div>
                  <strong>{product!.name}</strong>
                  <button type="button" className="link-btn" onClick={() => remove(line.slug)}>Hapus</button>
                </div>
                <Stepper qty={line.qty} onChange={(q) => setQty(line.slug, q)} />
              </div>
            ))}
            <button type="button" className="link-btn" style={{ marginTop: "1rem" }} onClick={clear}>
              Kosongkan keranjang
            </button>
          </div>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label className="field">
              Nama
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="field">
              Ambil atau antar
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="antar">Pesan antar</option>
                <option value="ambil">Ambil di toko</option>
              </select>
            </label>
            {mode === "antar" ? (
              <label className="field">
                Alamat
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
              </label>
            ) : null}
            <label className="field">
              Catatan
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
            <a className="btn btn-red btn-block" href={waLink(message)}>
              Kirim pesanan via WhatsApp
            </a>
            <p className="fine">Harga dan ongkir dikonfirmasi admin lewat WhatsApp.</p>
          </form>
        </div>
      )}
    </section>
  );
}
