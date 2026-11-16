"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, formatRp, products, thumb } from "@/data/products";
import { dayKey, LOW_STOCK, saleTotal, useAdminAuth, useSales, type Sale, type SaleItem, type Stock } from "@/lib/sales";
import { AdminLogin } from "./AdminLogin";
import { DashboardOverview } from "./DashboardOverview";
import { ProductManager } from "./ProductManager";
import { formatWaktu, Receipt } from "./Receipt";

type Tab = "overview" | "products" | "kasir" | "terjual" | "stok" | "settings";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Ringkasan", icon: "📊" },
  { id: "products", label: "Kelola Produk & Foto", icon: "📸" },
  { id: "kasir", label: "Kasir POS", icon: "🛒" },
  { id: "terjual", label: "Laporan Penjualan", icon: "🧾" },
  { id: "stok", label: "Kelola Stok", icon: "📦" },
  { id: "settings", label: "Pengaturan", icon: "⚙️" },
];

const payments = ["Tunai", "Transfer", "QRIS"];
const priced = products.filter((p) => p.price);

/** Dashboard pemilik: kasir + kuitansi, ringkasan analytics, daftar terjual, daftar stok. */
export function Admin() {
  const auth = useAdminAuth();
  const { sales, stock, ready, record, remove, setStockOf } = useSales();
  const [tab, setTab] = useState<Tab>("overview");
  const [shown, setShown] = useState<Sale | null>(null);

  if (!auth.ready || !ready) return <p className="fine">Memuat…</p>;
  if (!auth.isAuth) return <AdminLogin />;

  return (
    <div className="adm">
      {/* Topbar Dashboard Profesional */}
      <div className="adm-topbar">
        <div className="adm-brand-cell">
          <div className="adm-brand-avatar">🏪</div>
          <div>
            <h2 className="adm-brand-title">Alba Food Market</h2>
            <div className="adm-user-info">
              <span className="adm-user-dot" />
              <span>Portal Pemilik Toko · Online</span>
            </div>
          </div>
        </div>

        <div className="adm-user-actions">
          <Link href="/" target="_blank" className="adm-btn-text" title="Buka website toko">
            ↗ Buka Toko
          </Link>
          <button
            type="button"
            className="adm-btn-text adm-btn-logout"
            onClick={auth.logout}
            title="Keluar dari sesi dashboard"
          >
            🚪 Keluar
          </button>
        </div>
      </div>

      {/* Navigasi Tab Dashboard */}
      <div className="adm-tabs" role="tablist" aria-label="Menu Dashboard">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className="adm-tab-btn"
          >
            <span className="adm-tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Konten Setiap Tab */}
      {tab === "overview" ? (
        <DashboardOverview
          sales={sales}
          stock={stock}
          onOpenReceipt={setShown}
          onSwitchTab={(target) => setTab(target as Tab)}
        />
      ) : null}

      {tab === "products" ? <ProductManager /> : null}

      {tab === "kasir" ? (
        <Kasir
          stock={stock}
          onSave={(s) => setShown(record(s))}
          onQuickOverview={() => setTab("overview")}
        />
      ) : null}

      {tab === "terjual" ? (
        <Terjual sales={sales} onOpen={setShown} onRemove={remove} />
      ) : null}

      {tab === "stok" ? (
        <Stok stock={stock} sales={sales} onSet={setStockOf} />
      ) : null}

      {tab === "settings" ? (
        <SettingsView auth={auth} sales={sales} stock={stock} />
      ) : null}

      {/* Pop-up Kuitansi */}
      {shown ? <Receipt sale={shown} onClose={() => setShown(null)} /> : null}
    </div>
  );
}

/* ---------- 1. KASIR POS ---------- */
function Kasir({
  stock,
  onSave,
  onQuickOverview,
}: {
  stock: Record<string, number>;
  onSave: (s: { buyer: string; pay: string; note: string; items: SaleItem[] }) => void;
  onQuickOverview: () => void;
}) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [buyer, setBuyer] = useState("");
  const [pay, setPay] = useState(payments[0]);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("semua");

  const filteredPriced = useMemo(() => {
    return priced.filter((p) => {
      const matchCat = activeCat === "semua" || p.category === activeCat;
      const matchQuery =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCat, search]);

  const items: SaleItem[] = priced
    .filter((p) => qty[p.slug] > 0)
    .map((p) => ({ slug: p.slug, name: p.name, pack: p.pack, qty: qty[p.slug], price: p.price! }));
  const total = saleTotal(items);
  const totalItemsCount = items.reduce((a, i) => a + i.qty, 0);
  const over = items.filter((i) => i.slug in stock && i.qty > stock[i.slug]);

  const bump = (slug: string, d: number) =>
    setQty((m) => ({ ...m, [slug]: Math.max(0, (m[slug] ?? 0) + d) }));

  const save = () => {
    onSave({ buyer: buyer.trim(), pay, note: note.trim(), items });
    setQty({});
    setBuyer("");
    setNote("");
  };

  return (
    <div className="adm-kasir">
      <div className="adm-pos-catalog">
        {/* Filter & Pencarian Cepat di Kasir */}
        <div className="adm-pos-filter-bar">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk kasir..."
            className="adm-pos-search"
          />
          <div className="adm-pos-chips">
            <button
              type="button"
              className="chip"
              data-on={activeCat === "semua"}
              onClick={() => setActiveCat("semua")}
            >
              Semua
            </button>
            {categories
              .filter((c) => c.id !== "semua")
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  data-on={activeCat === c.id}
                  onClick={() => setActiveCat(c.id)}
                >
                  {c.label}
                </button>
              ))}
          </div>
        </div>

        {/* Daftar Produk Kasir */}
        <ul className="adm-pick">
          {filteredPriced.map((p) => {
            const left = stock[p.slug];
            const isSelected = (qty[p.slug] ?? 0) > 0;
            return (
              <li key={p.slug} data-cat={p.category} data-on={isSelected}>
                <div className="adm-pick-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(p.image, 100)} alt={p.name} width={42} height={42} />
                </div>
                <div className="adm-pick-info">
                  <strong>{p.name}</strong>
                  <small>
                    {p.pack ? `${p.pack} · ` : ""}
                    <b style={{ color: "var(--red)" }}>{formatRp(p.price!)}</b>
                    {left !== undefined ? (
                      <em data-low={left <= LOW_STOCK}> · stok {left}</em>
                    ) : null}
                  </small>
                </div>
                <span className="qty">
                  <button type="button" aria-label={`Kurangi ${p.name}`} onClick={() => bump(p.slug, -1)}>
                    −
                  </button>
                  <span>{qty[p.slug] ?? 0}</span>
                  <button type="button" aria-label={`Tambah ${p.name}`} onClick={() => bump(p.slug, 1)}>
                    +
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sisi Ringkasan Transaksi Pembeli */}
      <aside className="adm-pay">
        <h2>Detail Transaksi</h2>
        <label className="field">
          Nama pembeli <small>(opsional)</small>
          <input
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            placeholder="Contoh: Bu Rina"
            autoComplete="off"
          />
        </label>

        <label className="field" style={{ marginBottom: "0.4rem" }}>
          <span>Metode Pembayaran</span>
        </label>
        <div className="adm-seg" role="radiogroup" aria-label="Pembayaran">
          {payments.map((m) => (
            <button key={m} type="button" role="radio" aria-checked={pay === m} onClick={() => setPay(m)}>
              {m}
            </button>
          ))}
        </div>

        <label className="field">
          Catatan transaksi <small>(opsional)</small>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Contoh: Pesanan untuk arisan"
            autoComplete="off"
          />
        </label>

        <div className="total">
          <div>
            <span>Total Bayar</span>
            <strong>{formatRp(total)}</strong>
          </div>
          <p>{items.length ? `${totalItemsCount} barang dipilih` : "Belum ada produk dipilih"}</p>
        </div>

        {over.length ? (
          <p className="adm-warn">
            ⚠️ Melebihi stok: {over.map((i) => i.name).join(", ")}. Stok akan jadi 0.
          </p>
        ) : null}

        <button
          className="btn btn-red btn-block"
          type="button"
          disabled={!items.length}
          onClick={save}
        >
          Simpan Transaksi &amp; Buat Kuitansi
        </button>
      </aside>
    </div>
  );
}

/* ---------- 2. LAPORAN PENJUALAN ---------- */
function Terjual({
  sales,
  onOpen,
  onRemove,
}: {
  sales: Sale[];
  onOpen: (s: Sale) => void;
  onRemove: (id: string) => void;
}) {
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
    const rows = [["No Kuitansi", "Waktu", "Pembeli", "Metode Bayar", "Produk", "Jumlah", "Harga Satuan", "Subtotal"]];
    for (const s of list)
      for (const i of s.items)
        rows.push([
          s.id,
          formatWaktu(s.at),
          s.buyer || "-",
          s.pay,
          i.name,
          String(i.qty),
          String(i.price),
          String(i.qty * i.price),
        ]);
    const url = URL.createObjectURL(new Blob([rows.map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv;charset=utf-8;" }));
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `laporan-penjualan-alba-${day || "semua"}.csv`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="adm-sold">
      <div className="adm-stats">
        <p>
          <span>Total Omzet</span>
          <b>{formatRp(omzet)}</b>
        </p>
        <p>
          <span>Transaksi</span>
          <b>{list.length} pesanan</b>
        </p>
        <p>
          <span>Barang Terjual</span>
          <b>{sold.reduce((a, r) => a + r.qty, 0)} pack</b>
        </p>
      </div>

      <div className="adm-bar">
        <label className="field" style={{ margin: 0 }}>
          <span>Filter Tanggal</span>
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
        </label>
        {day ? (
          <button className="link-btn" type="button" onClick={() => setDay("")}>
            Tampilkan Semua
          </button>
        ) : null}
        <button className="btn" type="button" disabled={!list.length} onClick={exportCsv}>
          📥 Ekspor CSV
        </button>
      </div>

      {list.length === 0 ? (
        <p className="adm-empty">Belum ada penjualan{day ? " pada tanggal ini" : ""}.</p>
      ) : (
        <>
          <div className="dash-card" style={{ marginBottom: "1.5rem" }}>
            <h3>Rekap Produk Terjual</h3>
            <ol className="adm-rank">
              {sold.map((r) => (
                <li key={r.name}>
                  <span>{r.name}</span>
                  <span>{r.qty} terjual</span>
                  <b>{formatRp(r.sum)}</b>
                </li>
              ))}
            </ol>
          </div>

          <div className="dash-card">
            <h3>Daftar Riwayat Transaksi</h3>
            <ul className="adm-list">
              {list.map((s) => (
                <li key={s.id}>
                  <button type="button" onClick={() => onOpen(s)} title="Buka kuitansi">
                    <span>
                      <strong>{s.id}</strong>
                      <small>
                        {formatWaktu(s.at)} {s.buyer ? ` · ${s.buyer}` : ""} · {s.pay}
                      </small>
                    </span>
                    <b>{formatRp(s.total)}</b>
                  </button>
                  <button
                    className="link-btn"
                    type="button"
                    style={{ color: "var(--red)" }}
                    onClick={() =>
                      confirm(`Hapus transaksi ${s.id}? Stok produk akan dikembalikan otomatis.`) &&
                      onRemove(s.id)
                    }
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- 3. KELOLA STOK ---------- */
function Stok({
  stock,
  sales,
  onSet,
}: {
  stock: Record<string, number>;
  sales: Sale[];
  onSet: (slug: string, qty: number | null) => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("semua");

  const soldBy = useMemo(() => {
    const m: Record<string, number> = {};
    for (const s of sales) for (const i of s.items) m[i.slug] = (m[i.slug] ?? 0) + i.qty;
    return m;
  }, [sales]);

  const filteredPriced = useMemo(() => {
    return priced.filter((p) => {
      const matchCat = activeCat === "semua" || p.category === activeCat;
      const matchQuery =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCat, search]);

  const low = priced.filter((p) => {
    const q = stock[p.slug] !== undefined ? stock[p.slug] : (p.stock ?? 20);
    return q <= LOW_STOCK;
  });

  return (
    <div className="adm-stok">
      {low.length ? (
        <div className="dash-alert-banner" style={{ marginBottom: "1.2rem" }}>
          <div className="dash-alert-info">
            <span className="dash-alert-icon">⚠️</span>
            <div>
              <strong>Ada {low.length} produk dengan stok menipis:</strong>
              <p>
                {low.map((p) => {
                  const q = stock[p.slug] !== undefined ? stock[p.slug] : (p.stock ?? 0);
                  return `${p.name} (sisa ${q})`;
                }).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="adm-pos-filter-bar">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk untuk update stok..."
          className="adm-pos-search"
        />
        <div className="adm-pos-chips">
          <button
            type="button"
            className="chip"
            data-on={activeCat === "semua"}
            onClick={() => setActiveCat("semua")}
          >
            Semua
          </button>
          {categories
            .filter((c) => c.id !== "semua")
            .map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                data-on={activeCat === c.id}
                onClick={() => setActiveCat(c.id)}
              >
                {c.label}
              </button>
            ))}
        </div>
      </div>

      <ul className="adm-list">
        {filteredPriced.map((p) => {
          const has = p.slug in stock;
          const n = stock[p.slug] !== undefined ? stock[p.slug] : (p.stock ?? 0);
          return (
            <li key={p.slug} data-cat={p.category} className="adm-row">
              <span>
                <strong>{p.name}</strong>
                <small>
                  {p.pack ? `${p.pack} · ` : ""}
                  terjual {soldBy[p.slug] ?? p.sold ?? 0} pack
                </small>
              </span>
              <span className="adm-stk" data-low={n <= LOW_STOCK}>
                <button
                  type="button"
                  aria-label={`Kurangi stok ${p.name}`}
                  onClick={() => onSet(p.slug, Math.max(0, n - 1))}
                >
                  −
                </button>
                <input
                  inputMode="numeric"
                  aria-label={`Stok ${p.name}`}
                  value={n}
                  onChange={(e) => onSet(p.slug, Number(e.target.value.replace(/\D/g, "")))}
                />
                <button
                  type="button"
                  aria-label={`Tambah stok ${p.name}`}
                  onClick={() => onSet(p.slug, n + 1)}
                >
                  +
                </button>
                {has && (
                  <button
                    className="link-btn"
                    type="button"
                    onClick={() => onSet(p.slug, null)}
                    title="Hapus pelacakan khusus stok ini"
                  >
                    Lepas
                  </button>
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="fine" style={{ marginTop: "1rem" }}>
        💡 Jumlah stok ini langsung tersinkronisasi dan tampil secara real-time pada kartu produk di website.
      </p>
    </div>
  );
}

/* ---------- 4. PENGATURAN TOKO ---------- */
function SettingsView({
  auth,
  sales,
  stock,
}: {
  auth: { changePassword: (np: string) => boolean };
  sales: Sale[];
  stock: Stock;
}) {
  const [newPass, setNewPass] = useState("");
  const [feedback, setFeedback] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.changePassword(newPass)) {
      setFeedback("✓ Password dashboard berhasil diperbarui!");
      setNewPass("");
      setTimeout(() => setFeedback(""), 3500);
    } else {
      setFeedback("❌ Password minimal harus 4 karakter.");
    }
  };

  const backupData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      store: "Alba Food Market",
      totalSales: sales.length,
      sales,
      stock,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `backup-alba-market-${dayKey(new Date())}.json`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="adm-settings-container">
      {/* Keamanan Dashboard */}
      <div className="dash-card">
        <h3>Keamanan &amp; Kata Sandi Dashboard</h3>
        <p className="dash-card-sub">
          Ubah password atau PIN pemilik untuk masuk ke dashboard ini di kemudian hari.
        </p>

        <form onSubmit={handlePasswordSubmit} className="adm-pass-form">
          <label className="field" style={{ maxWidth: 360 }}>
            <span>Password Baru (minimal 4 karakter)</span>
            <input
              type="text"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Contoh: alba2026 atau 123456"
              required
            />
          </label>
          {feedback && (
            <p
              className="fine"
              style={{
                color: feedback.startsWith("✓") ? "#15803d" : "#dc2626",
                fontWeight: 700,
                marginTop: "-0.2rem",
              }}
            >
              {feedback}
            </p>
          )}
          <button type="submit" className="btn btn-red" style={{ alignSelf: "flex-start" }}>
            Simpan Password Baru
          </button>
        </form>
      </div>

      {/* Cadangan & Ekspor */}
      <div className="dash-card" style={{ marginTop: "1.5rem" }}>
        <h3>Cadangan Data (Backup Data)</h3>
        <p className="dash-card-sub">
          Simpan salinan data riwayat penjualan ({sales.length} transaksi) dan stok produk ke dalam berkas cadangan JSON.
        </p>
        <div style={{ marginTop: "1rem" }}>
          <button type="button" className="btn" onClick={backupData}>
            📥 Unduh Backup Lengkap (.JSON)
          </button>
        </div>
      </div>
    </div>
  );
}
