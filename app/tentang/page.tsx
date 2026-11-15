import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { contact, partners, waLink } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Tentang Kami | Cerita Alba Food Market & Albafroz",
  description:
    "Mengenal Alba Food Market dan lini Albafroz: Produsen kulit sambosa premium dan aneka frozen food higienis dari Sawangan, Depok.",
  alternates: { canonical: "/tentang" },
};

export default function TentangPage() {
  return (
    <div style={{ paddingBottom: "4rem" }}>
      {/* Header Breadcrumb & Title */}
      <section className="wrap" style={{ paddingTop: "2.5rem" }}>
        <Link className="crumb" href="/" style={{ display: "inline-block", marginBottom: "0.8rem" }}>
          ← Kembali ke Beranda
        </Link>
        <div style={{ maxWidth: "760px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--red)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            CERITA KAMI
          </span>
          <h1 style={{ margin: "0.4rem 0 1rem" }}>
            Dedikasi Menghadirkan Kulit Sambosa &amp; Frozen Food Terbaik untuk Keluarga Indonesia
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--muted)", lineHeight: 1.6 }}>
            Bermula dari dapur produksi di Pasir Putih, Sawangan, Depok, <strong>Alba Food Market</strong> tumbuh menjadi produsen terpercaya untuk kulit sambosa bermutu tinggi dan aneka sajian frozen lezat lewat lini <strong>Albafroz</strong>.
          </p>
        </div>
      </section>

      {/* Story Bento Section */}
      <section className="wrap section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Awal Mula Perjalanan</h2>
            <p style={{ color: "var(--ink)", lineHeight: 1.7, marginBottom: "1rem" }}>
              Alba Food Market lahir dari komitmen sederhana: menghadirkan kulit sambosa yang lentur, renyah ketika digoreng, dan tidak mudah robek saat dilipat. Kebutuhan akan kulit sambosa berkualitas di area Depok dan sekitarnya mendorong kami membangun fasilitas produksi higienis yang melayani baik konsumen keluarga maupun pelaku UMKM dan katering.
            </p>
            <p style={{ color: "var(--ink)", lineHeight: 1.7, marginBottom: "1rem" }}>
              Melihat tingginya antusiasme pelanggan, kami memperluas lini produk dengan meluncurkan <strong>Albafroz</strong>—lini frozen food siap goreng yang mencakup sambosa daging sapi dengan rempah autentik, sambosa cokelat keju lumer, pastel daging rogout, hingga roti cane empuk berserat.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem" }}>
              <Link className="btn btn-red" href="/albafroz">
                Eksplor Lini Albafroz →
              </Link>
              <Link className="btn" href="/lokasi" style={{ border: "1px solid var(--line)" }}>
                Kunjungi Workshop Kami
              </Link>
            </div>
          </div>

          <div style={{ background: "#f6f6f4", borderRadius: "24px", padding: "2rem", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "var(--ink)" }}>Prinsip Mutu Kami</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>🌱</span>
                <div>
                  <strong>Bahan Alami Pilihan</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "2px 0 0" }}>
                    Dibuat dengan tepung berkualitas, rempah segar, dan daging sapi pilihan tanpa campuran pengawet sintetis.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>❄️</span>
                <div>
                  <strong>Standar Cold-Chain -18°C</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "2px 0 0" }}>
                    Proses pembekuan cepat segera setelah produksi mengunci cita rasa, kelembapan adonan, dan nilai nutrisi.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>🤝</span>
                <div>
                  <strong>Tumbuh Bersama Mitra UMKM</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "2px 0 0" }}>
                    Mendukung ratusan katering, penjual camilan, dan reseller rumahan dengan harga tangan pertama yang berkeadilan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Ecosystem */}
      <section className="wrap section">
        <div className="head">
          <div>
            <h2 style={{ fontSize: "1.8rem" }}>Ekosistem Brand Kami</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Sinergi lini usaha di bawah naungan keluarga besar Alba Food.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {/* Brand 1: Alba Food Market */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "18px", padding: "1.8rem" }}>
            <div style={{ display: "inline-block", background: "var(--ink)", color: "#fff", fontSize: "0.75rem", fontWeight: 700, padding: "2px 10px", borderRadius: "999px", marginBottom: "0.8rem" }}>
              BRAND INDUK
            </div>
            <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.5rem" }}>Alba Food Market</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Produsen kulit sambosa lembaran premium, bumbu rempah autentik, kurma sukari pilihan, dan bahan kuliner dasar. Pilihan utama dapur katering dan penikmat camilan rumahan.
            </p>
            <Link href="/produk" style={{ color: "var(--red)", fontWeight: 700, fontSize: "0.9rem" }}>
              Lihat Bahan Dasar →
            </Link>
          </div>

          {/* Brand 2: Albafroz */}
          <div style={{ background: "#fff", border: "1.5px solid #fbd2ce", borderRadius: "18px", padding: "1.8rem" }}>
            <div style={{ display: "inline-block", background: "#e10600", color: "#fff", fontSize: "0.75rem", fontWeight: 700, padding: "2px 10px", borderRadius: "999px", marginBottom: "0.8rem" }}>
              LINI FROZEN FOOD
            </div>
            <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.5rem", color: "#b30400" }}>Albafroz</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Lini produk beku siap masak higienis: aneka varian sambosa gurih &amp; manis, pastel daging rogout, serta roti cane original bertingkat. Praktis, lezat, dan halal 100%.
            </p>
            <Link href="/albafroz" style={{ color: "#b30400", fontWeight: 700, fontSize: "0.9rem" }}>
              Jelajahi Menu Albafroz →
            </Link>
          </div>

          {/* Brand 3: Hey Honey */}
          <div style={{ background: "#fff", border: "1px solid #ffe087", borderRadius: "18px", padding: "1.8rem" }}>
            <div style={{ display: "inline-block", background: "#cfa600", color: "#231a00", fontSize: "0.75rem", fontWeight: 700, padding: "2px 10px", borderRadius: "999px", marginBottom: "0.8rem" }}>
              BRAND SAUDARA
            </div>
            <h3 style={{ fontSize: "1.3rem", margin: "0 0 0.5rem", color: "#735c00" }}>Hey Honey (@hayhoney.co)</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Penyedia madu murni alami multiflora tanpa pemanis sintetis. Pendamping sempurna untuk santapan roti cane hangat atau konsumsi kesehatan harian keluarga.
            </p>
            <a href="https://www.instagram.com/hayhoney.co" target="_blank" rel="noreferrer" style={{ color: "#735c00", fontWeight: 700, fontSize: "0.9rem" }}>
              Kunjungi @hayhoney.co →
            </a>
          </div>
        </div>
      </section>

      {/* Workshop & Location Preview */}
      <section className="wrap section">
        <div style={{ background: "#f6f6f4", borderRadius: "20px", padding: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "0.8rem" }}>Lokasi &amp; Dapur Produksi</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              {contact.address}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              <div><strong>Jam Buka Workshop:</strong> {contact.hours.label}</div>
              <div><strong>Layanan:</strong> Belanja langsung di tempat, kurir instan/sameday, &amp; Paxel Frozen.</div>
            </div>
            <Link className="btn btn-red" href="/lokasi">
              Buka Google Maps &amp; Panduan Rute
            </Link>
          </div>

          <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.6rem" }}>Bagian dari Jaringan Kreatif</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Alba Food Market dan Albafroz bangga berkolaborasi aktif dengan jejaring lokal:
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
              {partners.map((p) => (
                <li key={p.handle}>
                  <a href={p.url} target="_blank" rel="noreferrer" style={{ color: "var(--red)", fontWeight: 700 }}>
                    {p.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="wrap">
        <Reveal className="cta">
          <h2>Ingin Mengetahui Lebih Banyak atau Bekerja Sama?</h2>
          <p style={{ color: "var(--muted)", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
            Tim kami siap menyambut pertanyaan, kerja sama suplai katering, dan pembelian dalam jumlah besar.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-red" href={waLink("Halo Alba Food Market, saya ingin berdiskusi mengenai kerja sama.")}>
              Hubungi Kami via WhatsApp
            </a>
            <Link className="btn" href="/produk" style={{ background: "#fff", border: "1px solid var(--line)" }}>
              Lihat Katalog Produk
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
