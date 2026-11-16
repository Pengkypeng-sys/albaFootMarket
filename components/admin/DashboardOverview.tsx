"use client";

import { useMemo } from "react";
import { formatRp, products, thumb } from "@/data/products";
import { dayKey, LOW_STOCK, type Sale, type Stock } from "@/lib/sales";
import { formatWaktu } from "./Receipt";

const priced = products.filter((p) => p.price);

export function DashboardOverview({
  sales,
  stock,
  onOpenReceipt,
  onSwitchTab,
}: {
  sales: Sale[];
  stock: Stock;
  onOpenReceipt: (sale: Sale) => void;
  onSwitchTab: (tab: "kasir" | "terjual" | "stok") => void;
}) {
  // 1. Perhitungan Omzet & Metrik Utama
  const totalRevenue = useMemo(() => sales.reduce((sum, s) => sum + s.total, 0), [sales]);
  const totalItemsSold = useMemo(
    () => sales.reduce((sum, s) => sum + s.items.reduce((acc, it) => acc + it.qty, 0), 0),
    [sales],
  );

  const todayStr = dayKey(new Date());
  const todaySales = useMemo(() => sales.filter((s) => dayKey(s.at) === todayStr), [sales, todayStr]);
  const todayRevenue = useMemo(() => todaySales.reduce((sum, s) => sum + s.total, 0), [todaySales]);
  const todayItems = useMemo(
    () => todaySales.reduce((sum, s) => sum + s.items.reduce((acc, it) => acc + it.qty, 0), 0),
    [todaySales],
  );

  // 2. Analisis Stok
  const lowStockItems = useMemo(() => {
    return priced.filter((p) => {
      const qty = stock[p.slug] !== undefined ? stock[p.slug] : (p.stock ?? 20);
      return qty <= LOW_STOCK;
    });
  }, [stock]);

  const outOfStockItems = useMemo(() => {
    return priced.filter((p) => {
      const qty = stock[p.slug] !== undefined ? stock[p.slug] : (p.stock ?? 20);
      return qty <= 0;
    });
  }, [stock]);

  // 3. Tren 7 Hari Terakhir untuk Grafik Batang
  const last7Days = useMemo(() => {
    const list: { key: string; label: string; date: string; total: number; count: number }[] = [];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dayKey(d);
      const daySales = sales.filter((s) => dayKey(s.at) === key);
      const total = daySales.reduce((sum, s) => sum + s.total, 0);

      list.push({
        key,
        label: i === 0 ? "Hari Ini" : dayNames[d.getDay()],
        date: d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
        total,
        count: daySales.length,
      });
    }
    return list;
  }, [sales]);

  const maxRevenueInChart = useMemo(() => {
    const max = Math.max(...last7Days.map((d) => d.total));
    return max > 0 ? max : 100000;
  }, [last7Days]);

  // 4. Produk Terlaris
  const topProducts = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; image: string; pack?: string; qty: number; revenue: number }>();

    for (const s of sales) {
      for (const item of s.items) {
        const prod = products.find((p) => p.slug === item.slug);
        const existing = map.get(item.slug);
        if (existing) {
          existing.qty += item.qty;
          existing.revenue += item.qty * item.price;
        } else {
          map.set(item.slug, {
            slug: item.slug,
            name: item.name,
            image: prod?.image || "/products/sambosa-frozen.jpg",
            pack: item.pack || prod?.pack,
            qty: item.qty,
            revenue: item.qty * item.price,
          });
        }
      }
    }

    // Jika belum ada penjualan di sales, buat leaderboard dari baseline katalog
    if (map.size === 0) {
      return products
        .slice(0, 5)
        .map((p) => ({
          slug: p.slug,
          name: p.name,
          image: p.image,
          pack: p.pack,
          qty: p.sold || 100,
          revenue: (p.sold || 100) * (p.price || 35000),
        }))
        .sort((a, b) => b.qty - a.qty);
    }

    return Array.from(map.values())
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [sales]);

  const maxSoldQty = useMemo(() => {
    return Math.max(...topProducts.map((p) => p.qty), 1);
  }, [topProducts]);

  // 5. Pembayaran Terpopuler
  const paymentStats = useMemo(() => {
    const counts: Record<string, { count: number; total: number }> = {
      Tunai: { count: 0, total: 0 },
      QRIS: { count: 0, total: 0 },
      Transfer: { count: 0, total: 0 },
    };

    for (const s of sales) {
      const pay = s.pay || "Tunai";
      if (!counts[pay]) counts[pay] = { count: 0, total: 0 };
      counts[pay].count += 1;
      counts[pay].total += s.total;
    }
    return counts;
  }, [sales]);

  return (
    <div className="dash-overview">
      {/* 1. Baris KPI Metric Cards */}
      <div className="dash-kpi-grid">
        {/* KPI 1: Total Omzet */}
        <div className="dash-kpi-card dash-kpi-revenue">
          <div className="dash-kpi-header">
            <span className="dash-kpi-icon">💰</span>
            <span className="dash-kpi-tag">Pendapatan</span>
          </div>
          <div className="dash-kpi-body">
            <strong className="dash-kpi-value">{formatRp(totalRevenue)}</strong>
            <p className="dash-kpi-sub">
              <span>Hari ini:</span> <b>{formatRp(todayRevenue)}</b>
            </p>
          </div>
        </div>

        {/* KPI 2: Total Transaksi */}
        <div className="dash-kpi-card dash-kpi-orders">
          <div className="dash-kpi-header">
            <span className="dash-kpi-icon">🧾</span>
            <span className="dash-kpi-tag">Transaksi</span>
          </div>
          <div className="dash-kpi-body">
            <strong className="dash-kpi-value">{sales.length} Pesanan</strong>
            <p className="dash-kpi-sub">
              <span>Hari ini:</span> <b>{todaySales.length} transaksi</b>
            </p>
          </div>
        </div>

        {/* KPI 3: Total Terjual */}
        <div className="dash-kpi-card dash-kpi-items">
          <div className="dash-kpi-header">
            <span className="dash-kpi-icon">📦</span>
            <span className="dash-kpi-tag">Produk Terjual</span>
          </div>
          <div className="dash-kpi-body">
            <strong className="dash-kpi-value">{totalItemsSold} Pack</strong>
            <p className="dash-kpi-sub">
              <span>Hari ini:</span> <b>{todayItems} pack</b>
            </p>
          </div>
        </div>

        {/* KPI 4: Status Stok & Peringatan */}
        <div
          className={`dash-kpi-card dash-kpi-stock ${lowStockItems.length > 0 ? "dash-kpi-warn" : ""}`}
          onClick={() => onSwitchTab("stok")}
          style={{ cursor: "pointer" }}
          title="Klik untuk membuka kelola stok"
        >
          <div className="dash-kpi-header">
            <span className="dash-kpi-icon">⚠️</span>
            <span className="dash-kpi-tag">Status Stok</span>
          </div>
          <div className="dash-kpi-body">
            <strong className="dash-kpi-value">
              {lowStockItems.length > 0 ? `${lowStockItems.length} Menipis` : "Stok Aman ✓"}
            </strong>
            <p className="dash-kpi-sub">
              <span>Habis:</span> <b>{outOfStockItems.length} produk</b>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Peringatan Stok Menipis (Jika Ada) */}
      {lowStockItems.length > 0 && (
        <div className="dash-alert-banner">
          <div className="dash-alert-info">
            <span className="dash-alert-icon">⚠️</span>
            <div>
              <strong>Perhatian: Ada {lowStockItems.length} produk yang stoknya menipis!</strong>
              <p>
                {lowStockItems.map((p) => {
                  const q = stock[p.slug] !== undefined ? stock[p.slug] : (p.stock ?? 0);
                  return `${p.name} (sisa ${q})`;
                }).join(" · ")}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-red"
            onClick={() => onSwitchTab("stok")}
          >
            Update Stok Sekarang →
          </button>
        </div>
      )}

      {/* 3. Baris Grafik Penjualan 7 Hari Terakhir */}
      <div className="dash-card dash-chart-card">
        <div className="dash-card-header">
          <div>
            <h3>Grafik Penjualan 7 Hari Terakhir</h3>
            <p className="dash-card-sub">Perkembangan omset harian toko Alba Food Market</p>
          </div>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => onSwitchTab("kasir")}
          >
            + Buka Kasir Baru
          </button>
        </div>

        <div className="dash-chart-container">
          <div className="dash-bars-wrap">
            {last7Days.map((d) => {
              const heightPct = Math.max(12, Math.round((d.total / maxRevenueInChart) * 100));
              const isToday = d.key === todayStr;
              return (
                <div key={d.key} className="dash-bar-col" data-today={isToday}>
                  <div className="dash-bar-tooltip">
                    <strong>{formatRp(d.total)}</strong>
                    <small>{d.count} transaksi</small>
                  </div>
                  <div className="dash-bar-track">
                    <div
                      className="dash-bar-fill"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <div className="dash-bar-labels">
                    <span className="dash-bar-day">{d.label}</span>
                    <span className="dash-bar-date">{d.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Baris Kolom Ganda: Produk Terlaris & Metode Pembayaran / Transaksi Terakhir */}
      <div className="dash-grid-two">
        {/* Kolom Kiri: Produk Terlaris */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3>Produk Paling Laris</h3>
              <p className="dash-card-sub">Peringkat produk berdasarkan volume penjualan</p>
            </div>
            <button
              type="button"
              className="link-btn"
              onClick={() => onSwitchTab("terjual")}
            >
              Lihat Semua →
            </button>
          </div>

          <div className="dash-rank-list">
            {topProducts.map((p, idx) => {
              const pct = Math.round((p.qty / maxSoldQty) * 100);
              return (
                <div key={p.slug} className="dash-rank-item">
                  <span className={`dash-rank-badge dash-rank-${idx + 1}`}>
                    #{idx + 1}
                  </span>
                  <div className="dash-rank-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb(p.image, 120)} alt={p.name} width={42} height={42} />
                  </div>
                  <div className="dash-rank-details">
                    <div className="dash-rank-name-row">
                      <strong>{p.name}</strong>
                      <span className="dash-rank-revenue">{formatRp(p.revenue)}</span>
                    </div>
                    <div className="dash-rank-bar-wrap">
                      <div className="dash-rank-bar" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="dash-rank-meta">
                      <small>{p.pack || "Pack"}</small>
                      <small className="dash-rank-qty">{p.qty} pack terjual</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Metode Pembayaran & Transaksi Terbaru */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3>Metode Pembayaran</h3>
              <p className="dash-card-sub">Distribusi transaksi pelanggan</p>
            </div>
          </div>

          <div className="dash-pay-grid">
            {Object.entries(paymentStats).map(([method, data]) => (
              <div key={method} className="dash-pay-card">
                <span className="dash-pay-method">{method}</span>
                <strong className="dash-pay-total">{formatRp(data.total)}</strong>
                <small className="dash-pay-count">{data.count} transaksi</small>
              </div>
            ))}
          </div>

          <div className="dash-recent-header">
            <h3>Transaksi Terakhir</h3>
            <button
              type="button"
              className="link-btn"
              onClick={() => onSwitchTab("terjual")}
            >
              Laporan Lengkap →
            </button>
          </div>

          {sales.length === 0 ? (
            <p className="adm-empty" style={{ padding: "1.5rem 0" }}>
              Belum ada transaksi. Buka tab <b>Kasir</b> untuk mencatat penjualan pertama!
            </p>
          ) : (
            <ul className="dash-recent-list">
              {sales.slice(0, 4).map((s) => (
                <li key={s.id} className="dash-recent-item" onClick={() => onOpenReceipt(s)}>
                  <div className="dash-recent-info">
                    <strong>{s.id}</strong>
                    <small>
                      {formatWaktu(s.at)} · {s.buyer || "Pelanggan"} · {s.pay}
                    </small>
                  </div>
                  <div className="dash-recent-amount">
                    <b>{formatRp(s.total)}</b>
                    <span className="dash-receipt-link">Kuitansi ↗</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 5. Aksi Cepat Dashboard */}
      <div className="dash-quick-actions">
        <button
          type="button"
          className="dash-action-btn"
          onClick={() => onSwitchTab("kasir")}
        >
          <span className="dash-action-icon">🛒</span>
          <div>
            <strong>Kasir Transaksi Baru</strong>
            <small>Input pesanan, pilih pembayaran &amp; cetak kuitansi</small>
          </div>
        </button>

        <button
          type="button"
          className="dash-action-btn"
          onClick={() => onSwitchTab("stok")}
        >
          <span className="dash-action-icon">📦</span>
          <div>
            <strong>Kelola Stok Produk</strong>
            <small>Pantau dan tambah persediaan barang toko</small>
          </div>
        </button>

        <button
          type="button"
          className="dash-action-btn"
          onClick={() => onSwitchTab("terjual")}
        >
          <span className="dash-action-icon">📊</span>
          <div>
            <strong>Laporan &amp; Ekspor CSV</strong>
            <small>Lihat rekap penjualan dan unduh data transaksi</small>
          </div>
        </button>
      </div>
    </div>
  );
}
