"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatRp, type Product } from "@/data/products";
import { useCatalog } from "./catalog";
import { useSales } from "./sales";

export type CartLine = {
  slug: string;
  qty: number;
};

/** Baris keranjang yang sudah dilengkapi produk terkini, subtotal, dan batas stok. */
export type CartItem = {
  slug: string;
  qty: number;
  product: Product;
  /** undefined bila produk belum punya harga. */
  subtotal?: number;
  /** Stok tersedia; undefined untuk pre-order. */
  max?: number;
};

type CartApi = {
  lines: CartLine[];
  items: CartItem[];
  /** Total + jumlah baris yang harganya belum ada (ditanyakan via WhatsApp). */
  total: { sum: number; unpriced: number };
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
  const { getProduct, ready: catalogReady } = useCatalog();
  const { stockOf, ready: salesReady } = useSales();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(parsed.filter((l) => typeof l.slug === "string" && typeof l.qty === "number" && l.qty > 0));
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

  const maxOf = useMemo(
    () => (slug: string) => {
      const p = getProduct(slug);
      return !p || p.preorder ? undefined : stockOf(slug);
    },
    [getProduct, stockOf],
  );

  // Setelah katalog dan stok termuat: buang produk yang sudah dihapus, turunkan jumlah yang melebihi stok.
  useEffect(() => {
    if (!ready || !catalogReady || !salesReady) return;
    setLines((prev) => {
      const next = prev.flatMap((l) => {
        if (!getProduct(l.slug)) return [];
        const max = maxOf(l.slug);
        const qty = max === undefined ? l.qty : Math.min(l.qty, max);
        return qty > 0 ? [{ ...l, qty }] : [];
      });
      return next.length === prev.length && next.every((l, i) => l.qty === prev[i].qty) ? prev : next;
    });
  }, [ready, catalogReady, salesReady, getProduct, maxOf]);

  const api = useMemo<CartApi>(() => {
    const items = lines.flatMap<CartItem>((l) => {
      const product = getProduct(l.slug);
      if (!product) return [];
      return [
        {
          slug: l.slug,
          qty: l.qty,
          product,
          subtotal: product.price ? product.price * l.qty : undefined,
          max: maxOf(l.slug),
        },
      ];
    });
    const total = { sum: 0, unpriced: 0 };
    for (const i of items) {
      if (i.subtotal === undefined) total.unpriced++;
      else total.sum += i.subtotal;
    }
    const cap = (slug: string, qty: number) => {
      const max = maxOf(slug);
      return max === undefined ? qty : Math.min(qty, max);
    };
    return {
      lines,
      items,
      total,
      ready,
      count: items.reduce((n, i) => n + i.qty, 0),
      add(slug, qty = 1) {
        setLines((prev) => {
          const have = prev.find((l) => l.slug === slug)?.qty ?? 0;
          const next = cap(slug, have + qty);
          if (next <= 0) return prev;
          return have ? prev.map((l) => (l.slug === slug ? { ...l, qty: next } : l)) : [...prev, { slug, qty: next }];
        });
      },
      setQty(slug, qty) {
        const next = cap(slug, qty);
        setLines((prev) =>
          next <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty: next } : l)),
        );
      },
      remove(slug) {
        setLines((prev) => prev.filter((l) => l.slug !== slug));
      },
      clear() {
        setLines([]);
      },
    };
  }, [lines, ready, getProduct, maxOf]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart di luar CartProvider");
  return ctx;
}

export type OrderForm = { name: string; mode: "antar" | "ambil"; address: string; note: string };

const CODE_LABEL = "Kode pesanan (untuk kasir)";

/** Teks pesanan untuk WhatsApp: tiap baris lengkap dengan harga satuan, subtotal, total, dan kode untuk kasir. */
export function orderMessage(items: CartItem[], form: OrderForm, total: CartApi["total"]): string {
  const rows = items.flatMap(({ product: p, qty, subtotal }, i) => {
    const unit = p.price ? ` ${formatRp(p.price)}` : "";
    return [
      `${i + 1}. ${p.name}${p.pack ? ` (${p.pack})` : ""}${p.preorder ? " [pre-order]" : ""}`,
      `   ${qty} x${unit} = ${subtotal === undefined ? "harga dikonfirmasi" : formatRp(subtotal)}`,
    ];
  });
  return [
    "Halo Alba Food Market, saya mau pesan:",
    "",
    ...rows,
    "",
    `Total: ${formatRp(total.sum)}${total.unpriced ? ` (+ ${total.unpriced} item harga dikonfirmasi)` : ""}`,
    "",
    `Nama: ${form.name || "-"}`,
    `Ambil/antar: ${form.mode === "ambil" ? "Ambil di toko" : "Antar"}`,
    ...(form.mode === "antar" ? [`Alamat: ${form.address || "-"}`] : []),
    `Catatan: ${form.note || "-"}`,
    "",
    `${CODE_LABEL}: ${items.map((i) => `${i.slug}*${i.qty}`).join(", ")}`,
  ].join("\n");
}

export type ParsedOrder = { items: CartLine[]; name: string; note: string };

/** Baca pesanan WhatsApp yang dibuat `orderMessage` (dari kode pesanan). Null bila kode tidak ada. */
export function parseOrderMessage(text: string): ParsedOrder | null {
  const code = text.match(/Kode pesanan[^:\n]*:\s*(.+)/i)?.[1];
  if (!code) return null;
  const items: CartLine[] = [];
  for (const part of code.split(/[,;]/)) {
    const m = part.trim().match(/^([a-z0-9-]+)\*(\d+)$/);
    if (m && Number(m[2]) > 0) items.push({ slug: m[1], qty: Number(m[2]) });
  }
  const field = (label: string) => text.match(new RegExp(`^${label}:\\s*(.+)$`, "im"))?.[1].trim() ?? "";
  const name = field("Nama");
  const note = field("Catatan");
  return { items, name: name === "-" ? "" : name, note: note === "-" ? "" : note };
}
