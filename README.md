# Alba Food Market

Website katalog Alba Food Market, Sawangan, Depok. Next.js 15 (App Router), TypeScript, CSS biasa. Tanpa backend: keranjang dan dashboard memakai `localStorage`, pesanan dikirim lewat WhatsApp.

```bash
npm install
npm run dev
npm run build && npm start
npx tsc --noEmit
```

## Halaman

- `/` beranda: pencarian, kulkas animasi, kategori, produk, info toko
- `/produk`, `/produk/[slug]`: katalog (`?q=`, `?kategori=`) dan detail
- `/lokasi`: rute, kontak, peta
- `/keranjang`: keranjang dan checkout WhatsApp
- `/admin`: dashboard pemilik (kasir + kuitansi, daftar terjual, stok), data hanya di perangkat

## File kunci

- `lib/brand.ts`: kontak, alamat, jam buka (WIB), `waLink`
- `data/products.ts`: katalog produk
- `lib/cart.tsx`: keranjang; `lib/sales.ts`: penjualan dan stok
- `components/Shell.tsx`: header, footer, tab bar HP

## Dokumentasi

- `docs/HASIL-PROYEK.md`: ringkasan lengkap hasil proyek dan hal yang belum final
- `docs/DASHBOARD.md`: cara pakai dan uji dashboard
- `docs/TESTING-UANG.md`: uji harga, total, dan pesan WhatsApp
- `public/products/ATRIBUSI.md`: kredit foto

## Belum final

Cari `TODO`:

- foto kemasan asli per varian dan foto minuman
- domain produksi di `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`
