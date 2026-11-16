"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { CartLines, CartTotal } from "./CartLines";

export function CartDrawer({ onClose }: { onClose: () => void }) {
  const { lines } = useCart();
  const totalItems = lines.reduce((acc, l) => acc + l.qty, 0);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="drawer-bg" onClick={onClose} role="presentation">
      <aside
        className="drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang Belanja"
      >
        {/* Header Tetap / Sticky Header */}
        <div className="drawer-top">
          <div className="drawer-heading">
            <h2>Keranjang</h2>
            {totalItems > 0 && <span className="drawer-badge">{totalItems} item</span>}
          </div>
          <button
            className="drawer-close"
            type="button"
            onClick={onClose}
            aria-label="Tutup keranjang"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Items Body */}
        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="drawer-empty">
              <span className="drawer-empty-icon">🛒</span>
              <p className="muted">Keranjang Anda masih kosong</p>
              <Link className="btn btn-red" href="/produk" onClick={onClose} style={{ marginTop: "0.5rem" }}>
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <div className="drawer-lines">
              <CartLines />
            </div>
          )}
        </div>

        {/* Footer Tetap / Sticky Footer */}
        {lines.length > 0 && (
          <div className="drawer-foot">
            <CartTotal />
            <Link className="btn btn-red btn-block" href="/keranjang" onClick={onClose}>
              Lanjut ke Pemesanan WhatsApp →
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
