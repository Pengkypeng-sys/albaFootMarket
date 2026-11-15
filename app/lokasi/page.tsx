import type { Metadata } from "next";
import { StatusBadge } from "@/components/StatusBadge";
import { contact, waLink } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Lokasi & Jam Buka",
  description: `${contact.addressShort}. ${contact.hours.label}.`,
  alternates: { canonical: "/lokasi" },
};

const q = encodeURIComponent(contact.mapsQuery);
const embed = `https://www.google.com/maps?q=${q}&output=embed`;
const route = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

export default function LokasiPage() {
  return (
    <section className="wrap section">
      <div className="loc">
        <div>
          <h1>Lokasi</h1>
          <p style={{ marginTop: "0.8rem" }}>
            <StatusBadge />
          </p>
          <div className="buy" style={{ marginTop: "1.2rem" }}>
            <a className="btn btn-red" href={route} target="_blank" rel="noopener noreferrer">
              Rute
            </a>
            <a className="btn" href={waLink("Halo Alba Food Market, saya mau tanya.")}>
              WhatsApp
            </a>
            <a className="btn" href={`tel:${contact.phoneIntl.replace(/[^+\d]/g, "")}`}>
              Telepon
            </a>
          </div>
          <div className="loc-list">
            <div>
              <h3>Alamat</h3>
              <p>{contact.address}</p>
            </div>
            <div>
              <h3>Jam buka</h3>
              <p>{contact.hours.label}</p>
              <p className="muted">{contact.hours.closedNote}</p>
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
                {contact.payments.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <iframe className="map" title="Peta Alba Food Market" src={embed} loading="lazy" />
      </div>
    </section>
  );
}
