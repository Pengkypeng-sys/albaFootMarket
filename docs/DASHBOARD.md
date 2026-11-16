# Dashboard `/admin`

Alat pemilik: kasir, kuitansi, daftar terjual, daftar stok. Tidak ada login dan tidak ada server.

## Penyimpanan
- Semua data di `localStorage` perangkat yang membuka halaman ini.
  - `alba-sales-v1`: daftar transaksi.
  - `alba-stock-v1`: stok per slug produk.
- Tidak sinkron antar perangkat. Hapus data browser = data hilang. Ekspor CSV (tab Terjual) untuk cadangan.
- Halaman `noindex` dan tidak ada di sitemap, tapi **bukan rahasia**: siapa pun yang tahu alamat `/admin` bisa membukanya dan melihat data perangkatnya sendiri (kosong). Data pemilik tidak bocor karena tersimpan di perangkat pemilik.

## Fitur
- **Kasir**: pilih produk dan jumlah, nama pembeli (opsional), cara bayar (Tunai/Transfer/QRIS), catatan. Simpan membuat kuitansi bernomor `AFM-YYMMDD-001` (urut per hari, WIB).
- **Kuitansi**: cetak/PDF (80 mm) atau kirim teks lewat WhatsApp.
- **Terjual**: omzet, jumlah transaksi, barang terjual, produk terlaris, riwayat, filter tanggal, ekspor CSV. Hapus transaksi mengembalikan stok.
- **Stok**: "Catat stok" untuk produk yang ingin dilacak. Stok berkurang otomatis saat dijual. Tanda merah bila stok ≤ 5. Produk yang stoknya belum dicatat tidak dibatasi.
- Hanya produk berharga yang bisa dijual di kasir (produk "Tanya harga" tidak muncul).

## Cara uji cepat
1. Buka `/admin` > Stok > "Catat stok" Sambosa Daging, isi 10.
2. Kasir: Sambosa Daging ×3, Kulit Sambosa Large ×2 → total **Rp 210.000**.
3. Simpan → kuitansi `AFM-…-001`, stok Sambosa Daging jadi **7**.
4. Terjual: omzet Rp 210.000, 1 transaksi, 5 barang. Hapus transaksi → stok kembali **10**.

Terakhir diuji di Chromium headless (390 px dan 1280 px): alur di atas lolos, 0 error konsol, tanpa scroll samping. Cetak ke printer/PDF dan perangkat fisik belum diuji.
