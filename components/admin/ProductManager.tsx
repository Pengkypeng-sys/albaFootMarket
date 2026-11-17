"use client";

import { useMemo, useRef, useState } from "react";
import { categories, formatRp, thumb, type CategoryId, type Product } from "@/data/products";
import { compressProductPhoto, useCatalog } from "@/lib/catalog";
import { useSales } from "@/lib/sales";

const presetPhotos = [
  { label: "Sambosa", src: "/products/sambosa-frozen.jpg" },
  { label: "Kebab", src: "/products/kebab.jpg" },
  { label: "Roti Canai", src: "/products/roti-canai.jpg" },
  { label: "Kulit Sambosa", src: "/products/kulit-sambosa.jpg" },
  { label: "Onde-Onde", src: "/products/onde-onde.jpg" },
  { label: "Kurma", src: "/products/kurma.jpg" },
  { label: "Aneka Bumbu", src: "/products/bumbu-masak.jpg" },
  { label: "Camilan", src: "/products/camilan.jpg" },
  { label: "Minuman", src: "/products/minuman.svg" },
];

export function ProductManager() {
  const { products, saveProduct, deleteProduct, resetToDefault } = useCatalog();
  const { stockOf, setStockOf } = useSales();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<CategoryId | "semua">("semua");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<CategoryId>("sambosa");
  const [formFlavor, setFormFlavor] = useState("");
  const [formPack, setFormPack] = useState("");
  const [formPrice, setFormPrice] = useState<number | "">("");
  const [formWholesale, setFormWholesale] = useState<number | "">("");
  const [formStock, setFormStock] = useState<number>(20);
  const [formSummary, setFormSummary] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCat === "semua" || p.category === activeCat;
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(q) ||
        (p.flavor && p.flavor.toLowerCase().includes(q)) ||
        p.summary.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, activeCat, search]);

  const openEdit = (p: Product) => {
    setIsNew(false);
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormFlavor(p.flavor || "");
    setFormPack(p.pack || p.packSize || "");
    setFormPrice(p.price || "");
    setFormWholesale(p.wholesalePrice || "");
    setFormStock(stockOf(p.slug));
    setFormSummary(p.summary || "");
    setFormImage(p.image || "/products/sambosa-frozen.jpg");
    setFormFeatured(Boolean(p.featured));
  };

  const openNew = () => {
    setIsNew(true);
    setEditingProduct(null);
    setFormName("");
    setFormCategory("sambosa");
    setFormFlavor("");
    setFormPack("Isi 10");
    setFormPrice(35000);
    setFormWholesale("");
    setFormStock(25);
    setFormSummary("Produk berkualitas dari Alba Food Market.");
    setFormImage("/products/sambosa-frozen.jpg");
    setFormFeatured(false);
  };

  const closeForm = () => {
    setEditingProduct(null);
    setIsNew(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const compressedDataUrl = await compressProductPhoto(file, 640);
      setFormImage(compressedDataUrl);
    } catch (err) {
      alert("Gagal memproses gambar. Pastikan file berupa format gambar (JPG/PNG/WEBP).");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert("Nama produk tidak boleh kosong.");
      return;
    }

    const base =
      formName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `produk-${Date.now()}`;
    let slug = isNew ? base : editingProduct!.slug;
    if (isNew) {
      // Slug harus unik: slug kembar akan menimpa produk lain.
      for (let n = 2; products.some((p) => p.slug === slug); n++) slug = `${base}-${n}`;
    }
    const stock = Number.isFinite(formStock) ? Math.max(0, Math.floor(formStock)) : 0;

    const updated: Product = {
      ...(editingProduct || {}),
      slug,
      name: formName.trim(),
      category: formCategory,
      flavor: formFlavor.trim() || undefined,
      pack: formPack.trim() || undefined,
      price: typeof formPrice === "number" ? formPrice : undefined,
      wholesalePrice: typeof formWholesale === "number" ? formWholesale : undefined,
      stock,
      summary: formSummary.trim(),
      keywords: `${formName} ${formFlavor} ${formCategory}`.toLowerCase(),
      image: formImage,
      imageAlt: formName.trim(),
      featured: formFeatured,
    };

    saveProduct(updated);
    setStockOf(slug, stock);
    closeForm();
  };

  return (
    <div className="pm-container">
      {/* Header Manajemen Produk */}
      <div className="dash-card-header" style={{ marginBottom: "1rem" }}>
        <div>
          <h3>Kelola Foto &amp; Produk Toko</h3>
          <p className="dash-card-sub">
            Ganti foto produk langsung dari HP/komputer, edit varian rasa, harga, dan stok barang ({products.length} produk).
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button type="button" className="btn btn-red btn-sm" onClick={openNew}>
            + Tambah Produk Baru
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              if (confirm("Kembalikan katalog ke setelan default awal Alba Food Market? Semua foto atau editan lokal akan di-reset.")) {
                resetToDefault();
              }
            }}
          >
            ↺ Reset Default
          </button>
        </div>
      </div>

      {/* Filter Kategori & Pencarian */}
      <div className="adm-pos-filter-bar">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk yang ingin diedit..."
          className="adm-pos-search"
        />
        <div className="adm-pos-chips">
          <button
            type="button"
            className="chip"
            data-on={activeCat === "semua"}
            onClick={() => setActiveCat("semua")}
          >
            Semua ({products.length})
          </button>
          {categories
            .filter((c) => c.id !== "semua")
            .map((c) => {
              const count = products.filter((p) => p.category === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  data-on={activeCat === c.id}
                  onClick={() => setActiveCat(c.id)}
                >
                  {c.label} ({count})
                </button>
              );
            })}
        </div>
      </div>

      {/* Grid Kartu Produk untuk Dikelola */}
      <div className="pm-grid">
        {filteredProducts.map((p) => (
          <div key={p.slug} className="pm-card">
            <div className="pm-card-thumb-wrap" onClick={() => openEdit(p)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(p.image, 320)} alt={p.name} className="pm-card-img" />
              <span className="pm-photo-badge">📸 Ganti Foto</span>
            </div>

            <div className="pm-card-content">
              <div className="pm-card-meta">
                <span className="pm-tag">{p.category}</span>
                {p.featured && <span className="pm-tag-feat">★ Unggulan</span>}
              </div>
              <h4 className="pm-card-name">{p.name}</h4>
              <p className="pm-card-pack">{p.pack || "Pack"} · {p.flavor ? `Rasa ${p.flavor}` : "Original"}</p>
              <div className="pm-card-price-row">
                <strong className="pm-card-price">
                  {p.price ? formatRp(p.price) : "Tanya via WA"}
                </strong>
                <span className="pm-card-stock">Stok: {stockOf(p.slug)}</span>
              </div>
            </div>

            <div className="pm-card-actions">
              <button
                type="button"
                className="btn btn-sm pm-edit-btn"
                onClick={() => openEdit(p)}
              >
                ✏️ Edit &amp; Ganti Foto
              </button>
              <button
                type="button"
                className="link-btn pm-del-btn"
                onClick={() => {
                  if (confirm(`Hapus produk "${p.name}" dari katalog website?`)) {
                    deleteProduct(p.slug);
                    setStockOf(p.slug, null);
                  }
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM EDIT / TAMBAH PRODUK */}
      {(editingProduct || isNew) && (
        <div className="vmodal-backdrop" onClick={closeForm}>
          <div className="vmodal-card pm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="vmodal-header">
              <div className="vmodal-title-wrap">
                <span className="vmodal-tag">{isNew ? "Produk Baru" : "Edit Produk"}</span>
                <h3>{isNew ? "Tambah Produk Baru" : `Edit ${editingProduct?.name}`}</h3>
              </div>
              <button type="button" className="vmodal-close-btn" onClick={closeForm}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="pm-form">
              {/* Bagian 1: Manajemen Foto */}
              <div className="pm-photo-section">
                <label className="field-label">Foto Produk:</label>
                <div className="pm-photo-uploader">
                  <div className="pm-photo-preview">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb(formImage, 400)} alt="Preview Foto" />
                    {uploading && <div className="pm-photo-loading">Mengompres...</div>}
                  </div>

                  <div className="pm-photo-controls">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="btn btn-red btn-sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      📁 Upload Foto dari HP / Komputer
                    </button>

                    <label className="field" style={{ margin: "0.6rem 0 0" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Atau masukkan URL / Link Gambar:</span>
                      <input
                        type="url"
                        value={formImage.startsWith("data:") ? "" : formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://..."
                        style={{ fontSize: "0.85rem" }}
                      />
                    </label>

                    <div className="pm-preset-row">
                      <small style={{ color: "var(--muted)", display: "block", marginBottom: "0.25rem" }}>
                        Pilihan Cepat Foto Bawaan:
                      </small>
                      <div className="pm-preset-chips">
                        {presetPhotos.map((pr) => (
                          <button
                            key={pr.label}
                            type="button"
                            className="pm-preset-chip"
                            onClick={() => setFormImage(pr.src)}
                          >
                            {pr.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bagian 2: Informasi Detail Produk */}
              <div className="pm-fields-grid">
                <label className="field">
                  <span>Nama Produk *</span>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Sambosa Ayam Krispi"
                    required
                  />
                </label>

                <label className="field">
                  <span>Kategori Produk</span>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryId)}
                    className="pm-select"
                  >
                    {categories
                      .filter((c) => c.id !== "semua")
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                  </select>
                </label>

                <label className="field">
                  <span>Varian / Rasa</span>
                  <input
                    type="text"
                    value={formFlavor}
                    onChange={(e) => setFormFlavor(e.target.value)}
                    placeholder="Contoh: Ayam, Daging, Mozarella"
                  />
                </label>

                <label className="field">
                  <span>Isi Kemasan / Ukuran</span>
                  <input
                    type="text"
                    value={formPack}
                    onChange={(e) => setFormPack(e.target.value)}
                    placeholder="Contoh: Isi 10, Isi 50, 200 ml"
                  />
                </label>

                <label className="field">
                  <span>Harga Satuan (Rp) *</span>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value ? Number(e.target.value) : "")}
                    placeholder="Contoh: 40000"
                    required
                  />
                </label>

                <label className="field">
                  <span>Stok Tersedia (Pack)</span>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    min={0}
                  />
                </label>
              </div>

              <label className="field">
                <span>Deskripsi / Ringkasan Produk</span>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Keterangan singkat tentang kelezatan dan cara penyajian produk..."
                  style={{ width: "100%", borderRadius: "12px", padding: "0.6rem" }}
                />
              </label>

              <label className="pm-checkbox-label">
                <input
                  type="checkbox"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                />
                <span>Tampilkan sebagai Produk Unggulan di Showcase Beranda</span>
              </label>

              <div className="pm-form-actions">
                <button type="submit" className="btn btn-red btn-block">
                  Simpan Perubahan Produk ✓
                </button>
                <button type="button" className="btn btn-block" onClick={closeForm}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
