"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { products as defaultProducts, type CategoryId, type Product } from "@/data/products";

/** Daftar produk hasil sunting dashboard; kosong = pakai katalog bawaan. */
const KEY = "alba-custom-products-v2";

type CatalogApi = {
  products: Product[];
  ready: boolean;
  featured: Product[];
  getProduct: (slug: string) => Product | undefined;
  variantsOf: (category: CategoryId) => Product[];
  saveProduct: (product: Product) => void;
  deleteProduct: (slug: string) => void;
  resetToDefault: () => void;
};

const CatalogContext = createContext<CatalogApi | null>(null);

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

/** Satu-satunya sumber daftar produk di toko dan dashboard. Disimpan di localStorage perangkat ini. */
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [ready, setReady] = useState(false);
  const ref = useRef<Product[]>(defaultProducts);

  const apply = useCallback((next: Product[]) => {
    ref.current = next;
    setProducts(next);
  }, []);

  useEffect(() => {
    apply(loadProducts());
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY || e.key === null) apply(loadProducts());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [apply]);

  const api = useMemo<CatalogApi>(() => {
    const persist = (next: Product[]) => {
      localStorage.setItem(KEY, JSON.stringify(next));
      apply(next);
    };
    return {
      products,
      ready,
      featured: products.filter((p) => p.featured),
      getProduct: (slug) => products.find((p) => p.slug === slug),
      variantsOf: (category) => products.filter((p) => p.category === category),
      saveProduct(product) {
        const cur = ref.current;
        const i = cur.findIndex((p) => p.slug === product.slug);
        persist(i >= 0 ? cur.map((p, n) => (n === i ? { ...p, ...product } : p)) : [product, ...cur]);
      },
      deleteProduct(slug) {
        persist(ref.current.filter((p) => p.slug !== slug));
      },
      resetToDefault() {
        localStorage.removeItem(KEY);
        apply(defaultProducts);
      },
    };
  }, [products, ready, apply]);

  return <CatalogContext.Provider value={api}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog di luar CatalogProvider");
  return ctx;
}

/** Perkecil foto unggahan lewat canvas supaya muat di localStorage (~40KB). */
export function compressProductPhoto(file: File, maxSide = 640): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const longest = Math.max(width, height);
        if (longest > maxSide) {
          width = Math.round((width * maxSide) / longest);
          height = Math.round((height * maxSide) / longest);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.84));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
