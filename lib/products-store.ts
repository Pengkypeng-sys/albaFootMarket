"use client";

import { useCallback, useEffect, useState } from "react";
import { products as defaultProducts, type Product } from "@/data/products";

const PRODUCTS_STORAGE_KEY = "alba-custom-products-v2";

/** Resize and compress photo using HTML5 Canvas to keep storage ultra-light (~40KB) */
export function compressProductPhoto(file: File, maxSide = 640): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height) {
          if (width > maxSide) {
            height = Math.round((height * maxSide) / width);
            width = maxSide;
          }
        } else {
          if (height > maxSide) {
            width = Math.round((width * maxSide) / height);
            height = maxSide;
          }
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
        // Save as optimized jpeg
        resolve(canvas.toDataURL("image/jpeg", 0.84));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadProducts(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

function notifyProductsChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("alba:products-updated"));
    window.dispatchEvent(new Event("alba:data-updated"));
  }
}

/** Hook untuk membaca & mengelola daftar produk toko secara reaktif */
export function useManageableProducts() {
  const [productList, setProductList] = useState<Product[]>(defaultProducts);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setProductList(loadProducts());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);

    const handleUpdate = () => refresh();
    window.addEventListener("alba:products-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("alba:products-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  const saveProduct = useCallback(
    (product: Product) => {
      setProductList((current) => {
        const index = current.findIndex((p) => p.slug === product.slug);
        let updated: Product[];
        if (index >= 0) {
          updated = [...current];
          updated[index] = { ...updated[index], ...product };
        } else {
          updated = [product, ...current];
        }
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
        notifyProductsChanged();
        return updated;
      });
    },
    [],
  );

  const deleteProduct = useCallback((slug: string) => {
    setProductList((current) => {
      const updated = current.filter((p) => p.slug !== slug);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
      notifyProductsChanged();
      return updated;
    });
  }, []);

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    setProductList(defaultProducts);
    notifyProductsChanged();
  }, []);

  return {
    products: productList,
    ready,
    saveProduct,
    deleteProduct,
    resetToDefault,
  };
}
