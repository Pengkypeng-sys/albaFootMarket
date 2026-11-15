"use client";

/** Tombol − n + yang dipakai kartu, detail, keranjang, dan drawer. */
export function Stepper({ qty, onChange, min = 0 }: { qty: number; onChange: (q: number) => void; min?: number }) {
  return (
    <span className="qty">
      <button type="button" onClick={() => onChange(Math.max(min, qty - 1))} aria-label="Kurangi">−</button>
      <span aria-live="polite">{qty}</span>
      <button type="button" onClick={() => onChange(qty + 1)} aria-label="Tambah">+</button>
    </span>
  );
}
