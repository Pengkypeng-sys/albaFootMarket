# Alba Food Market

Website katalog Alba Food Market, Sawangan, Depok. Next.js 15 (App Router), TypeScript, CSS biasa. Tanpa backend: keranjang di `localStorage`, pesanan dikirim lewat WhatsApp.

```bash
npm install
npm run dev
npm run build && npm start
```

## Halaman

- `/` beranda: pencarian, kulkas animasi, kategori, produk, info toko
- `/produk`, `/produk/[slug]`: katalog (`?q=`, `?kategori=`) dan detail
- `/lokasi`: rute, kontak, peta
- `/keranjang`: keranjang dan checkout WhatsApp

## File kunci

- `lib/brand.ts`: kontak, alamat, jam buka (WIB), `waLink`
- `data/products.ts`: katalog produk
- `lib/cart.tsx`: keranjang (Context + `localStorage`)
- `components/Shell.tsx`: header, footer, tab bar HP

## Belum final

Cari `TODO: konfirmasi`:

- harga produk (sementara untuk tes)
- foto produk (sementara dari Unsplash; ganti foto asli)
- domain produksi di `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`
