import Link from "next/link";
import { Fridge } from "@/components/Fridge";
import { ProductBanner } from "@/components/ProductBanner";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { Rail } from "@/components/Rail";
import { Reveal } from "@/components/Reveal";
import { SearchBox } from "@/components/SearchBox";
import { StatusBadge } from "@/components/StatusBadge";
import { categories, products, thumb } from "@/data/products";
import { contact, waLink } from "@/lib/brand";

const tiles = categories
  .filter((c) => c.id !== "semua")
  .map((c) => ({ ...c, image: products.find((p) => p.category === c.id)!.image }));

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      <section className="wrap hero">
        <div className="hero-left">
          <h1 className="rise" style={rise(0)}>
            Cari apa <span>hari ini?</span>
          </h1>
          <div className="rise hero-search-wrap" style={rise(1)}>
            <SearchBox large />
          </div>
        </div>
        <div className="hero-media rise" style={rise(1)}>
          <Fridge />
        </div>
      </section>

      <section className="wrap" aria-label="Kategori">
        <Rail label="Kategori produk">
          {tiles.map((t, i) => (
            <Reveal key={t.id} delay={i * 50}>
              <Link className="tile" data-cat={t.id} href={`/produk?kategori=${t.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(t.image, 280)} alt="" loading="lazy" width={140} height={140} />
                <span>{t.label}</span>
              </Link>
            </Reveal>
          ))}
        </Rail>
      </section>

      <section className="wrap section">
        <div className="head">
          <h2>Produk</h2>
        </div>
        <FeaturedGrid />
      </section>

      <section className="wrap home-end">
        <Reveal>
          <ProductBanner />
        </Reveal>
        <Reveal className="cta">
          <h2>Pesan via WhatsApp</h2>
          <a className="btn btn-red" href={waLink("Halo Alba Food Market, saya mau pesan.")}>
            {contact.phoneIntl}
          </a>
        </Reveal>
        <Reveal className="info" style={{ marginTop: "2rem" }}>
          <div>
            <div className="info-head">
              <h3>Jam buka</h3>
              <StatusBadge />
            </div>
            <p>{contact.hours.label}</p>
            <p className="muted">{contact.hours.closedNote}</p>
          </div>
          <div>
            <h3>Alamat</h3>
            <p>{contact.addressShort}</p>
            <p>
              <Link href="/lokasi" style={{ color: "var(--red)" }}>
                Peta &amp; rute →
              </Link>
            </p>
          </div>
          <div>
            <h3>Layanan</h3>
            <ul className="pills">
              {contact.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Pembayaran</h3>
            <ul className="pills">
              {contact.payments.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
