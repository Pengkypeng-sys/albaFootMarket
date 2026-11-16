/**
 * Data usaha Alba Food Market. Sumber: data yang diberikan pemilik.
 * Ubah di sini — semua komponen membaca dari file ini.
 */

export const contact = {
  name: "Alba Food Market",
  tagline: "Your Everyday Food Supplies. Fresh, Frozen & Healthy Food.",
  /** Format wa.me (tanpa +). */
  whatsapp: "628170055121",
  phone: "0817-0055-121",
  phoneIntl: "+62 817-0055-121",
  instagram: "https://www.instagram.com/albafoodmarket",
  instagramHandle: "@albafoodmarket",
  website: "https://www.albafroz.com/",
  address:
    "Perumahan Koperasi BUGN, Jl. Pasir Kaliki 4 Blok B4 No.70 & 72, Pasir Putih, Sawangan, Depok 16519",
  addressShort: "Pasir Kaliki 4 Blok B4 No.70 & 72, Sawangan, Depok",
  mapsQuery:
    "Perumahan Koperasi BUGN, Jl. Pasir Kaliki 4 Blok B4 No.70 & 72, Pasir Putih, Sawangan, Depok 16519",
  hours: {
    /** 1 = Senin … 6 = Sabtu. Minggu tutup. */
    openDays: [1, 2, 3, 4, 5, 6],
    openHour: 9,
    closeHour: 17,
    label: "Senin–Sabtu · 09.00–17.00 WIB",
    closedNote: "Minggu tutup",
  },
  services: ["Belanja di toko", "Antar", "Pre-order"],
  payments: ["Tunai", "Kartu debit", "NFC"],
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
