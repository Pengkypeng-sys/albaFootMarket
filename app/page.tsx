import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Fridge } from "@/components/Fridge";
import { Reveal } from "@/components/Reveal";
import { SearchBox } from "@/components/SearchBox";
import { StatusBadge } from "@/components/StatusBadge";
import { categories, products, thumb } from "@/data/products";
import { contact, waLink } from "@/lib/brand";

const tiles = categories
  .filter((c) => c.id !== "semua")
  .map((c) => ({ ...c, image: products.find((p) => p.category === c.id)!.image }));

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

const testimonials = [
  {
    quote: "Kulit sambosanya juara! Lentur, tidak gampang sobek waktu digulung, dan renyah tahan lama setelah digoreng. Jadi langganan tetap katering kami.",
    author: "Ibu Haryati",
    role: "Katering Sawangan, Depok",
  },
  {
    quote: "Sambosa daging sapi Albafroz bumbunya pas banget, gurih rempahnya terasa premium. Anak-anak di rumah suka banget buat sarapan.",
    author: "Fauzi R.",
    role: "Konsumen Rumah Tangga, Cinere",
  },
  {
    quote: "Ambil reseller 20 pack pertama langsung habis dalam 2 hari di grup WhatsApp komplek. Untungnya lumayan banget, packing kirimnya juga rapi dan beku.",
    author: "Mba Dita",
    role: "Mitra Reseller, Pasir Putih",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="wrap hero">
        <div>
          <h1 className="rise" style={rise(0)}>
            Cari apa <span>hari ini?</span>
          </h1>
          <p className="rise" style={{ ...rise(1), fontSize: "1.05rem", color: "var(--muted)", margin: "0.5rem 0 1rem" }}>
            Produsen Kulit Sambosa Premium &amp; Aneka Frozen Food Higienis di Sawangan, Depok.
          </p>
          <div className="rise" style={rise(1)}>
            <SearchBox large />
          </div>
          <div className="rise" style={{ ...rise(2), display: "flex", gap: "10px", marginTop: "1rem", flexWrap: "wrap" }}>
            <a className="btn btn-red" href={waLink("Halo Alba Food Market, saya mau pesan.")}>
              Pesan via WhatsApp
            </a>
            <Link className="btn" href="/reseller" style={{ border: "1.5px solid var(--line)", background: "#fff" }}>
              🤝 Jadi Reseller (Grosir)
            </Link>
          </div>
          <div className="meta rise" style={rise(2)}>
            <StatusBadge />
            <span className="muted">{contact.hours.label}</span>
          </div>
        </div>
        <div className="hero-media rise" style={rise(1)}>
          <Fridge />
        </div>
      </section>

      {/* Dual Brand Cards Section */}
      <section className="wrap" style={{ paddingBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {/* Card Alba Food Market */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid var(--line)",
              borderRadius: "20px",
              padding: "1.6rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "inline-block", background: "var(--ink)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", marginBottom: "0.6rem" }}>
                BRAND INDUK &amp; PABRIK
              </div>
              <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.4rem" }}>Alba Food Market</h2>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.5 }}>
                Produsen langsung kulit sambosa lembaran tipis lentur, bumbu kari rempah khas, dan kurma pilihan. Suplai tangan pertama untuk dapur &amp; katering.
              </p>
            </div>
            <div style={{ marginTop: "1.2rem" }}>
              <Link href="/produk" style={{ color: "var(--red)", fontWeight: 700, fontSize: "0.92rem" }}>
                Lihat Bahan Dasar Kulit &amp; Rempah →
              </Link>
            </div>
          </div>

          {/* Card Albafroz */}
          <div
            style={{
              background: "#fff5f4",
              border: "1.5px solid #fbd2ce",
              borderRadius: "20px",
              padding: "1.6rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "inline-block", background: "#e10600", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", marginBottom: "0.6rem" }}>
                LINI FROZEN FOOD BARU
              </div>
              <h2 style={{ fontSize: "1.4rem", margin: "0 0 0.4rem", color: "#b30400" }}>Albafroz</h2>
              <p style={{ fontSize: "0.9rem", color: "#6a2e2a", lineHeight: 1.5 }}>
                Sajian beku higienis siap masak kapan saja: sambosa isi daging sapi rempah, sambosa cokelat lumer, pastel rogout, dan roti cane berserat.
              </p>
            </div>
            <div style={{ marginTop: "1.2rem" }}>
              <Link href="/albafroz" style={{ color: "#b30400", fontWeight: 700, fontSize: "0.92rem" }}>
                Jelajahi Menu Albafroz Frozen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Populer */}
      <section className="wrap" aria-label="Kategori">
        <div className="tiles">
          {tiles.map((t, i) => (
            <Reveal key={t.id} delay={i * 50}>
              <Link className="tile" href={`/produk?kategori=${t.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(t.image, 280)} alt="" loading="lazy" width={140} height={140} />
                <span>{t.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="wrap section">
        <div className="head">
          <div>
            <h2>Produk Pilihan Unggulan</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Produksi segar setiap hari dari Sawangan, Depok.</p>
          </div>
          <Link href="/produk" style={{ color: "var(--red)", fontWeight: 600 }}>Lihat semua →</Link>
        </div>
        <div className="grid">
          {products
            .filter((p) => p.featured)
            .map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
        </div>
      </section>

      {/* Keunggulan Alba Food Market */}
      <section className="wrap section">
        <div className="head">
          <div>
            <h2>Keunggulan Alba Food Market</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Standar mutu tinggi untuk menjamin kepuasan meja makan Anda.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🏭</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>Produsen Tangan Pertama</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Produksi langsung dari workshop kami di Sawangan Depok. Kualitas adonan selalu fresh dan harga lebih bersahabat.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>❄️</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>Cold-Chain Presisi -18°C</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Dibekukan cepat sesaat setelah dibuat, mengunci kesegaran alami, tekstur renyah, dan kebersihan tanpa pengawet berbahaya.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>✨</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>Lentur &amp; Renyah Maksimal</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Kulit sambosa elastis mudah dilipat tanpa retak. Saat digoreng mekar garing keemasan dengan tekstur kriuk menggugah selera.
            </p>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.4rem" }}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>📦</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>Kirim Cepat Instan / Sameday</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.5 }}>
              Melayani pengiriman instan/sameday se-Depok &amp; Jabodetabek, serta Paxel Frozen untuk menjaga suhu dingin selama perjalanan.
            </p>
          </div>
        </div>
      </section>

      {/* Reseller Banner Teaser */}
      <section className="wrap section">
        <div
          style={{
            background: "linear-gradient(135deg, #006d30 0%, #037434 100%)",
            color: "#fff",
            borderRadius: "24px",
            padding: "2.2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ background: "#97f8a7", color: "#00210a", padding: "3px 10px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase" }}>
              PELUANG USAHA RUMAHAN
            </span>
            <h2 style={{ fontSize: "1.8rem", color: "#fff", margin: "0.6rem 0 0.8rem" }}>
              Gabung Jadi Reseller Resmi Alba Food Market &amp; Albafroz
            </h2>
            <p style={{ fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, marginBottom: "1.2rem" }}>
              Dapatkan harga grosir tangan pertama dengan margin tebal hingga 35%. MOQ ramah pemula mulai 10 pack, gratis materi promosi dan packing aman.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link className="btn" href="/reseller" style={{ background: "#fff", color: "#006d30", fontWeight: 700 }}>
                Pelajari Skema Grosir →
              </Link>
              <a className="btn" href={waLink("Halo Admin, saya mau daftar jadi Reseller Alba Food Market.")} target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
                Chat CS Reseller
              </a>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "18px", padding: "1.5rem", backdropFilter: "blur(8px)" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.8rem", color: "#fff" }}>Keuntungan Mitra Reseller:</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
              <li>✓ Modal mulai 10 pack (bebas campur produk)</li>
              <li>✓ Margin keuntungan tebal hingga Rp 7.000 per pack</li>
              <li>✓ Foto &amp; video katalog siap posting harian</li>
              <li>✓ Free Styrofoam Box &amp; Ice Gel min. 50 pack</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimoni Pelanggan */}
      <section className="wrap section">
        <div className="head">
          <div>
            <h2>Kata Mereka Tentang Kami</h2>
            <p style={{ color: "var(--muted)", marginTop: "4px" }}>Pengalaman jujur pelanggan keluarga dan mitra kuliner kami.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {testimonials.map((t, idx) => (
            <div key={idx} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ color: "#d90700", marginBottom: "0.5rem" }}>★★★★★</div>
              <p style={{ fontSize: "0.9rem", color: "var(--ink)", lineHeight: 1.6, fontStyle: "italic", marginBottom: "1rem" }}>
                “{t.quote}”
              </p>
              <div>
                <strong style={{ display: "block", fontSize: "0.95rem" }}>{t.author}</strong>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lokasi, Jam Buka, Layanan */}
      <section className="wrap" style={{ paddingBottom: "3rem" }}>
        <Reveal className="info">
          <div>
            <h3>Jam buka</h3>
            <p>{contact.hours.label}</p>
            <p className="muted">{contact.hours.closedNote}</p>
          </div>
          <div>
            <h3>Alamat Workshop</h3>
            <p>{contact.addressShort}</p>
            <p>
              <Link href="/lokasi" style={{ color: "var(--red)", fontWeight: 600 }}>Peta &amp; rute rute →</Link>
            </p>
          </div>
          <div>
            <h3>Layanan Pengiriman</h3>
            <ul className="pills">
              {contact.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Metode Pembayaran</h3>
            <ul className="pills">
              {contact.payments.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="cta">
          <h2>Pesan Cepat via WhatsApp</h2>
          <p style={{ color: "var(--muted)", maxWidth: "500px", margin: "0 auto 1.2rem" }}>
            Konsultasikan pesanan Anda, tanya stok, atau atur pengiriman instan langsung dengan admin toko kami.
          </p>
          <a className="btn btn-red" href={waLink("Halo Alba Food Market, saya mau pesan.")}>
            Hubungi {contact.phoneIntl}
          </a>
        </Reveal>
      </section>
    </>
  );
}
