"use client";

import { useCallback, useEffect, useState } from "react";

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

function load<T>(key: string, fallback: T): T {
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

/** Penjualan dan stok, disimpan di localStorage perangkat ini saja. */
export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [stock, setStock] = useState<Stock>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSales(load<Sale[]>(SALES_KEY, []));
    setStock(load<Stock>(STOCK_KEY, {}));
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(SALES_KEY, JSON.stringify(sales));
  }, [sales, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
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
