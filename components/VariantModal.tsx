"use client";

import { useEffect, useState } from "react";
import { formatRp, thumb, type Product } from "@/data/products";
import { useSales } from "@/lib/sales";
import { Stepper } from "./Stepper";

export function VariantModal({
  isOpen,
  initialProduct,
  variants,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  initialProduct: Product;
  variants: Product[];
  onClose: () => void;
  onAdd: (slug: string, qty: number, targetImg: HTMLImageElement | null) => void;
}) {
  const [selectedSlug, setSelectedSlug] = useState(initialProduct.slug);
  const [qty, setQty] = useState(1);

  // Sync when initialProduct changes
  useEffect(() => {
    setSelectedSlug(initialProduct.slug);
    setQty(1);
  }, [initialProduct]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const selectedProduct = variants.find((v) => v.slug === selectedSlug) || initialProduct;
  const { stock, sold, max, isLowStock, isOutOfStock } = useSales().metaOf(selectedProduct.slug);

  if (!isOpen) return null;

  const handleConfirmAdd = () => {
    if (isOutOfStock) return;
    const imgEl = document.querySelector<HTMLImageElement>(`.variant-modal-thumb img`);
    onAdd(selectedProduct.slug, qty, imgEl);
    onClose();
  };

  const getVariantLabel = (p: Product) => {
    if (p.flavor) return p.flavor;
    if (p.pack) return p.pack;
    return p.name;
  };

  return (
    <div className="vmodal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="vmodal-title">
      <div className="vmodal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div className="vmodal-header">
          <div className="vmodal-title-wrap">
            <span className="vmodal-tag">Pilih Varian</span>
            <h3 id="vmodal-title">{initialProduct.name}</h3>
          </div>
          <button
            type="button"
            className="vmodal-close-btn"
            onClick={onClose}
            aria-label="Tutup pilihan varian"
          >
            ✕
          </button>
        </div>

        {/* Preview Varian yang Sedang Dipilih */}
        <div className="vmodal-preview">
          <div className="variant-modal-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb(selectedProduct.image, 320)}
              alt={selectedProduct.name}
              width={80}
              height={80}
            />
          </div>
          <div className="vmodal-preview-info">
            <h4 className="vmodal-preview-name">{selectedProduct.name}</h4>
            <div className="vmodal-preview-price-row">
              <strong className="vmodal-preview-price">
                {selectedProduct.price ? formatRp(selectedProduct.price) : "Tanya via WA"}
              </strong>
              {selectedProduct.pack && <span className="pack">{selectedProduct.pack}</span>}
            </div>
            <div className="card-meta-row" style={{ marginTop: "0.2rem" }}>
              <span className="card-sold">🔥 {sold}+ terjual</span>
              <span className="card-stock" data-low={isLowStock} data-empty={isOutOfStock}>
                {isOutOfStock ? "Habis" : isLowStock ? `Sisa ${stock}!` : `Stok: ${stock}`}
              </span>
            </div>
          </div>
        </div>

        {/* Daftar Pilihan Varian / Rasa */}
        <div className="vmodal-section">
          <p className="vmodal-section-label">
            Varian / Rasa yang Tersedia:
          </p>
          <div className="vmodal-options-grid">
            {variants.map((v) => {
              const isSelected = v.slug === selectedSlug;
              const label = getVariantLabel(v);
              return (
                <button
                  key={v.slug}
                  type="button"
                  className="vmodal-opt-btn"
                  data-selected={isSelected}
                  onClick={() => {
                    setSelectedSlug(v.slug);
                    setQty(1);
                  }}
                >
                  <span className="vmodal-opt-radio" aria-hidden />
                  <span className="vmodal-opt-label">{label}</span>
                  {v.price && (
                    <small className="vmodal-opt-price">{formatRp(v.price)}</small>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Atur Jumlah Beli */}
        <div className="vmodal-qty-row">
          <span className="vmodal-qty-label">Jumlah:</span>
          <Stepper qty={qty} min={1} max={max ?? 99} onChange={setQty} />
        </div>

        {/* Tombol Konfirmasi Tambah */}
        <div className="vmodal-footer">
          <button
            type="button"
            className="btn btn-red btn-block vmodal-add-btn"
            disabled={isOutOfStock}
            onClick={handleConfirmAdd}
          >
            {isOutOfStock ? (
              "Varian Ini Sedang Habis"
            ) : (
              <>
                <span>Tambah ke Keranjang</span>
                {selectedProduct.price ? (
                  <span className="vmodal-total-pill">
                    {formatRp(selectedProduct.price * qty)}
                  </span>
                ) : null}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
