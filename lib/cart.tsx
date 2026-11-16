"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatRp, products, type Product } from "@/data/products";

export type CartLine = {
  slug: string;
  qty: number;
};

type CartApi = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const KEY = "alba-cart-v1";
const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (l) =>
                typeof l.slug === "string" &&
                typeof l.qty === "number" &&
                l.qty > 0 &&
                products.some((p) => p.slug === l.slug),
            ),
          );
        }
      }
    } catch {
      /* keranjang rusak diabaikan */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const api = useMemo<CartApi>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    return {
      lines,
      ready,
      count,
      add(slug, qty = 1) {
        setLines((prev) => {
          const hit = prev.find((l) => l.slug === slug);
          if (!hit) return [...prev, { slug, qty }];
          return prev.map((l) =>
            l.slug === slug ? { ...l, qty: l.qty + qty } : l,
          );
        });
      },
      setQty(slug, qty) {
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
        );
      },
      remove(slug) {
        setLines((prev) => prev.filter((l) => l.slug !== slug));
      },
      clear() {
        setLines([]);
      },
    };
  }, [lines, ready]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart di luar CartProvider");
  return ctx;
}

export function lineProduct(line: CartLine): Product | undefined {
  return products.find((p) => p.slug === line.slug);
}

/** Subtotal satu baris; undefined jika produk belum punya harga. */
export function lineTotal(line: CartLine): number | undefined {
  const price = lineProduct(line)?.price;
  return price ? price * line.qty : undefined;
}

/** Total keranjang + jumlah baris yang harganya belum ada (ditanyakan via WhatsApp). */
export function cartTotal(lines: CartLine[]): { sum: number; unpriced: number } {
  let sum = 0;
  let unpriced = 0;
  for (const l of lines) {
    const t = lineTotal(l);
    if (t === undefined) unpriced++;
    else sum += t;
  }
  return { sum, unpriced };
}

export type OrderForm = { name: string; mode: "antar" | "ambil"; address: string; note: string };

/** Teks pesanan untuk WhatsApp: tiap baris lengkap dengan harga satuan, subtotal, dan total. */
export function orderMessage(lines: CartLine[], form: OrderForm): string {
  const rows = lines.flatMap((line, i) => {
    const p = lineProduct(line);
    if (!p) return [];
    const unit = p.price ? ` ${formatRp(p.price)}` : "";
    const sub = lineTotal(line);
    return [
      `${i + 1}. ${p.name}${p.pack ? ` (${p.pack})` : ""}${p.preorder ? " [pre-order]" : ""}`,
      `   ${line.qty} x${unit} = ${sub === undefined ? "harga dikonfirmasi" : formatRp(sub)}`,
    ];
  });
  const { sum, unpriced } = cartTotal(lines);
  return [
    "Halo Alba Food Market, saya mau pesan:",
    "",
    ...rows,
    "",
    `Total: ${formatRp(sum)}${unpriced ? ` (+ ${unpriced} item harga dikonfirmasi)` : ""}`,
    "",
    `Nama: ${form.name || "-"}`,
    `Ambil/antar: ${form.mode === "ambil" ? "Ambil di toko" : "Antar"}`,
    ...(form.mode === "antar" ? [`Alamat: ${form.address || "-"}`] : []),
    `Catatan: ${form.note || "-"}`,
  ].join("\n");
}
