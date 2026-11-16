# Pengujian perhitungan uang (keranjang dan pesan WhatsApp)

Cara memastikan harga, subtotal, total, dan teks pesan WhatsApp benar. Tidak ada backend: semua hitungan terjadi di browser.

## Sumber hitungan

| Apa | Di mana |
| --- | --- |
| Harga satuan (`price`, rupiah bulat) | `data/products.ts` |
| Format rupiah (`Rp 45.000`) | `formatRp` di `data/products.ts` |
| Subtotal baris, total, teks WA | `lineTotal`, `cartTotal`, `orderMessage` di `lib/cart.tsx` |
| Tampilan baris dan total | `components/CartLines.tsx` (dipakai drawer dan `/keranjang`) |

Aturan:

- Total = jumlah `price × qty` untuk semua baris yang punya harga.
- Produk tanpa `price` (aneka camilan, kurma, bumbu masak, PO Ramadan) **tidak dihitung sebagai Rp 0**. Subtotalnya tampil "–", total diberi catatan "+ N item harga dikonfirmasi lewat WhatsApp", dan pesan WA menulis "harga dikonfirmasi".
- Harga di keranjang dibaca ulang dari `data/products.ts` setiap render. localStorage (`alba-cart-v1`) hanya menyimpan `slug` dan `qty`, jadi mengubah harga di data langsung berlaku ke keranjang lama.
- Tidak ada ongkir, diskon, atau pajak di hitungan. Teks di halaman: "Ongkir dikonfirmasi admin."

## Menyiapkan

```bash
npm run dev            # http://localhost:3000
```

Isi keranjang cepat lewat konsol browser (lalu buka `/keranjang`):

```js
localStorage.setItem("alba-cart-v1", JSON.stringify([
  { slug: "kulit-sambosa-large", qty: 2 },
  { slug: "sambosa-daging", qty: 1 },
  { slug: "kurma", qty: 1 },
]));
```

Kosongkan: `localStorage.removeItem("alba-cart-v1")`.

## Kasus uji

Harga acuan (dari data saat ini): Kulit Sambosa Large Rp 45.000, Sambosa Daging Rp 40.000, Roti Canai Original Rp 30.000, Teh Rempah Adheni Rp 15.000. Kurma tanpa harga.

| # | Keranjang | Subtotal per baris | Total | Catatan di total |
| --- | --- | --- | --- | --- |
| 1 | Kulit Sambosa Large ×1 | Rp 45.000 | Rp 45.000 | tidak ada |
| 2 | Kulit Sambosa Large ×2, Sambosa Daging ×1 | Rp 90.000, Rp 40.000 | Rp 130.000 | tidak ada |
| 3 | Kasus 2 + Kurma ×1 | Rp 90.000, Rp 40.000, "–" | Rp 130.000 | "+ 1 item harga dikonfirmasi lewat WhatsApp" |
| 4 | Hanya Kurma ×3 | "–" | Rp 0 | "+ 1 item harga dikonfirmasi lewat WhatsApp" |
| 5 | Teh Rempah ×4 | Rp 60.000 | Rp 60.000 | tidak ada |
| 6 | Kasus 3, lalu tekan + pada Kulit Sambosa Large | Rp 135.000, Rp 40.000, "–" | Rp 175.000 | 1 item |
| 7 | Kasus 2, lalu tekan − pada Sambosa Daging sampai 0 | baris hilang | Rp 90.000 | tidak ada |
| 8 | Kosongkan keranjang | | halaman "Masih kosong" | |

Kasus 4: total Rp 0 dengan catatan itu benar; tombol WhatsApp tetap boleh dipakai karena admin menjawab harga.

## Yang diperiksa pada tiap kasus

1. **Baris:** teks `Rp harga × qty` di bawah nama, subtotal di kanan di bawah stepper. Produk tanpa harga: "Harga via WhatsApp".
2. **Total** di drawer (ikon keranjang) **sama persis** dengan total di `/keranjang`.
3. **Stepper** + dan −: total berubah seketika, tanpa muat ulang. Tekan − pada qty 1 menghapus baris.
4. **Muat ulang halaman:** keranjang dan total sama (dipulihkan dari localStorage).
5. **Teks WhatsApp:** tekan "Kirim pesanan via WhatsApp", periksa isi pesan di WhatsApp.

Contoh teks yang harus muncul untuk kasus 3 (nama "Budi", antar, alamat "Depok", catatan "-"):

```
Halo Alba Food Market, saya mau pesan:

1. Kulit Sambosa Large (Isi 50)
   2 x Rp 45.000 = Rp 90.000
2. Sambosa Daging (Isi 10)
   1 x Rp 40.000 = Rp 40.000
3. Kurma
   1 x = harga dikonfirmasi

Total: Rp 130.000 (+ 1 item harga dikonfirmasi)

Nama: Budi
Ambil/antar: Antar
Alamat: Depok
Catatan: -
```

Pilih "Ambil di toko": baris `Alamat` hilang dari pesan.

## Uji otomatis cepat (browser tool / konsol)

Setelah mengisi `localStorage` seperti di atas dan membuka `/keranjang`:

```js
const total = document.querySelector(".total strong").textContent;   // "Rp 130.000"
const wa = decodeURIComponent(document.querySelector("a.btn-red").href.split("text=")[1]);
console.assert(total === "Rp 130.000");
console.assert(wa.includes("Total: Rp 130.000 (+ 1 item harga dikonfirmasi)"));
```

Catatan: `Intl.NumberFormat("id-ID")` memakai spasi tak-pecah antara `Rp` dan angka di beberapa browser. Bandingkan setelah `replace(/\s/g, " ")` bila uji string gagal hanya karena spasi.

## Hasil uji terakhir

Dijalankan di Chromium headless, viewport 390 px, dev server lokal.

- Kasus 3: baris Rp 90.000 / Rp 40.000 / "–", total Rp 130.000, catatan 1 item. Pesan WA sesuai contoh di atas.
- Kasus 6: setelah menekan +, total Rp 175.000.
- Konsol: 0 error.

Belum diuji: kasus 1, 2, 4, 5, 7, 8 secara terpisah; uji di ponsel fisik; pengiriman nyata ke aplikasi WhatsApp.

## Bila harga berubah

Ubah `price` di `data/products.ts`. Tidak perlu migrasi keranjang. Jalankan ulang kasus 2 dan 3 dengan harga baru.
