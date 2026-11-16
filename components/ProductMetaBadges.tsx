"use client";

import { useLiveProductMeta } from "@/lib/sales";

export function ProductMetaBadges({
  slug,
  baseStock = 25,
  baseSold = 120,
}: {
  slug: string;
  baseStock?: number;
  baseSold?: number;
}) {
  const { stock, sold, isLowStock, isOutOfStock } = useLiveProductMeta(slug, baseStock, baseSold);

  return (
    <div className="detail-meta-badges">
      <span className="detail-sold-badge" title="Total akumulasi produk terjual">
        🔥 <b>{sold}+</b> Terjual
      </span>
      <span
        className="detail-stock-badge"
        data-low={isLowStock}
        data-empty={isOutOfStock}
        title="Status stok real-time di toko"
      >
        {isOutOfStock ? (
          <>❌ <b>Stok Habis</b></>
        ) : isLowStock ? (
          <>⚠️ <b>Sisa {stock} pack!</b> (Stok menipis)</>
        ) : (
          <>📦 <b>Stok:</b> {stock} pack siap kirim</>
        )}
      </span>
    </div>
  );
}
