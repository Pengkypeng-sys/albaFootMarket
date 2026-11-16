"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { CartLines, CartTotal } from "./CartLines";

export function CartDrawer({ onClose }: { onClose: () => void }) {
  const { lines } = useCart();
  const totalItems = lines.reduce((acc, l) => acc + l.qty, 0);

  // Esc menutup; scroll halaman dikunci selama drawer terbuka (tanpa menggeser lebar halaman)
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
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
        {/* Header: tetap di atas */}
        <div className="drawer-top">
          <div className="drawer-heading">
            <h2>Keranjang</h2>
            {totalItems > 0 && <span className="drawer-badge">{totalItems} item</span>}
          </div>
          <button className="drawer-close" type="button" onClick={onClose} aria-label="Tutup keranjang">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Isi: satu-satunya bagian yang scroll */}
        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="drawer-empty">
              <svg className="drawer-empty-icon" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 4h2l2.4 11h10.2L20 7H6.2" />
                <circle cx="9" cy="19.5" r="1.3" />
                <circle cx="17" cy="19.5" r="1.3" />
              </svg>
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

        {/* Footer: tetap di bawah */}
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
