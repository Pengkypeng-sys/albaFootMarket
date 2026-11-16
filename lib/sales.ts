"use client";

import { useCallback, useEffect, useState } from "react";
import { products } from "@/data/products";

export type SaleItem = { slug: string; name: string; pack?: string; qty: number; price: number };
export type Sale = {
  id: string;
  at: string;
  buyer: string;
  pay: string;
  note: string;
  items: SaleItem[];
  total: number;
};
/** Stok per slug; slug yang tidak ada = belum dicatat (tidak dibatasi). */
export type Stock = Record<string, number>;
export type SaleInput = Pick<Sale, "buyer" | "pay" | "note" | "items">;

const SALES_KEY = "alba-sales-v1";
const STOCK_KEY = "alba-stock-v1";
export const LOW_STOCK = 5;

export const DEFAULT_ADMIN_PASS = "alba123";
export const DEFAULT_ADMIN_PIN = "123456";
const AUTH_KEY = "alba-auth-session";
const PASS_KEY = "alba-admin-pass";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Tanggal WIB "YYYY-MM-DD", apa pun zona waktu perangkat. */
export function dayKey(d: Date | string | number): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta" }).format(new Date(d));
}

export const saleTotal = (items: SaleItem[]) => items.reduce((sum, i) => sum + i.qty * i.price, 0);

/** Nomor kuitansi AFM-YYMMDD-001, urut per hari dan tidak bentrok setelah ada yang dihapus. */
function nextId(sales: Sale[], now: Date): string {
  const prefix = `AFM-${dayKey(now).slice(2).replaceAll("-", "")}-`;
  const last = sales.reduce((max, s) => (s.id.startsWith(prefix) ? Math.max(max, Number(s.id.slice(prefix.length))) : max), 0);
  return prefix + String(last + 1).padStart(3, "0");
}

function notifyUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("alba:data-updated"));
  }
}

/** Penjualan dan stok, disimpan di localStorage perangkat ini saja. */
export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [stock, setStock] = useState<Stock>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Jika belum ada stok tersimpan, inisialisasi dari daftar katalog produk default
    const savedStock = load<Stock | null>(STOCK_KEY, null);
    if (!savedStock) {
      const initialStock: Stock = {};
      for (const p of products) {
        if (p.stock !== undefined) initialStock[p.slug] = p.stock;
      }
      setStock(initialStock);
      localStorage.setItem(STOCK_KEY, JSON.stringify(initialStock));
    } else {
      setStock(savedStock);
    }
    setSales(load<Sale[]>(SALES_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(SALES_KEY, JSON.stringify(sales));
      notifyUpdated();
    }
  }, [sales, ready]);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
      notifyUpdated();
    }
  }, [stock, ready]);

  /** Simpan transaksi dan kurangi stok produk yang stoknya dicatat. */
  const record = useCallback(
    (input: SaleInput): Sale => {
      const now = new Date();
      const sale: Sale = { ...input, id: nextId(sales, now), at: now.toISOString(), total: saleTotal(input.items) };
      setSales((s) => [sale, ...s]);
      setStock((st) => {
        const next = { ...st };
        for (const i of input.items) if (i.slug in next) next[i.slug] = Math.max(0, next[i.slug] - i.qty);
        return next;
      });
      return sale;
    },
    [sales],
  );

  /** Hapus transaksi dan kembalikan stoknya. */
  const remove = useCallback(
    (id: string) => {
      const sale = sales.find((s) => s.id === id);
      if (!sale) return;
      setSales((s) => s.filter((x) => x.id !== id));
      setStock((st) => {
        const next = { ...st };
        for (const i of sale.items) if (i.slug in next) next[i.slug] += i.qty;
        return next;
      });
    },
    [sales],
  );

  const setStockOf = useCallback((slug: string, qty: number | null) => {
    setStock((st) => {
      const next = { ...st };
      if (qty === null) delete next[slug];
      else next[slug] = Math.max(0, Math.floor(qty));
      return next;
    });
  }, []);

  return { sales, stock, ready, record, remove, setStockOf };
}

/** Hook untuk menampilkan stok dan jumlah terjual secara live di tampilan website */
export function useLiveProductMeta(slug: string, baseStock = 20, baseSold = 100) {
  const [stock, setStock] = useState<number>(baseStock);
  const [sold, setSold] = useState<number>(baseSold);

  const compute = useCallback(() => {
    const st = load<Stock>(STOCK_KEY, {});
    const sl = load<Sale[]>(SALES_KEY, []);

    // Hitung stok live
    const liveStock = st[slug] !== undefined ? st[slug] : baseStock;
    setStock(liveStock);

    // Hitung terjual: baseSold + total qty terjual dari transaksi yang dicatat
    const addSold = sl.reduce((sum, sale) => {
      const it = sale.items.find((i) => i.slug === slug);
      return sum + (it ? it.qty : 0);
    }, 0);
    setSold(baseSold + addSold);
  }, [slug, baseStock, baseSold]);

  useEffect(() => {
    compute();
    const handleUpdate = () => compute();
    window.addEventListener("alba:data-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("alba:data-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [compute]);

  return {
    stock,
    sold,
    isLowStock: stock <= LOW_STOCK && stock > 0,
    isOutOfStock: stock <= 0,
  };
}

/** Hook autentikasi login pemilik toko untuk Dashboard */
export function useAdminAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem(AUTH_KEY);
    setIsAuth(session === "logged_in");
    setReady(true);
  }, []);

  const login = useCallback((passInput: string) => {
    const customPass = localStorage.getItem(PASS_KEY);
    const valid =
      passInput.trim() === DEFAULT_ADMIN_PASS ||
      passInput.trim() === DEFAULT_ADMIN_PIN ||
      (customPass && passInput.trim() === customPass);

    if (valid) {
      localStorage.setItem(AUTH_KEY, "logged_in");
      setIsAuth(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuth(false);
  }, []);

  const changePassword = useCallback((newPass: string) => {
    if (newPass.trim().length >= 4) {
      localStorage.setItem(PASS_KEY, newPass.trim());
      return true;
    }
    return false;
  }, []);

  return { isAuth, ready, login, logout, changePassword };
}
