"use client";

import { useMemo, useState } from "react";
import { formatRp, products } from "@/data/products";
import { dayKey, LOW_STOCK, saleTotal, useAdminAuth, useSales, type Sale, type SaleItem } from "@/lib/sales";
import { AdminLogin } from "./AdminLogin";
import { formatWaktu, Receipt } from "./Receipt";

type Tab = "kasir" | "terjual" | "stok";
const tabs: { id: Tab; label: string }[] = [
  { id: "kasir", label: "Kasir" },
  { id: "terjual", label: "Terjual" },
  { id: "stok", label: "Stok" },
];
const payments = ["Tunai", "Transfer", "QRIS"];
const priced = products.filter((p) => p.price);

/** Dashboard pemilik: kasir + kuitansi, daftar terjual, daftar stok. Data hanya di perangkat ini. */
export function Admin() {
  const auth = useAdminAuth();
  const { sales, stock, ready, record, remove, setStockOf } = useSales();
  const [tab, setTab] = useState<Tab>("kasir");
  const [shown, setShown] = useState<Sale | null>(null);

  if (!auth.ready || !ready) return <p className="fine">Memuat…</p>;
  if (!auth.isAuth) return <AdminLogin />;

  return (
    <div className="adm">
      <div className="adm-topbar">
        <div className="adm-user-info">
          <span className="adm-user-dot" />
          <span>Pemilik Toko (Online)</span>
        </div>
        <div className="adm-user-actions">
          <button
            type="button"
            className="adm-btn-text"
            onClick={() => {
              const np = prompt("Masukkan password baru (minimal 4 karakter):");
              if (np) {
                if (auth.changePassword(np)) alert("Password berhasil diubah!");
                else alert("Password minimal 4 karakter.");
              }
            }}
          >
            🔑 Ubah Password
          </button>
          <button
            type="button"
            className="adm-btn-text adm-btn-logout"
            onClick={auth.logout}
          >
            🚪 Keluar (Logout)
          </button>
        </div>
      </div>

      <div className="adm-tabs" role="tablist" aria-label="Dashboard">
        {tabs.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "kasir" ? <Kasir stock={stock} onSave={(s) => setShown(record(s))} /> : null}
      {tab === "terjual" ? <Terjual sales={sales} onOpen={setShown} onRemove={remove} /> : null}
      {tab === "stok" ? <Stok stock={stock} sales={sales} onSet={setStockOf} /> : null}
      {shown ? <Receipt sale={shown} onClose={() => setShown(null)} /> : null}
    </div>
  );
}

/* ---------- kasir ---------- */
function Kasir({ stock, onSave }: { stock: Record<string, number>; onSave: (s: { buyer: string; pay: string; note: string; items: SaleItem[] }) => void }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [buyer, setBuyer] = useState("");
  const [pay, setPay] = useState(payments[0]);
  const [note, setNote] = useState("");

  const items: SaleItem[] = priced
    .filter((p) => qty[p.slug] > 0)
    .map((p) => ({ slug: p.slug, name: p.name, pack: p.pack, qty: qty[p.slug], price: p.price! }));
  const total = saleTotal(items);
  const over = items.filter((i) => i.slug in stock && i.qty > stock[i.slug]);

  const bump = (slug: string, d: number) => setQty((m) => ({ ...m, [slug]: Math.max(0, (m[slug] ?? 0) + d) }));
  const save = () => {
    onSave({ buyer: buyer.trim(), pay, note: note.trim(), items });
    setQty({});
    setBuyer("");
    setNote("");
  };

  return (
    <div className="adm-kasir">
      <ul className="adm-pick">
        {priced.map((p) => {
          const left = stock[p.slug];
          return (
            <li key={p.slug} data-cat={p.category} data-on={qty[p.slug] > 0}>
              <div>
                <strong>{p.name}</strong>
                <small>
                  {p.pack ? `${p.pack} · ` : ""}
                  {formatRp(p.price!)}
                  {left !== undefined ? <em data-low={left <= LOW_STOCK}> · stok {left}</em> : null}
                </small>
              </div>
              <span className="qty">
                <button type="button" aria-label={`Kurangi ${p.name}`} onClick={() => bump(p.slug, -1)}>−</button>
                <span>{qty[p.slug] ?? 0}</span>
                <button type="button" aria-label={`Tambah ${p.name}`} onClick={() => bump(p.slug, 1)}>+</button>
              </span>
            </li>
          );
        })}
      </ul>

      <aside className="adm-pay">
        <h2>Transaksi</h2>
        <label className="field">
          Nama pembeli <small>(opsional)</small>
          <input value={buyer} onChange={(e) => setBuyer(e.target.value)} autoComplete="off" />
        </label>
        <div className="adm-seg" role="radiogroup" aria-label="Pembayaran">
          {payments.map((m) => (
            <button key={m} type="button" role="radio" aria-checked={pay === m} onClick={() => setPay(m)}>
              {m}
            </button>
          ))}
        </div>
        <label className="field">
          Catatan <small>(opsional)</small>
          <input value={note} onChange={(e) => setNote(e.target.value)} autoComplete="off" />
        </label>
        <div className="total">
          <div>
            <span>Total</span>
            <strong>{formatRp(total)}</strong>
          </div>
          <p>{items.length ? `${items.reduce((a, i) => a + i.qty, 0)} barang` : "Pilih produk dulu"}</p>
        </div>
        {over.length ? <p className="adm-warn">Melebihi stok: {over.map((i) => i.name).join(", ")}. Stok akan jadi 0.</p> : null}
        <button className="btn btn-red btn-block" type="button" disabled={!items.length} onClick={save}>
          Simpan &amp; buat kuitansi
        </button>
      </aside>
    </div>
  );
}

/* ---------- terjual ---------- */
function Terjual({ sales, onOpen, onRemove }: { sales: Sale[]; onOpen: (s: Sale) => void; onRemove: (id: string) => void }) {
  const [day, setDay] = useState("");
  const list = useMemo(() => (day ? sales.filter((s) => dayKey(s.at) === day) : sales), [sales, day]);

  const omzet = list.reduce((a, s) => a + s.total, 0);
  const sold = useMemo(() => {
    const m = new Map<string, { name: string; qty: number; sum: number }>();
    for (const s of list)
      for (const i of s.items) {
        const cur = m.get(i.slug) ?? { name: i.name, qty: 0, sum: 0 };
        m.set(i.slug, { name: i.name, qty: cur.qty + i.qty, sum: cur.sum + i.qty * i.price });
      }
    return [...m.values()].sort((a, b) => b.qty - a.qty);
  }, [list]);

  const exportCsv = () => {
    const esc = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`;
    const rows = [["No", "Waktu", "Pembeli", "Bayar", "Produk", "Jumlah", "Harga", "Subtotal"]];
    for (const s of list) for (const i of s.items) rows.push([s.id, formatWaktu(s.at), s.buyer, s.pay, i.name, String(i.qty), String(i.price), String(i.qty * i.price)]);
    const url = URL.createObjectURL(new Blob([rows.map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `penjualan-alba-${day || "semua"}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="adm-sold">
      <div className="adm-stats">
        <p><span>Omzet</span><b>{formatRp(omzet)}</b></p>
        <p><span>Transaksi</span><b>{list.length}</b></p>
        <p><span>Barang terjual</span><b>{sold.reduce((a, r) => a + r.qty, 0)}</b></p>
      </div>
      <div className="adm-bar">
        <label className="field">
          Tanggal
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
        </label>
        {day ? <button className="link-btn" type="button" onClick={() => setDay("")}>Semua tanggal</button> : null}
        <button className="btn" type="button" disabled={!list.length} onClick={exportCsv}>Ekspor CSV</button>
      </div>

      {list.length === 0 ? (
        <p className="adm-empty">Belum ada penjualan{day ? " di tanggal ini" : ""}.</p>
      ) : (
        <>
          <h2>Produk terlaris</h2>
          <ol className="adm-rank">
            {sold.map((r) => (
              <li key={r.name}><span>{r.name}</span><span>{r.qty} terjual</span><b>{formatRp(r.sum)}</b></li>
            ))}
          </ol>
          <h2>Riwayat transaksi</h2>
          <ul className="adm-list">
            {list.map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => onOpen(s)}>
                  <span><strong>{s.id}</strong><small>{formatWaktu(s.at)}{s.buyer ? ` · ${s.buyer}` : ""} · {s.pay}</small></span>
                  <b>{formatRp(s.total)}</b>
                </button>
                <button className="link-btn" type="button" onClick={() => confirm(`Hapus ${s.id}? Stok dikembalikan.`) && onRemove(s.id)}>
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ---------- stok ---------- */
function Stok({ stock, sales, onSet }: { stock: Record<string, number>; sales: Sale[]; onSet: (slug: string, qty: number | null) => void }) {
  const soldBy = useMemo(() => {
    const m: Record<string, number> = {};
    for (const s of sales) for (const i of s.items) m[i.slug] = (m[i.slug] ?? 0) + i.qty;
    return m;
  }, [sales]);
  const low = priced.filter((p) => p.slug in stock && stock[p.slug] <= LOW_STOCK);

  return (
    <div className="adm-stok">
      {low.length ? <p className="adm-warn">Stok menipis: {low.map((p) => `${p.name} (${stock[p.slug]})`).join(", ")}</p> : null}
      <ul className="adm-list">
        {priced.map((p) => {
          const has = p.slug in stock;
          const n = stock[p.slug];
          return (
            <li key={p.slug} data-cat={p.category} className="adm-row">
              <span>
                <strong>{p.name}</strong>
                <small>{p.pack ? `${p.pack} · ` : ""}terjual {soldBy[p.slug] ?? 0}</small>
              </span>
              {has ? (
                <span className="adm-stk" data-low={n <= LOW_STOCK}>
                  <button type="button" aria-label={`Kurangi stok ${p.name}`} onClick={() => onSet(p.slug, n - 1)}>−</button>
                  <input
                    inputMode="numeric"
                    aria-label={`Stok ${p.name}`}
                    value={n}
                    onChange={(e) => onSet(p.slug, Number(e.target.value.replace(/\D/g, "")))}
                  />
                  <button type="button" aria-label={`Tambah stok ${p.name}`} onClick={() => onSet(p.slug, n + 1)}>+</button>
                  <button className="link-btn" type="button" onClick={() => onSet(p.slug, null)}>Lepas</button>
                </span>
              ) : (
                <button className="btn" type="button" onClick={() => onSet(p.slug, 0)}>Catat stok</button>
              )}
            </li>
          );
        })}
      </ul>
      <p className="fine">Produk yang stoknya belum dicatat tidak dibatasi. Data tersimpan hanya di perangkat ini.</p>
    </div>
  );
}
