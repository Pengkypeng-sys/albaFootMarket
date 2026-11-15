import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { contact, waLink } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Program Reseller & Harga Grosir | Alba Food Market & Albafroz",
  description:
    "Peluang usaha reseller frozen food dan kulit sambosa langsung dari produsen tangan pertama di Sawangan, Depok. Margin tebal hingga 35%, MOQ mulai 10 pack.",
  alternates: { canonical: "/reseller" },
};

const wholesaleList = [
  {
    name: "Kulit Sambosa Premium",
    pack: "Isi 50 Lembar (±500gr)",
    retail: "Rp 25.000",
    wholesale: "Rp 19.500",
    margin: "28%",
    moq: "Min. 10 Pack",
  },
  {
    name: "Sambosa Daging Sapi Spesial",
    pack: "Isi 10 Pcs",
    retail: "Rp 35.000",
    wholesale: "Rp 28.000",
    margin: "25%",
    moq: "Min. 10 Pack",
  },
  {
    name: "Sambosa Cokelat Keju Lumer",
    pack: "Isi 10 Pcs",
    retail: "Rp 28.000",
    wholesale: "Rp 22.000",
    margin: "27%",
    moq: "Min. 10 Pack",
  },
  {
    name: "Pastel Daging Rogout Gurih",
    pack: "Isi 10 Pcs",
    retail: "Rp 32.000",
    wholesale: "Rp 26.000",
    margin: "23%",
    moq: "Min. 10 Pack",
  },
  {
    name: "Roti Cane / Canai Original",
    pack: "Isi 5 Pcs (Diameter ±16cm)",
    retail: "Rp 25.000",
    wholesale: "Rp 19.500",
    margin: "28%",
    moq: "Min. 10 Pack",
  },
  {
    name: "Roti Cane Cokelat Meses",
    pack: "Isi 5 Pcs",
    retail: "Rp 28.000",
    wholesale: "Rp 22.000",
    margin: "27%",
    moq: "Min. 10 Pack",
  },
  {
    name: "Madu Murni Hey Honey Multiflora",
    pack: "Jar Kaca 350gr",
    retail: "Rp 65.000",
    wholesale: "Rp 52.000",
    margin: "25%",
    moq: "Min. 6 Jar",
  },
];

const testimonials = [
  {
    name: "Ibu Ningsih",
    role: "Reseller Frozen Food, Sawangan Permai",
    text: "Mulai ambil 15 pack buat ditawarkan di grup arisan dan komplek, sekarang rutin ambil 80-100 pack per minggu. Kulit sambosanya tidak pernah ada keluhan, renyah dan gurih dagingnya pas!",
  },
  {
    name: "Dapur Bu Rina",
    role: "Katering & Snack Box, Pasir Putih Depok",
    text: "Kulit sambosa Alba Food jadi andalan untuk isian snack box kami. Lentur banget, digulung cepat tanpa robek. Sangat menghemat waktu produksi katering.",
  },
  {
    name: "Pak Dimas",
    role: "Owner Kedai Kopi & Camilan, Depok",
    text: "Roti canai Albafroz laris manis buat menu sarapan dan teman ngopi sore. Praktis tinggal panggang di teflon, marginnya sangat menguntungkan.",
  },
];

export default function ResellerPage() {
  const resellerWa = waLink(
    "Halo Admin Alba Food Market, saya ingin mendaftar sebagai Reseller/Mitra Grosir. Boleh minta info katalog lengkap dan cara order perdana?",
  );

  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* Top Banner Ribbon */}
      <div
        style={{
          background: "#006d30",
          color: "#fff",
          padding: "0.75rem 1rem",
          textAlign: "center",
          fontSize: "0.85rem",
          fontWeight: 600,
        }}
      >
        <div className="wrap" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ background: "#97f8a7", color: "#00210a", padding: "2px 8px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 800 }}>
            KEMITRAAN RESMI
          </span>
          <span>Produsen Tangan Pertama Kulit Sambosa &amp; Frozen Food Sawangan Depok. Kuota mitra aktif per kecamatan dibuka!</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="wrap hero" style={{ paddingTop: "2.5rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#e8f5ed", padding: "4px 12px", borderRadius: "999px", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#006d30", fontWeight: 700 }}>
              🤝 PROGRAM RESELLER &amp; GROSIR RESMI
            </span>
          </div>
          <h1 style={{ marginBottom: "1.2rem" }}>
            Raih Cuan dari Rumah Bersama <span style={{ color: "var(--red)" }}>Produsen Tangan Pertama</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "1.8rem", lineHeight: 1.6 }}>
            Suplai langsung dari workshop produksi <strong>Alba Food Market</strong> dan lini <strong>Albafroz</strong> di Sawangan Depok. Nikmati margin keuntungan hingga 35%, kualitas terjamin higienis, dan modal awal yang ramah pemula mulai 10 pack saja.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a className="btn btn-red" href={resellerWa} target="_blank" rel="noreferrer">
              Daftar Jadi Reseller via WhatsApp
            </a>
            <a className="btn" href="#tabel-harga" style={{ border: "1.5px solid var(--line)" }}>
              Lihat Skema Harga Grosir ↓
            </a>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginTop: "2rem" }}>
            <div style={{ background: "#f6f6f4", padding: "14px", borderRadius: "14px" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#006d30" }}>10 Pack</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>MOQ ramah pemula</div>
            </div>
            <div style={{ background: "#f6f6f4", padding: "14px", borderRadius: "14px" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--red)" }}>s/d 35%</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>Margin keuntungan</div>
            </div>
            <div style={{ background: "#f6f6f4", padding: "14px", borderRadius: "14px" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#735c00" }}>100% Free</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>Foto & video promosi</div>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 12px 36px rgba(0,0,0,0.08)", background: "#fff", border: "1px solid var(--line)" }}>
            <div style={{ background: "#006d30", color: "#fff", padding: "1.2rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Kenapa Pilih Kemitraan Alba Food?</h3>
              <p style={{ margin: "4px 0 0", fontSize: "0.85rem", opacity: 0.9 }}>Partner terpercaya untuk reseller rumahan, katering, dan gerai UMKM.</p>
            </div>
            <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ background: "#e8f5ed", color: "#006d30", fontWeight: 800, borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                <div>
                  <strong style={{ fontSize: "0.95rem" }}>Harga Tangan Pertama</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "2px 0 0" }}>Tanpa perantara. Margin maksimal untuk Anda sebagai mitra penjual.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ background: "#e8f5ed", color: "#006d30", fontWeight: 800, borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                <div>
                  <strong style={{ fontSize: "0.95rem" }}>Bebas Mix Varian</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "2px 0 0" }}>Bisa campur sambosa, roti canai, pastel, dan kulit sambosa untuk memenuhi kuota MOQ.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ background: "#e8f5ed", color: "#006d30", fontWeight: 800, borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                <div>
                  <strong style={{ fontSize: "0.95rem" }}>Pengemasan Dingin Aman</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "2px 0 0" }}>Free Styrofoam Box &amp; Ice Gel untuk pemesanan minimal 50 pack.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ background: "#e8f5ed", color: "#006d30", fontWeight: 800, borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                <div>
                  <strong style={{ fontSize: "0.95rem" }}>Bimbingan &amp; Aset Promosi Siap Pakai</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", margin: "2px 0 0" }}>Akses ke Google Drive foto produk estetik, video masak, dan copy jualan tinggal copas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="wrap section" id="tabel-harga">
        <div className="head">
          <div>
            <h2 style={{ fontSize: "1.8rem" }}>Skema Harga Grosir &amp; Reseller</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Perbandingan harga eceran vs harga mitra grosir tangan pertama.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "#006d30", fontWeight: 700, background: "#e8f5ed", padding: "4px 12px", borderRadius: "999px" }}>
            Tier Grosir Aktif 2026
          </span>
        </div>

        <div style={{ overflowX: "auto", background: "#fff", border: "1px solid var(--line)", borderRadius: "16px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ background: "#f6f6f4", borderBottom: "1px solid var(--line)" }}>
                <th style={{ padding: "14px 16px", fontWeight: 700 }}>Produk &amp; Kemasan</th>
                <th style={{ padding: "14px 16px", fontWeight: 700 }}>Minimal Order</th>
                <th style={{ padding: "14px 16px", fontWeight: 700 }}>Harga Eceran</th>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "#006d30" }}>Harga Grosir</th>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "var(--red)" }}>Estimasi Margin</th>
              </tr>
            </thead>
            <tbody>
              {wholesaleList.map((item, idx) => (
                <tr key={item.name} style={{ borderBottom: idx < wholesaleList.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{item.pack}</div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--muted)" }}>{item.moq}</td>
                  <td style={{ padding: "14px 16px", textDecoration: "line-through", color: "var(--muted)" }}>{item.retail}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#006d30" }}>{item.wholesale}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ background: "#fdf2f0", color: "#b30400", fontWeight: 800, padding: "2px 8px", borderRadius: "999px", fontSize: "0.8rem" }}>
                      +{item.margin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.8rem" }}>
          * Harga dapat disesuaikan untuk pengambilan volume partai besar (katering 200+ pack atau distributor wilayah). Hubungi CS untuk negosiasi khusus.
        </p>
      </section>

      {/* 4 Easy Steps */}
      <section className="wrap section">
        <div className="head">
          <div>
            <h2 style={{ fontSize: "1.8rem" }}>4 Langkah Mudah Menjadi Reseller</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Proses cepat tanpa syarat ribet. Hari ini daftar, besok siap jualan.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#006d30", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              1
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Hubungi Admin Kemitraan</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Klik tombol WhatsApp untuk terhubung dengan tim kemitraan kami. Beritahukan nama dan domisili Anda.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#006d30", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              2
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Pilih Paket / Mix Produk</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Tentukan pesanan awal Anda (minimal 10 pack, bebas mix varian sambosa, cane, pastel, atau kulit).
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#006d30", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              3
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Pengiriman Dingin Cepat</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Pesanan dikemas aman dengan cold packaging dan dikirim via kurir instan/sameday atau Paxel Frozen langsung ke alamat Anda.
            </p>
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#006d30", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              4
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>Mulai Jualan &amp; Cuan</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Gunakan foto dan materi promosi yang kami sediakan untuk posting di status WhatsApp, Instagram, dan grup lingkungan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="wrap section">
        <div className="head">
          <div>
            <h2 style={{ fontSize: "1.8rem" }}>Kata Mitra Reseller Kami</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Pengalaman nyata mitra dan pelanggan usaha di Sawangan, Depok, dan Jabodetabek.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ color: "#d90700", fontSize: "1.1rem", marginBottom: "0.5rem" }}>★★★★★</div>
              <p style={{ fontSize: "0.92rem", color: "var(--ink)", lineHeight: 1.6, marginBottom: "1rem", fontStyle: "italic" }}>
                “{t.text}”
              </p>
              <div>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>{t.name}</strong>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="wrap">
        <Reveal className="cta" style={{ background: "#f0faf3", border: "1.5px solid #c2e8ce" }}>
          <h2 style={{ color: "#006d30" }}>Siap Memulai Usaha Frozen Food Bersama Alba Food?</h2>
          <p style={{ color: "#2d5a3c", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
            Dapatkan katalog lengkap, info ketersediaan stok harian, dan panduan jualan langsung dari tim kami.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-red" href={resellerWa} target="_blank" rel="noreferrer" style={{ background: "#006d30" }}>
              Daftar Reseller via WhatsApp Sekarang
            </a>
            <Link className="btn" href="/produk" style={{ background: "#fff", border: "1px solid #c2e8ce" }}>
              Lihat Katalog Produk Eceran
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
