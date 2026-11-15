# Prompt Website Alba Food Market & Albafroz

Kamu adalah senior full-stack developer dan UI designer. Buatkan website lengkap untuk "Alba Food Market" beserta lini frozen-nya "Albafroz", lalu kerjakan sampai jadi project yang bisa dijalankan. Jangan berhenti di rencana.

## 1. Profil bisnis & arsitektur brand
- Alba Food Market (@albafoodmarket): brand induk, produsen kulit sambosa & frozen food premium. Tagline: "Your Everyday food supplies. Fresh, Frozen & Healthy food."
- Albafroz: brand untuk lini frozen food (muncul di feed IG dengan kampanye "coming with our new face"). Tampilkan sebagai sub-brand dengan identitas sendiri, tetap jelas bahwa ia bagian dari Alba Food Market.
- Alamat: Perumahan Koperasi BUGN, Jl. Pasir Kaliki 4 Blok B4 No. 70 & 72, Pasir Putih, Kec. Sawangan, Kota Depok, Jawa Barat 16519
- WhatsApp: +62 896-2214-8082 (wa.me/6289622148082)
- Instagram: https://www.instagram.com/albafoodmarket
- Produk: kulit sambosa, sambosa (isi daging, varian cokelat), pastel daging, roti canai/cane (original dan varian), serta madu Hey Honey (brand saudara, @hayhoney.co)
- Pembagian katalog: "Alba Food Market" untuk kulit sambosa & bahan dasar, "Albafroz" untuk produk frozen siap goreng/masak. Pembagian pastinya [ISI], buat sebagai field `brand` di data produk supaya gampang dipindah.
- Segmen: (a) reseller & UMKM yang beli banyak, (b) ibu rumah tangga dan konsumen akhir
- Layanan: pengiriman (highlight IG "KIRIMAN / We Deliver"). Area & ongkir: [ISI]. Jam operasional: [ISI]
- Footer: "Bagian dari" @halastudios dan @hayhoney.co

## 2. Identitas visual
- Alba Food Market: logo lingkaran putih, "ALBA" merah, "FOOD" hijau, "MARKET" hijau tua, huruf kapital tebal
- Albafroz: wordmark script merah dengan aksen daun hijau, biasanya di pill krem di atas latar merah solid
- Palet bersama: merah (±#E10600), hijau, kuning cerah (aksen dominan di feed IG), krem/putih sebagai latar
- Buat design token untuk dua brand (warna, radius, font) dan simpan di `lib/brand.ts`, sehingga nama, logo, dan warna bisa diganti di satu tempat
- Gaya: ceria, hangat, berani. Judul tebal, isi bersih. Foto close-up makanan (sambosa disobek, lelehan cokelat, tumpukan canai dengan stroberi) jadi fokus visual
- Kontras lolos WCAG AA. Hindari tampilan template generik.

## 3. Tujuan
1. Orang yang cari "kulit sambosa" atau "frozen food" di Sawangan/Depok menemukan Alba Food.
2. Konsumen bisa lihat produk dan pesan lewat WhatsApp dalam beberapa klik.
3. Reseller punya jalur sendiri: harga grosir, minimal order, daftar reseller.
4. Lokasi, jam buka, dan info kirim mudah ditemukan.

## 4. Halaman & fitur
- **Beranda**: hero (headline + CTA "Pesan via WhatsApp" dan "Jadi Reseller"), dua kartu brand (Alba Food Market dan Albafroz), produk unggulan, keunggulan (produsen langsung, fresh & frozen, kualitas konsisten), testimoni, info kirim, lokasi ringkas
- **Produk**: grid kartu (foto, nama, brand, isi per pack, harga, badge "Grosir tersedia"), filter brand dan kategori, halaman detail
- **Albafroz** (`/albafroz`): landing sub-brand dengan identitas merah-krem, produk frozen, cara simpan dan masak
- **Keranjang** (localStorage). Checkout membuat pesan WhatsApp otomatis berformat rapi: item, qty, total, nama, alamat atau ambil di tempat, catatan
- **Reseller/Grosir**: harga bertingkat berdasarkan jumlah, minimal order, cara order, testimoni reseller, CTA WhatsApp khusus reseller
- **Testimoni**: kartu dengan nama dan profesi
- **Tentang Kami**: cerita produsen, hubungan Alba Food Market dan Albafroz, proses produksi
- **Lokasi & Kontak**: Google Maps embed, alamat, jam buka, tombol rute, WhatsApp, Instagram
- **FAQ**: penyimpanan frozen, masa simpan, cara menggoreng, pengiriman, pembayaran, pre-order
- Tombol WhatsApp melayang di semua halaman
- Opsional: "Resep & Ide Olahan" dari kulit sambosa (bagus untuk SEO)

Data produk di `data/products.ts` (tanpa database), dengan komentar cara menambah produk. Struktur harus gampang dipindah ke CMS atau Supabase.

## 5. Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- next/image, next/font, deploy ke Vercel
- Tanpa backend dulu. Folder rapi: `app/`, `components/`, `data/`, `lib/`, `public/`
- Keranjang: Context atau Zustand, persist ke localStorage

## 6. SEO
- Metadata unik per halaman (title, description, Open Graph, canonical)
- JSON-LD: LocalBusiness/FoodEstablishment dan Product, plus Brand untuk Albafroz
- sitemap.xml, robots.txt, heading semantik, alt text deskriptif
- Kata kunci alami: "kulit sambosa Depok", "produsen kulit sambosa", "frozen food Sawangan", "Albafroz", "roti canai frozen Depok", "reseller frozen food Depok", "Alba Food Market"
- URL bersih: `/produk`, `/albafroz`, `/reseller`, `/lokasi`, `/tentang`, `/faq`

## 7. UX & performa
- Mobile-first (pengunjung mayoritas dari IG dan WhatsApp), tetap rapi di desktop
- CTA besar, area sentuh min. 44px
- Target Lighthouse ≥ 90 di semua kategori
- Lazy loading gambar, animasi halus
- Bahasa Indonesia santai tapi sopan

## 8. Output
1. Struktur project dan semua kode lengkap per file
2. Data contoh realistis dengan harga placeholder yang ditandai jelas
3. Cara menjalankan lokal dan deploy ke Vercel (singkat)
4. Daftar yang harus saya isi/ganti (foto asli, logo vektor kedua brand, harga, jam buka, area kirim, pembagian produk per brand)
5. Saran pengembangan lanjutan (admin panel, ongkir otomatis, pembayaran online) dengan pro/kontra singkat

Kalau ada info yang belum jelas, pakai asumsi paling masuk akal, tandai `// TODO: konfirmasi`, lalu lanjut kerjakan.
