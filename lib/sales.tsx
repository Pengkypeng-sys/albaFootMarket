"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useCatalog } from "./catalog";

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
/** Stok yang diatur pemilik per slug. Slug yang tidak ada memakai stok awal produk di katalog. */
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

export type ProductMeta = {
  stock: number;
  sold: number;
  /** Batas jumlah yang boleh dibeli; undefined untuk pre-order (tanpa batas stok). */
  max: number | undefined;
  isLowStock: boolean;
  isOutOfStock: boolean;
};

type SalesApi = {
  sales: Sale[];
  /** Stok yang diatur pemilik (tanpa fallback katalog). */
  stock: Stock;
  ready: boolean;
  stockOf: (slug: string) => number;
  metaOf: (slug: string) => ProductMeta;
  record: (input: SaleInput) => Sale;
  remove: (id: string) => void;
  setStockOf: (slug: string, qty: number | null) => void;
};

const SalesContext = createContext<SalesApi | null>(null);

/**
 * Satu-satunya sumber stok dan penjualan. Kasir, tab Stok, kelola produk, kartu toko,
 * dan keranjang membaca state yang sama. Disimpan di localStorage perangkat ini saja.
 */
export function SalesProvider({ children }: { children: ReactNode }) {
  const { getProduct } = useCatalog();
  const [sales, setSales] = useState<Sale[]>([]);
  const [stock, setStock] = useState<Stock>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => {
      setSales(load<Sale[]>(SALES_KEY, []));
      setStock(load<Stock>(STOCK_KEY, {}));
    };
    read();
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === SALES_KEY || e.key === STOCK_KEY) read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(SALES_KEY, JSON.stringify(sales));
  }, [sales, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
  }, [stock, ready]);

  const api = useMemo<SalesApi>(() => {
    const baseStock = (slug: string) => getProduct(slug)?.stock ?? 0;
    const stockOf = (slug: string) => stock[slug] ?? baseStock(slug);

    const soldBy: Record<string, number> = {};
    for (const s of sales) for (const i of s.items) soldBy[i.slug] = (soldBy[i.slug] ?? 0) + i.qty;

    return {
      sales,
      stock,
      ready,
      stockOf,
      metaOf(slug) {
        const left = stockOf(slug);
        const preorder = getProduct(slug)?.preorder ?? false;
        return {
          stock: left,
          sold: (getProduct(slug)?.sold ?? 0) + (soldBy[slug] ?? 0),
          max: preorder ? undefined : left,
          isLowStock: !preorder && left > 0 && left <= LOW_STOCK,
          isOutOfStock: !preorder && left <= 0,
        };
      },
      /** Simpan transaksi dan kurangi stok semua produk di dalamnya. */
      record(input) {
        const now = new Date();
        const sale: Sale = { ...input, id: nextId(sales, now), at: now.toISOString(), total: saleTotal(input.items) };
        setSales((s) => [sale, ...s]);
        setStock((st) => {
          const next = { ...st };
          for (const i of input.items) next[i.slug] = Math.max(0, (st[i.slug] ?? baseStock(i.slug)) - i.qty);
          return next;
        });
        return sale;
      },
      /** Hapus transaksi dan kembalikan stoknya. */
      remove(id) {
        const sale = sales.find((s) => s.id === id);
        if (!sale) return;
        setSales((s) => s.filter((x) => x.id !== id));
        setStock((st) => {
          const next = { ...st };
          for (const i of sale.items) next[i.slug] = (st[i.slug] ?? baseStock(i.slug)) + i.qty;
          return next;
        });
      },
      /** Atur stok; `null` menghapus pengaturan (kembali ke stok awal katalog). */
      setStockOf(slug, qty) {
        setStock((st) => {
          const next = { ...st };
          if (qty === null) delete next[slug];
          else next[slug] = Math.max(0, Math.floor(qty));
          return next;
        });
      },
    };
  }, [sales, stock, ready, getProduct]);

  return <SalesContext.Provider value={api}>{children}</SalesContext.Provider>;
}

export function useSales() {
  const ctx = useContext(SalesContext);
  if (!ctx) throw new Error("useSales di luar SalesProvider");
  return ctx;
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
