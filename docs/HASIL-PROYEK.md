# Alba Food Market: Hasil Proyek

Website katalog dan pemesanan untuk Alba Food Market, Sawangan, Depok. Terakhir diperbarui 16 Nov 2026.

- **Stack:** Next.js 15 (App Router), React 19, TypeScript, CSS biasa di `app/globals.css`. Tanpa Tailwind, tanpa backend.
- **Pesanan:** keranjang di `localStorage`, checkout berupa pesan WhatsApp.
- **Status git:** semua perubahan belum di-commit. Satu-satunya commit lama: `267778c`.

## 1. Halaman

| Rute | Isi |
|---|---|
| `/` | Pencarian, kulkas animasi (carousel produk unggulan), kategori (geser), produk unggulan, info toko, banner WhatsApp |
| `/produk` | Katalog, filter kategori (`?kategori=`), pencarian (`?q=`) |
| `/produk/[slug]` | Detail: label kategori, rasa, kotak harga merah + isi kemasan, galeri, tombol tambah, produk lain |
| `/lokasi` | Rute, kontak, peta |
| `/keranjang` | Daftar belanja, total, form pemesan, kirim ke WhatsApp |
| `/admin` | Dashboard pemilik: Kasir, Terjual, Stok (lihat bagian 4) |

Halaman lama (reseller, albafroz, tentang, faq) sudah dihapus dari proyek. Masih ada di commit `267778c`.

## 2. Fitur utama

### Katalog dan pencarian
- 24 produk di `data/products.ts`: kulit sambosa (3), sambosa (6), kebab (2), roti canai (2), onde-onde, minuman (4), camilan, kurma, bumbu masak, pre-order Ramadan.
- Pencarian mencocokkan nama, ringkasan, dan kata kunci, dengan saran otomatis.
- Rasa/isi tampil di halaman detail (field `flavor`). Hanya produk yang punya rasa yang menampilkannya.

### Keranjang dan uang
- Harga dibaca dari `data/products.ts` saat render. `localStorage` (`alba-cart-v1`) hanya menyimpan `{slug, qty}`.
- Subtotal per baris dan total. Produk tanpa harga **tidak dihitung nol**: ditulis "+ N item harga dikonfirmasi lewat WhatsApp".
- Pesan WhatsApp memuat daftar barang, qty × harga = subtotal, total, nama, ambil/antar, alamat (bila antar), catatan.
- Drawer keranjang: header dan footer tetap, hanya daftar yang scroll, scroll halaman dikunci, garis merah di tepi (atas di HP, kiri di desktop).
- Uji uang: `docs/TESTING-UANG.md`.

### Tampilan
- Dasar krem hangat, satu warna aksen merah `#d90700`, hijau hanya untuk status buka/berhasil/WhatsApp.
- Latar foto per kategori memakai warna hangat (`data-cat` → `--tone`).
- Kartu produk: bayangan hangat berlapis, harga merah, stepper `+` merah dan `−` merah muda.
- Tab bar HP: Produk, Lokasi, Beranda (tombol merah menonjol di tengah), Keranjang, WhatsApp.
- Rail geser (scroll-snap) dengan tombol panah di desktop.
- Kulkas: carousel satu produk, bisa digeser/diswipe, tombol "Buka Etalase / Tutup Etalase".
- Hormati `prefers-reduced-motion`. Efek hover hanya untuk perangkat berkursor.

### Info toko
- Jam buka dihitung dalam WIB, apa pun zona waktu pengunjung (`lib/brand.ts`, `openStatus`).
- Ulasan Google Maps dan rating **sudah dihapus** di mana pun. Jangan dipasang lagi tanpa data nyata.

## 3. Data bisnis (sumber: `lib/brand.ts`)

- Alamat: Perumahan Koperasi BUGN, Jl. Pasir Kaliki 4 Blok B4 No.70 & 72, Pasir Putih, Sawangan, Depok 16519
- WhatsApp: 0817-0055-121 (`628170055121`)
- Jam: Senin–Sabtu 09.00–17.00 WIB, Minggu tutup
- Instagram: @albafoodmarket
- Layanan: belanja di toko, antar, pre-order. Pembayaran: tunai, kartu debit, NFC.

Yang **sengaja tidak ditampilkan** karena tidak ada buktinya: pengiriman same-day/Paxel/ongkir, minimal order, suhu −18°C, harga grosir, "anti-sobek", testimoni, program reseller.

## 4. Dashboard `/admin`

Alat pemilik. Data di `localStorage` perangkat itu saja: `alba-sales-v1` (transaksi) dan `alba-stock-v1` (stok).

- **Kasir:** pilih produk dan jumlah, nama pembeli, Tunai/Transfer/QRIS, catatan. Simpan → kuitansi `AFM-YYMMDD-001` (urut per hari, WIB). Cetak/PDF 80 mm atau kirim teks ke WhatsApp.
- **Terjual:** omzet, jumlah transaksi, barang terjual, produk terlaris, riwayat, filter tanggal, ekspor CSV. Hapus transaksi mengembalikan stok.
- **Stok:** "Catat stok" per produk, berkurang otomatis saat terjual, merah bila ≤ 5. Produk tanpa stok tercatat tidak dibatasi.

Batasan: tidak sinkron antar perangkat, hilang bila data browser dihapus (cadangkan lewat CSV), tidak ada login (halaman `noindex` dan tidak ada di sitemap, tapi alamatnya bisa dibuka siapa saja). Detail: `docs/DASHBOARD.md`.

## 5. Struktur proyek

```
app/            halaman, layout, sitemap, robots, globals.css
  admin/        dashboard
components/     Shell, ProductCard, Fridge, Rail, CartDrawer, CartLines, Stepper, ...
  admin/        Admin.tsx, Receipt.tsx
lib/            brand.ts (data usaha), cart.tsx (keranjang), sales.ts (penjualan/stok), fly.ts
data/           products.ts (katalog)
docs/           TESTING-UANG.md, DASHBOARD.md, HASIL-PROYEK.md
public/products foto produk + ATRIBUSI.md (kredit foto)
```

## 6. Menjalankan

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npx tsc --noEmit       # cek tipe
```

Jalankan **satu** dev server saja per proyek. Dua server berbagi folder `.next` pernah menyebabkan ChunkLoadError.

## 7. Foto

Foto produk adalah foto stok dari Wikimedia Commons, kredit di `public/products/ATRIBUSI.md`.
- "Kulit Sambosa" memakai foto tumpukan tortilla sebagai pendekatan.
- Minuman memakai ikon botol (`minuman.svg`).
- Satu foto per keluarga produk. Foto kemasan asli per varian jauh lebih baik. Ada `// TODO` di `data/products.ts`.

## 8. Yang masih perlu keputusan atau data dari pemilik

1. **Nomor WhatsApp:** flyer menulis "Marketing 0822 9901 9901", semua tombol memakai 0817-0055-121. Mana yang benar?
2. **Foto asli:** kemasan per varian, minuman, dan kulit sambosa.
3. **Bahan/komposisi** per produk: belum ada datanya, jadi belum ditampilkan. Tidak diarang.
4. **Harga** camilan, kurma, bumbu, PO: sekarang "Tanya harga".
5. **Domain produksi:** Sudah dikonfigurasi menggunakan `https://albafootmarket.vercel.app` (dan mendukung custom domain via `NEXT_PUBLIC_SITE_URL`).
6. **Favicon & Icon:** `app/icon.svg` resmi ditambahkan untuk tab browser dan Google Search.
7. **Build produksi (`npm run build`):** Sudah diuji dan 100% sukses (32/32 halaman statis ter-generate tanpa error).
