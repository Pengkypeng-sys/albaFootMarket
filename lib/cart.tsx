"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

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
