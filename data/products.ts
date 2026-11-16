/**
 * Katalog produk — tanpa database. Sumber harga: daftar harga Albafroz dari pemilik.
 * Tambah produk: salin satu objek, ganti slug (unik), simpan.
 * `price` kosong = tampil "tanya via WhatsApp".
 * `keywords` dipakai pencarian; tulis kata yang akan diketik pelanggan.
 */

export type CategoryId =
  | "kulit"
  | "sambosa"
  | "kebab"
  | "canai"
  | "onde"
  | "minuman"
  | "camilan"
  | "kurma"
  | "bumbu"
  | "po";

export type Shot = { src: string; alt: string };

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  /** Isi/ukuran per kemasan, mis. "Isi 10". */
  pack?: string;
  packSize?: string;
  brand?: string;
  wholesalePrice?: number;
  wholesaleMin?: number;
  summary: string;
  keywords: string;
  /** Harga per kemasan dalam rupiah. */
  price?: number;
  /** Pre-order (musiman Ramadan). */
  preorder?: boolean;
  /** Tampil di beranda dan kulkas (satu per kategori). */
  featured?: boolean;
  image: string;
  imageAlt: string;
  /** Foto tambahan untuk halaman detail; foto utama selalu pertama. */
  more?: Shot[];
};

// Foto: Wikimedia Commons, lisensi di public/products/ATRIBUSI.md.
// TODO: foto kemasan asli per varian (sekarang satu foto per keluarga produk)
const kulitImg = "/products/kulit-sambosa.jpg";
const sambosaImg = "/products/sambosa-frozen.jpg";
const kebabImg = "/products/kebab.jpg";
const ondeImg = "/products/onde-onde.jpg";
const canaiImg = "/products/roti-canai.jpg";
const camilanImg = "/products/camilan.jpg";
const kurmaImg = "/products/kurma.jpg";
const bumbuImg = "/products/bumbu-masak.jpg";
// TODO: foto minuman asli
const minumanImg = "/products/minuman.svg";

export const categories: { id: CategoryId | "semua"; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "kulit", label: "Kulit sambosa" },
  { id: "sambosa", label: "Sambosa" },
  { id: "kebab", label: "Kebab" },
  { id: "canai", label: "Roti canai" },
  { id: "onde", label: "Onde-onde" },
  { id: "minuman", label: "Minuman" },
  { id: "camilan", label: "Camilan" },
  { id: "kurma", label: "Kurma" },
  { id: "bumbu", label: "Bumbu masak" },
  { id: "po", label: "Pre-order" },
];

export const products: Product[] = [
  {
    slug: "kulit-sambosa-large",
    name: "Kulit Sambosa Large",
    category: "kulit",
    pack: "Isi 50",
    summary: "Ukuran large.",
    price: 45000,
    keywords: "kulit sambosa samosa pastry lembaran large besar",
    featured: true,
    image: kulitImg,
    imageAlt: "Kemasan kulit sambosa",
  },
  {
    slug: "kulit-sambosa-medium",
    name: "Kulit Sambosa Medium",
    category: "kulit",
    pack: "Isi 50",
    summary: "Ukuran medium.",
    price: 37500,
    keywords: "kulit sambosa samosa pastry lembaran medium sedang",
    image: kulitImg,
    imageAlt: "Kemasan kulit sambosa",
  },
  {
    slug: "kulit-sambosa-small",
    name: "Kulit Sambosa Small",
    category: "kulit",
    pack: "Isi 50 (2 pack @ 25 lembar)",
    summary: "Ukuran small.",
    price: 35000,
    keywords: "kulit sambosa samosa pastry lembaran small kecil",
    image: kulitImg,
    imageAlt: "Kemasan kulit sambosa",
  },
  {
    slug: "sambosa-daging",
    name: "Sambosa Daging",
    category: "sambosa",
    pack: "Isi 10",
    summary: "Sambosa frozen isi daging.",
    price: 40000,
    keywords: "sambosa samosa daging sapi beef frozen beku",
    featured: true,
    image: sambosaImg,
    imageAlt: "Sambosa frozen dalam kemasan",
  },
  {
    slug: "sambosa-daging-asap",
    name: "Sambosa Daging Asap",
    category: "sambosa",
    pack: "Isi 10",
    summary: "Sambosa frozen isi daging asap.",
    price: 30000,
    keywords: "sambosa samosa daging asap smoked beef frozen beku",
    image: sambosaImg,
    imageAlt: "Sambosa frozen dalam kemasan",
  },
  {
    slug: "sambosa-ayam",
    name: "Sambosa Ayam",
    category: "sambosa",
    pack: "Isi 10",
    summary: "Sambosa frozen isi ayam.",
    price: 40000,
    keywords: "sambosa samosa ayam chicken frozen beku",
    image: sambosaImg,
    imageAlt: "Sambosa frozen dalam kemasan",
  },
  {
    slug: "sambosa-sayur",
    name: "Sambosa Sayur",
    category: "sambosa",
    pack: "Isi 10",
    summary: "Sambosa frozen isi sayur.",
    price: 27500,
    keywords: "sambosa samosa sayur sayuran vegetarian frozen beku",
    image: sambosaImg,
    imageAlt: "Sambosa frozen dalam kemasan",
  },
  {
    slug: "sambosa-coklat",
    name: "Sambosa Coklat",
    category: "sambosa",
    pack: "Isi 10",
    summary: "Sambosa frozen isi coklat.",
    price: 30000,
    keywords: "sambosa samosa coklat cokelat chocolate manis frozen beku",
    image: sambosaImg,
    imageAlt: "Sambosa frozen dalam kemasan",
  },
  {
    slug: "sambosa-mozarella",
    name: "Sambosa Mozarella",
    category: "sambosa",
    pack: "Isi 10",
    summary: "Sambosa frozen isi mozarella.",
    price: 30000,
    keywords: "sambosa samosa mozarella mozzarella keju cheese frozen beku",
    image: sambosaImg,
    imageAlt: "Sambosa frozen dalam kemasan",
  },
  {
    slug: "kebab-daging",
    name: "Kebab Daging",
    category: "kebab",
    pack: "Isi 6",
    summary: "Kebab frozen isi daging.",
    price: 40000,
    keywords: "kebab daging sapi beef frozen beku",
    featured: true,
    image: kebabImg,
    imageAlt: "Kebab frozen dalam kemasan",
  },
  {
    slug: "kebab-daging-mozarella",
    name: "Kebab Daging Mozarella",
    category: "kebab",
    pack: "Isi 6",
    summary: "Kebab frozen isi daging dan mozarella.",
    price: 45000,
    keywords: "kebab daging mozarella mozzarella keju cheese frozen beku",
    image: kebabImg,
    imageAlt: "Kebab frozen dalam kemasan",
  },
  {
    slug: "roti-canai-original",
    name: "Roti Canai Original",
    category: "canai",
    pack: "Isi 5",
    summary: "Roti canai beku. Tinggal panaskan.",
    price: 30000,
    keywords: "roti canai cane prata paratha original beku frozen sarapan",
    featured: true,
    image: canaiImg,
    imageAlt: "Roti canai",
  },
  {
    slug: "roti-canai-susu",
    name: "Roti Canai Susu",
    category: "canai",
    pack: "Isi 5",
    summary: "Roti canai beku rasa susu.",
    price: 32500,
    keywords: "roti canai cane prata paratha susu milk beku frozen",
    image: canaiImg,
    imageAlt: "Roti canai",
  },
  {
    slug: "onde-onde",
    name: "Onde-onde Frozen",
    category: "onde",
    pack: "Isi 10",
    summary: "Isi kacang hijau.",
    price: 25000,
    keywords: "onde onde ondeh kacang hijau ijo wijen frozen beku",
    featured: true,
    image: ondeImg,
    imageAlt: "Onde-onde frozen dalam kemasan",
  },
  {
    slug: "teh-rempah-adheni",
    name: "Teh Rempah Adheni Tea",
    category: "minuman",
    pack: "200 ml",
    summary: "Teh rempah.",
    price: 15000,
    keywords: "teh rempah adheni tea minuman botol",
    image: minumanImg,
    imageAlt: "Minuman botol",
  },
  {
    slug: "susu-kurma",
    name: "Susu Kurma",
    category: "minuman",
    pack: "200 ml",
    summary: "Susu rasa kurma.",
    price: 15000,
    keywords: "susu kurma milk dates minuman botol",
    image: minumanImg,
    imageAlt: "Minuman botol",
  },
  {
    slug: "kopi-susu-aren",
    name: "Kopi Susu Aren",
    category: "minuman",
    pack: "200 ml",
    summary: "Kopi susu gula aren.",
    price: 15000,
    keywords: "kopi susu aren gula coffee minuman botol",
    image: minumanImg,
    imageAlt: "Minuman botol",
  },
  {
    slug: "banana-choco-milk",
    name: "Banana Choco Milk",
    category: "minuman",
    pack: "200 ml",
    summary: "Susu pisang coklat.",
    price: 15000,
    keywords: "banana choco milk pisang coklat cokelat susu minuman botol",
    image: minumanImg,
    imageAlt: "Minuman botol",
  },
  {
    slug: "aneka-camilan",
    name: "Aneka Camilan",
    category: "camilan",
    summary: "Camilan gurih untuk teman santai.",
    keywords: "camilan snack cemilan keripik oleh-oleh",
    featured: true,
    image: camilanImg,
    imageAlt: "Aneka camilan",
  },
  {
    slug: "kurma",
    name: "Kurma",
    category: "kurma",
    summary: "Kurma manis alami. Cocok untuk berbuka.",
    keywords: "kurma dates buah ramadan berbuka takjil sahur manis",
    featured: true,
    image: kurmaImg,
    imageAlt: "Kurma",
  },
  {
    slug: "bumbu-masak",
    name: "Aneka Bumbu Masak",
    category: "bumbu",
    summary: "Bumbu dan rempah untuk masakan harian.",
    keywords: "bumbu masak rempah dapur kari spices",
    featured: true,
    image: bumbuImg,
    imageAlt: "Aneka bumbu masak",
  },
  {
    slug: "po-ramadan",
    name: "Pre-order Ramadan",
    category: "po",
    summary: "Pesan lebih awal untuk Ramadan.",
    keywords: "po pre order preorder ramadan puasa iftar berbuka takjil",
    preorder: true,
    image: kurmaImg,
    imageAlt: "Kurma untuk Ramadan",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function shotsOf(p: Product): Shot[] {
  return [{ src: p.image, alt: p.imageAlt }, ...(p.more ?? [])];
}

/** Ganti lebar gambar Unsplash. Foto lokal (/products/…) dikembalikan apa adanya. */
export const thumb = (src: string, w: number) => src.replace("w=1200", `w=${w}`);

/** Cocokkan semua kata ketikan dengan nama, ringkasan, atau keywords. */
export function searchProducts(q: string, list: Product[] = products) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return list;
  return list.filter((p) => {
    const hay = `${p.name} ${p.pack ?? ""} ${p.summary} ${p.keywords}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export function formatRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export const featured = products.filter((p) => p.featured);
