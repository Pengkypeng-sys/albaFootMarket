import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products, thumb } from "@/data/products";
import { contact, waLink } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Albafroz | Lini Frozen Food Siap Goreng & Masak Premium",
  description:
    "Albafroz oleh Alba Food Market: Sambosa daging sapi, sambosa cokelat, pastel daging, dan roti cane beku higienis suhu -18°C di Sawangan, Depok.",
  alternates: { canonical: "/albafroz" },
};

const albafrozProducts = products.filter((p) => p.brand === "Albafroz");

export default function AlbafrozPage() {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* Banner New Face Campaign */}
      <div
        style={{
          background: "linear-gradient(90deg, #b30400 0%, #e10600 50%, #b30400 100%)",
          color: "#fff",
          padding: "0.85rem 1rem",
          textAlign: "center",
          fontSize: "0.9rem",
          fontWeight: 600,
        }}
      >
        <div className="wrap" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span
            style={{
              background: "#ffe087",
              color: "#231a00",
              fontSize: "0.72rem",
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: "999px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Coming with Our New Face!
          </span>
          <span>Wajah Baru <strong>Albafroz</strong>: Rasa makin kaya, kemasan food-grade higienis, garansi beku prima -18°C.</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="wrap hero" style={{ paddingTop: "2.5rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fdf2f0", padding: "4px 12px", borderRadius: "999px", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#b30400", fontWeight: 700 }}>
              ❄️ SUB-BRAND FROZEN FOOD ALBA FOOD MARKET
            </span>
          </div>
          <h1 style={{ marginBottom: "1.2rem" }}>
            Sajian Istimewa Keluarga, <span style={{ color: "#d90700" }}>Siap Masak</span> Kapan Saja.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "1.8rem", lineHeight: 1.6 }}>
            Dari racikan rempah daging sapi autentik, lelehan cokelat lumer sambosa, hingga roti canai lapis bertingkat yang empuk renyah. Diproses higienis dan dibekukan cepat pada <strong>-18°C</strong> untuk mengunci rasa segar alami tanpa bahan pengawet berbahaya.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a className="btn btn-red" href={waLink("Halo Albafroz, saya mau pesan frozen food.")}>
              Pesan Albafroz via WhatsApp
            </a>
            <Link className="btn" href="/reseller" style={{ border: "1.5px solid var(--line)" }}>
              Paket Kemitraan Reseller →
            </Link>
          </div>

          {/* Quick Value Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginTop: "2rem" }}>
            <div style={{ background: "#f6f6f4", padding: "12px", borderRadius: "12px" }}>
              <div style={{ color: "#006d30", fontWeight: 700, fontSize: "0.9rem" }}>✓ 100% Halal</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>Daging sapi segar tanpa pengawet</div>
            </div>
            <div style={{ background: "#f6f6f4", padding: "12px", borderRadius: "12px" }}>
              <div style={{ color: "#b30400", fontWeight: 700, fontSize: "0.9rem" }}>❄️ Cold Chain -18°C</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>Rasa & kesegaran terkunci sempurna</div>
            </div>
            <div style={{ background: "#f6f6f4", padding: "12px", borderRadius: "12px" }}>
              <div style={{ color: "#735c00", fontWeight: 700, fontSize: "0.9rem" }}>⏱️ 5 Menit Saji</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>Praktis tinggal goreng atau panggang</div>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 12px 36px rgba(0,0,0,0.08)", background: "#fff" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb(products.find((p) => p.slug === "sambosa-daging")?.image || products[1].image, 800)}
              alt="Aneka olahan sambosa dan roti cane beku Albafroz"
              style={{ width: "100%", height: "360px", objectFit: "cover" }}
            />
            <div style={{ padding: "1.2rem", background: "#fff" }}>
              <span style={{ fontSize: "0.75rem", background: "#fdf2f0", color: "#d90700", fontWeight: 700, padding: "2px 8px", borderRadius: "4px" }}>
                KUALITAS PREMIUM
              </span>
              <h3 style={{ margin: "6px 0 2px", fontSize: "1.05rem" }}>Kulit Renyah Berlapis, Isian Daging Melimpah</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Dibuat dengan bahan baku kulit sambosa segar langsung dari pabrik kami.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Albafroz */}
      <section className="wrap section" id="katalog-albafroz">
        <div className="head">
          <div>
            <h2 style={{ fontSize: "1.8rem" }}>Menu Pilihan Albafroz</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Semua produk dibekukan segera setelah produksi untuk mutu terbaik.</p>
          </div>
          <Link href="/produk" style={{ color: "var(--red)", fontWeight: 600 }}>Lihat Semua Produk →</Link>
        </div>

        <div className="grid">
          {albafrozProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Cooking & Storage Guides */}
      <section className="wrap section">
        <div className="head">
          <div>
            <h2 style={{ fontSize: "1.8rem" }}>Panduan Memasak &amp; Menyimpan</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Ikuti langkah sederhana ini agar hasil gorengan renyah maksimal dan tidak berminyak.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {/* Guide 1: Goreng Sambosa */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "inline-flex", background: "#ffe087", color: "#231a00", fontWeight: 700, fontSize: "0.8rem", padding: "2px 8px", borderRadius: "6px", marginBottom: "0.8rem" }}>
              PANDUAN 01
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>Cara Menggoreng Sambosa &amp; Pastel</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem", color: "var(--ink)", paddingLeft: "1.2rem", listStyleType: "decimal" }}>
              <li><strong>Jangan defrost berlebihan:</strong> Keluarkan dari freezer 5-10 menit sebelum digoreng. Sambosa masih agak padat mencegah isian bocor.</li>
              <li><strong>Suhu minyak sedang:</strong> Panaskan minyak dengan api sedang. Uji dengan mencelupkan ujung sutil kayu hingga timbul gelembung kecil.</li>
              <li><strong>Goreng santai:</strong> Masukkan sambosa, jangan sering dibolak-balik. Cukup balik 1-2 kali hingga kedua sisi kuning keemasan.</li>
              <li><strong>Tiriskan posisi miring:</strong> Tiriskan sambosa dengan posisi berdiri/miring di atas peniris agar minyak tidak terperangkap di lipatan.</li>
            </ul>
          </div>

          {/* Guide 2: Roti Cane */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "inline-flex", background: "#ffe087", color: "#231a00", fontWeight: 700, fontSize: "0.8rem", padding: "2px 8px", borderRadius: "6px", marginBottom: "0.8rem" }}>
              PANDUAN 02
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>Cara Memanggang Roti Cane</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem", color: "var(--ink)", paddingLeft: "1.2rem", listStyleType: "decimal" }}>
              <li><strong>Gunakan wajan teflon datar:</strong> Panaskan wajan di atas api kecil-sedang tanpa perlu menambahkan minyak atau mentega banyak.</li>
              <li><strong>Panggang merata:</strong> Masukkan roti cane beku langsung ke wajan. Panggang selama 2-3 menit tiap sisi sampai timbul bercak cokelat harum.</li>
              <li><strong>Tepuk lembut:</strong> Setelah diangkat ke piring, tepuk roti cane dari kedua sisi menggunakan tangan (hati-hati panas) agar serat adonannya terlepas dan mekar berserat.</li>
              <li><strong>Sajikan:</strong> Nikmati bersama kuah kari daging, madu Hey Honey, taburan gula, atau keju susu.</li>
            </ul>
          </div>

          {/* Guide 3: Penyimpanan */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "inline-flex", background: "#ffe087", color: "#231a00", fontWeight: 700, fontSize: "0.8rem", padding: "2px 8px", borderRadius: "6px", marginBottom: "0.8rem" }}>
              PANDUAN 03
            </div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>Penyimpanan Cold Chain -18°C</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem", color: "var(--ink)", paddingLeft: "1.2rem", listStyleType: "decimal" }}>
              <li><strong>Freezer beku:</strong> Simpan di freezer suhu -18°C ke bawah. Produk bertahan dengan cita rasa prima hingga 6 bulan.</li>
              <li><strong>Kulkas bawah (chiller):</strong> Bila disimpan di chiller biasa, disarankan dikonsumsi dalam waktu 2-3 hari.</li>
              <li><strong>Tutup rapat:</strong> Pastikan kemasan atau wadah tertutup rapat untuk mencegah kristal es berlebihan (freezer burn) yang merusak kerenyahan kulit.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="wrap">
        <Reveal className="cta" style={{ background: "#fff5f4", border: "1.5px solid #fbd2ce" }}>
          <h2 style={{ color: "#b30400" }}>Siapkan Stok Frozen Food Lezat di Rumah Anda</h2>
          <p style={{ color: "var(--muted)", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
            Praktis untuk sarapan, bekal anak sekolah, hingga takjil dan camilan tamu. Pengiriman cepat instan/sameday area Sawangan, Depok, dan sekitarnya.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-red" href={waLink("Halo Albafroz, saya ingin order aneka frozen food untuk stok di rumah.")}>
              Order Langsung via WhatsApp
            </a>
            <Link className="btn" href="/keranjang" style={{ background: "#fff", border: "1px solid var(--line)" }}>
              Buka Keranjang Belanja
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
