import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { waLink } from "@/lib/brand";

export const metadata: Metadata = {
  title: "FAQ & Panduan Bantuan | Alba Food Market & Albafroz",
  description:
    "Pertanyaan yang sering diajukan mengenai produk kulit sambosa, penyimpanan frozen food -18°C, cara menggoreng, pengiriman Depok, dan program reseller.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    category: "Penyimpanan & Mutu Frozen",
    items: [
      {
        q: "Berapa lama masa simpan produk frozen Albafroz?",
        a: "Jika disimpan di freezer dengan suhu stabil -18°C atau lebih dingin dalam kemasan tertutup rapat, produk dapat bertahan hingga 6 bulan tanpa mengubah cita rasa. Jika disimpan di kulkas bawah (chiller) suhu 2–4°C, kami sarankan dikonsumsi dalam waktu 2–3 hari.",
      },
      {
        q: "Bagaimana cara menyimpan kulit sambosa agar tidak kering?",
        a: "Simpan lembaran kulit sambosa dalam plastik bersegel rapat di freezer. Bila sudah dibuka dan ada sisa lembaran, bungkus kembali dengan plastic wrap atau wadah kedap udara agar tidak terpapar udara freezer yang menyebabkan pinggiran kulit menjadi kering atau patah.",
      },
      {
        q: "Apakah produk Alba Food Market dan Albafroz Halal?",
        a: "Ya, 100% Halal. Kami hanya menggunakan bahan baku tepung berkualitas, daging sapi segar bersertifikasi halal, dan minyak nabati pilihan tanpa campuran alkohol, babi, atau bahan haram lainnya.",
      },
    ],
  },
  {
    category: "Cara Masak & Penyajian",
    items: [
      {
        q: "Bagaimana cara menggoreng sambosa agar renyah dan isiannya tidak bocor?",
        a: "1. Jangan mencairkan (defrost) sambosa sampai terlalu lembek; cukup diamkan 5-10 menit di suhu ruang.\n2. Panaskan minyak di api sedang hingga panas merata.\n3. Masukkan sambosa dan jangan sering dibolak-balik; cukup balik 1-2 kali hingga warnanya kuning keemasan.\n4. Tiriskan dalam posisi berdiri/miring agar minyak cepat turun dan tidak menumpuk di rongga lipatan.",
      },
      {
        q: "Bagaimana cara memanaskan roti cane / canai beku?",
        a: "Keluarkan roti cane langsung dari freezer ke atas wajan teflon datar yang sudah dipanaskan dengan api kecil-sedang. Tidak perlu menambahkan minyak atau margarin lagi karena adonan sudah mengandung mentega. Panggang 2-3 menit tiap sisi. Setelah diangkat, tepuk-tepuk dari kedua sisinya agar serat-serat rotinya mengembang mekar.",
      },
      {
        q: "Apakah sambosa bisa dimasak dengan Air Fryer?",
        a: "Bisa! Olesi sedikit minyak pada permukaan kulit sambosa, lalu panggang di Air Fryer pada suhu 180°C selama 10–12 menit. Balik di separuh waktu agar matang dan garing merata.",
      },
    ],
  },
  {
    category: "Pemesanan & Pengiriman",
    items: [
      {
        q: "Bagaimana cara memesan produk di Alba Food Market?",
        a: "Anda dapat memilih produk langsung di website ini, memasukkannya ke Keranjang Belanja, dan klik 'Checkout via WhatsApp'. Pesanan Anda akan otomatis diformat rapi dan diteruskan ke admin WhatsApp kami untuk konfirmasi ketersediaan stok, ongkos kirim, dan pembayaran.",
      },
      {
        q: "Area mana saja yang dijangkau pengiriman?",
        a: "Untuk pesanan siap saji & frozen: kami melayani seluruh area Sawangan, Depok, Cibubur, Bogor, Tangerang Selatan, dan Jakarta via GoSend/GrabExpress (Instant & Sameday). Untuk luar Jabodetabek, kami menggunakan ekspedisi khusus pendingin Paxel Frozen (Next Day).",
      },
      {
        q: "Metode pembayaran apa saja yang diterima?",
        a: "Kami menerima Transfer Bank (BCA, Mandiri, BSI, dll), QRIS untuk semua e-wallet (GoPay, OVO, ShopeePay, Dana), serta pembayaran tunai bila Anda berbelanja langsung di workshop kami.",
      },
    ],
  },
  {
    category: "Program Reseller & Grosir",
    items: [
      {
        q: "Berapa minimal order untuk mendapatkan harga reseller?",
        a: "Minimal pemesanan awal hanya 10 pack, dan Anda bebas mencampur (mix) berbagai varian produk (kulit sambosa, sambosa daging, roti cane, pastel, dll).",
      },
      {
        q: "Apakah reseller mendapatkan fasilitas materi promosi?",
        a: "Ya! Setiap mitra reseller resmi berhak atas akses Google Drive materi promosi kami yang berisi foto resolusi tinggi, video masak estetik, dan panduan copywriting siap pakai untuk status WhatsApp atau media sosial.",
      },
      {
        q: "Bagaimana pengemasan pesanan grosir untuk luar kota?",
        a: "Untuk pemesanan minimal 50 pack, kami menyediakan fasilitas Free Styrofoam Box tebal dan Ice Gel pendingin agar produk tetap beku aman di perjalanan.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* Header */}
      <section className="wrap" style={{ paddingTop: "2.5rem" }}>
        <Link className="crumb" href="/" style={{ display: "inline-block", marginBottom: "0.8rem" }}>
          ← Kembali ke Beranda
        </Link>
        <div style={{ maxWidth: "720px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--red)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            PUSAT BANTUAN
          </span>
          <h1 style={{ margin: "0.4rem 0 1rem" }}>Pertanyaan yang Sering Diajukan (FAQ)</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.6 }}>
            Temukan panduan praktis seputar cara penyimpanan, teknik menggoreng sambosa, pengiriman kurir dingin, hingga program kemitraan reseller.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="wrap section">
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {faqs.map((group) => (
            <div key={group.category}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--ink)", borderBottom: "2px solid var(--line)", paddingBottom: "0.5rem" }}>
                {group.category}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {group.items.map((item, idx) => (
                  <details
                    key={idx}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--line)",
                      borderRadius: "14px",
                      padding: "1rem 1.2rem",
                      cursor: "pointer",
                    }}
                  >
                    <summary style={{ fontWeight: 700, fontSize: "1rem", color: "var(--ink)", userSelect: "none", outline: "none" }}>
                      {item.q}
                    </summary>
                    <p style={{ marginTop: "0.8rem", color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Help WhatsApp Banner */}
      <section className="wrap">
        <Reveal className="cta" style={{ background: "#f6f6f4", border: "1px solid var(--line)" }}>
          <h2>Pertanyaan Anda Belum Terjawab?</h2>
          <p style={{ color: "var(--muted)", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
            Customer service kami dengan senang hati membantu Anda melalui chat WhatsApp pada jam operasional kami.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-red" href={waLink("Halo Customer Service Alba Food Market, saya mau bertanya sesuatu.")}>
              Chat Customer Service WhatsApp
            </a>
            <Link className="btn" href="/lokasi" style={{ background: "#fff", border: "1px solid var(--line)" }}>
              Lihat Alamat &amp; Lokasi Toko
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
