# Alba Food Market & Albafroz

Platform website e-commerce & katalog resmi untuk **Alba Food Market** (produsen kulit sambosa & bahan dasar) dan lini beku **Albafroz** (frozen food siap masak) berbasis di Sawangan, Depok.

Dibangun dengan **Next.js 15 (App Router)** + **TypeScript**, mobile-first, performa tinggi tanpa backend (keranjang di `localStorage` + checkout instan langsung ke WhatsApp).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Arsitektur & Halaman

- **`/` (Beranda)** — Hero interaktif, kulkas dinamis, dual-brand showcase (Alba Food Market & Albafroz), pencarian instan, keunggulan produsen tangan pertama, teaser program reseller, ulasan testimoni, dan info operasional toko.
- **`/produk` & `/produk/[slug]`** — Katalog lengkap dengan filter ganda (Kategori & Brand), status grosir, badge brand, informasi kemasan, dan rekomendasi produk terkait.
- **`/albafroz`** — Landing page lini frozen food dengan kampanye *"Coming with Our New Face"*, jaminan cold-chain -18°C, serta panduan praktis menggoreng sambosa renyah anti-bocor dan memanggang roti cane.
- **`/reseller`** — Program kemitraan & keagenan resmi, tabel skema harga grosir transparan (margin hingga 35%), MOQ ramah pemula (10 pack), 4 langkah bergabung, dan fasilitas free styrofoam packaging.
- **`/tentang`** — Profil dan kisah produsen di Pasir Putih Sawangan Depok, standar mutu 100% halal, serta sinergi ekosistem brand (Alba Food Market, Albafroz, Hey Honey @hayhoney.co, dan Hala Studios).
- **`/lokasi`** — Peta lokasi workshop (Google Maps embed), jam buka otomatis dihitung WIB, rute, kontak, dan layanan pengiriman instan/sameday & Paxel Frozen.
- **`/faq`** — Pusat bantuan & FAQ lengkap dengan accordion interaktif untuk panduan penyimpanan beku, cara masak, pengiriman, dan pemesanan.
- **`/keranjang`** — Keranjang belanja interaktif (tambah/kurang jumlah, hapus item, simpan di browser) dengan form checkout yang langsung mengenerate pesan pemesanan terformat rapi ke WhatsApp toko.

## File Kunci

- `lib/brand.ts`: Token kontak, WhatsApp resmi, alamat toko, jam operasional WIB, partner, dan generator tautan WhatsApp (`waLink`).
- `data/products.ts`: Katalog produk tanpa database (mendukung field `brand`, `packSize`, `price`, `wholesalePrice`, `wholesaleMin`, `keywords`, `preorder`, dan `more`).
- `lib/cart.tsx`: State management keranjang belanja berbasis React Context dan persistensi `localStorage`.
- `components/Shell.tsx`: Tata letak utama dengan navbar responsif, mobile menu drawer, bottom tab bar cepat, dan tombol melayang WhatsApp.
- `app/sitemap.ts` & `app/robots.ts`: Konfigurasi SEO dan sitemap otomatis untuk seluruh halaman statis dan dinamis.
