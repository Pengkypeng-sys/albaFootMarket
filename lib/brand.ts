/**
 * Data usaha Alba Food Market. Sumber: data yang diberikan pemilik.
 * Ubah di sini — semua komponen membaca dari file ini.
 */

export const contact = {
  name: "Alba Food Market",
  tagline: "Your Everyday Food Supplies. Fresh, Frozen & Healthy Food.",
  /** Format wa.me (tanpa +). */
  whatsapp: "6289622148082",
  phone: "0896-2214-8082",
  phoneIntl: "+62 896-2214-8082",
  instagram: "https://www.instagram.com/albafoodmarket",
  instagramHandle: "@albafoodmarket",
  website: "https://www.albafroz.com/",
  address:
    "Perumahan Koperasi BUGN, Jalan Pasir Kaliki 4 Blok B4 No. 70 & 72, Kelurahan Pasir Putih, Kecamatan Sawangan, Kota Depok, Jawa Barat 16519",
  addressShort: "Pasir Kaliki 4 Blok B4 No. 70 & 72, Sawangan, Depok",
  mapsQuery:
    "Perumahan Koperasi BUGN, Jalan Pasir Kaliki 4 Blok B4 No. 70 & 72, Pasir Putih, Sawangan, Depok 16519",
  hours: {
    /** 1 = Senin … 6 = Sabtu. Minggu (0) tutup / hanya chat WA. */
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 8,
    closeHour: 20,
    label: "Senin–Sabtu · 08.00–20.00 WIB",
    closedNote: "Minggu buka via chat WhatsApp",
  },
  rating: { score: "5.0", count: 7, source: "Google Maps" },
  services: ["Belanja di tempat", "Pesan antar (Instant/Sameday)", "Pengiriman Paxel Frozen", "Pre-order"],
  payments: ["Transfer Bank", "QRIS", "Tunai", "Debit"],
} as const;

export const partners = [
  { handle: "@halastudios", url: "https://www.instagram.com/halastudios" },
  { handle: "@hayhoney.co", url: "https://www.instagram.com/hayhoney.co" },
] as const;

export function waLink(text: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export interface OpenStatus {
  open: boolean;
  text: string;
}

/** Status buka/tutup dihitung dalam WIB (Asia/Jakarta), apa pun zona waktu pengunjung. */
export function openStatus(now: Date = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    parts.find((p) => p.type === "weekday")!.value,
  );
  const hour = Number(parts.find((p) => p.type === "hour")!.value) % 24;
  const { openDays, openHour, closeHour } = contact.hours;
  const isOpenDay = (openDays as readonly number[]).includes(wd);

  if (isOpenDay && hour >= openHour && hour < closeHour) {
    return { open: true, text: `Buka · tutup ${String(closeHour).padStart(2, "0")}.00` };
  }
  const openAt = `${String(openHour).padStart(2, "0")}.00`;
  if (isOpenDay && hour < openHour) return { open: false, text: `Tutup · buka ${openAt}` };
  let next = (wd + 1) % 7;
  while (!(openDays as readonly number[]).includes(next)) next = (next + 1) % 7;
  const label = next === (wd + 1) % 7 ? "besok" : dayNames[next];
  return { open: false, text: `Tutup · buka ${label} ${openAt}` };
}
