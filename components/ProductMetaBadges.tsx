"use client";

import { useSales } from "@/lib/sales";

export function ProductMetaBadges({ slug }: { slug: string }) {
  const { stock, sold, isLowStock, isOutOfStock } = useSales().metaOf(slug);

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
