"use client";

import { formatRp } from "@/data/products";
import { contact } from "@/lib/brand";
import type { Sale } from "@/lib/sales";

const fmtDate = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });
export const formatWaktu = (iso: string) => `${fmtDate.format(new Date(iso))} WIB`;

/** Teks kuitansi untuk dikirim lewat WhatsApp. */
export function receiptText(s: Sale): string {
  const rows = s.items.map((i) => `${i.name}${i.pack ? ` (${i.pack})` : ""}\n  ${i.qty} x ${formatRp(i.price)} = ${formatRp(i.qty * i.price)}`);
  return [
    `*Kuitansi ${contact.name}*`,
    `No: ${s.id}`,
    formatWaktu(s.at),
    s.buyer ? `Pembeli: ${s.buyer}` : "",
    "",
    ...rows,
    "",
    `*Total: ${formatRp(s.total)}*`,
    `Bayar: ${s.pay}`,
    s.note ? `Catatan: ${s.note}` : "",
    "",
    "Terima kasih sudah berbelanja.",
  ]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "")
    .join("\n");
}

/** Lembar kuitansi + tombol; hanya .receipt yang ikut tercetak. */
export function Receipt({ sale, onClose }: { sale: Sale; onClose: () => void }) {
  return (
    <div className="rc-bg" onClick={onClose} role="presentation">
      <div className="rc-wrap" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`Kuitansi ${sale.id}`}>
        <article className="receipt">
          <header>
            <h2>{contact.name}</h2>
            <p>{contact.addressShort}</p>
            <p>WA {contact.phoneIntl}</p>
          </header>
          <dl className="rc-meta">
            <div><dt>No</dt><dd>{sale.id}</dd></div>
            <div><dt>Waktu</dt><dd>{formatWaktu(sale.at)}</dd></div>
            {sale.buyer ? <div><dt>Pembeli</dt><dd>{sale.buyer}</dd></div> : null}
          </dl>
          <ul className="rc-items">
            {sale.items.map((i) => (
              <li key={i.slug}>
                <span>
                  {i.name}
                  {i.pack ? <small> {i.pack}</small> : null}
                </span>
                <span>{i.qty} × {formatRp(i.price)}</span>
                <b>{formatRp(i.qty * i.price)}</b>
              </li>
            ))}
          </ul>
          <p className="rc-total"><span>Total</span><b>{formatRp(sale.total)}</b></p>
          <p className="rc-pay">Bayar: {sale.pay}</p>
          {sale.note ? <p className="rc-pay">Catatan: {sale.note}</p> : null}
          <p className="rc-thanks">Terima kasih sudah berbelanja</p>
        </article>
        <div className="rc-actions">
          <button className="btn btn-red" type="button" onClick={() => window.print()}>
            Cetak / PDF
          </button>
          <a className="btn" href={`https://wa.me/?text=${encodeURIComponent(receiptText(sale))}`} target="_blank" rel="noreferrer">
            Kirim WhatsApp
          </a>
          <button className="btn" type="button" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
