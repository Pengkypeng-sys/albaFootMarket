"use client";

/** Tombol − n + yang dipakai kartu, detail, keranjang, drawer, dan modal varian. */
export function Stepper({
  qty,
  onChange,
  min = 0,
  max,
}: {
  qty: number;
  onChange: (q: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <span className="qty">
      <button
        type="button"
        disabled={qty <= min}
        onClick={() => onChange(Math.max(min, qty - 1))}
        aria-label="Kurangi"
      >
        −
      </button>
      <span aria-live="polite">{qty}</span>
      <button
        type="button"
        disabled={max !== undefined && qty >= max}
        onClick={() => onChange(max !== undefined ? Math.min(max, qty + 1) : qty + 1)}
        aria-label="Tambah"
      >
        +
      </button>
    </span>
  );
}
