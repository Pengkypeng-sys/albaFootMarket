/**
 * Katalog produk — tanpa database.
 * Tambah produk: salin satu objek, ganti slug (unik), simpan.
 * `price` kosong = tampil ringkasan + "tanya via WhatsApp". Harga saat ini hanya untuk tes.
 * `keywords` dipakai pencarian; tulis kata yang akan diketik pelanggan.
 */

export type CategoryId = "kulit" | "sambosa" | "canai" | "camilan" | "kurma" | "bumbu" | "madu" | "po";
export type BrandName = "Alba Food Market" | "Albafroz" | "Hey Honey";

export type Shot = { src: string; alt: string };

export type Product = {
  slug: string;
  name: string;
  brand: BrandName;
  category: CategoryId;
  summary: string;
  keywords: string;
  packSize?: string;
  /** Harga eceran dalam rupiah. TODO: konfirmasi harga resmi pemilik. */
  price?: number;
  /** Harga grosir/reseller dalam rupiah */
  wholesalePrice?: number;
  /** Minimal pembelian untuk harga grosir */
  wholesaleMin?: number;
  /** Pre-order (musiman Ramadan). */
  preorder?: boolean;
  featured: boolean;
  /** Foto sementara (stok). TODO: ganti dengan foto asli di /public/products. */
  image: string;
  imageAlt: string;
  /** Foto tambahan untuk halaman detail; foto utama selalu pertama. */
  more?: Shot[];
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: { id: CategoryId | "semua"; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "kulit", label: "Kulit sambosa" },
  { id: "sambosa", label: "Sambosa & Pastel" },
  { id: "canai", label: "Roti cane" },
  { id: "camilan", label: "Camilan" },
  { id: "madu", label: "Madu" },
  { id: "kurma", label: "Kurma" },
  { id: "bumbu", label: "Bumbu masak" },
  { id: "po", label: "Pre-order" },
];

export const products: Product[] = [
  {
    slug: "kulit-sambosa",
    name: "Kulit Sambosa Premium",
    brand: "Alba Food Market",
    category: "kulit",
    summary: "Produksi tangan pertama. Lentur, renyah maksimal, tidak mudah robek saat digulung.",
    packSize: "Isi 50 Lembar (±500gr)",
    price: 25000,
    wholesalePrice: 19500,
    wholesaleMin: 10,
    keywords: "kulit sambosa samosa pastry lembaran premium produsen adonan bahan baku",
    featured: true,
    image: u("photo-1590385014317-6a78bc23b090"),
    imageAlt: "Adonan kulit sambosa tipis lembaran berkualitas",
    more: [{ src: u("photo-1582901509343-c217fbb3081c"), alt: "Adonan kulit sambosa siap gulung" }],
  },
  {
    slug: "sambosa-daging",
    name: "Sambosa Daging Sapi Spesial",
    brand: "Albafroz",
    category: "sambosa",
    summary: "Daging cincang sapi melimpah dengan racikan rempah khas gurih harum, kulit renyah berlapis.",
    packSize: "Isi 10 Pcs",
    price: 35000,
    wholesalePrice: 28000,
    wholesaleMin: 10,
    keywords: "sambosa daging sapi samosa beef rempah gurih savory beku frozen albafroz",
    featured: true,
    image: u("photo-1772729996007-40bad08b3c40"),
    imageAlt: "Sambosa segitiga emas goreng renyah isi daging",
    more: [{ src: u("photo-1767469576715-a4eb8bcfa204"), alt: "Sambosa gurih keemasan" }],
  },
  {
    slug: "sambosa-cokelat",
    name: "Sambosa Cokelat Keju Lumer",
    brand: "Albafroz",
    category: "sambosa",
    summary: "Varian manis favorit anak & keluarga. Isian cokelat premium lumer berpadu gurihnya keju.",
    packSize: "Isi 10 Pcs",
    price: 28000,
    wholesalePrice: 22000,
    wholesaleMin: 10,
    keywords: "sambosa cokelat keju chocolate manis samosa frozen beku albafroz lumer dessert",
    featured: true,
    image: u("photo-1718897266472-5b7229ebdd3d"),
    imageAlt: "Pastry sambosa manis lelehan cokelat",
    more: [{ src: u("photo-1767469576715-a4eb8bcfa204"), alt: "Sambosa goreng keemasan" }],
  },
  {
    slug: "pastel-daging",
    name: "Pastel Daging Rogout Gurih",
    brand: "Albafroz",
    category: "sambosa",
    summary: "Pastel frozen dengan isian rogout daging sapi cincang, wortel lembut, dan bumbu rempah spesial.",
    packSize: "Isi 10 Pcs",
    price: 32000,
    wholesalePrice: 26000,
    wholesaleMin: 10,
    keywords: "pastel daging rogout frozen pastel beku albafroz goreng gurih cemilan",
    featured: true,
    image: u("photo-1767469576715-a4eb8bcfa204"),
    imageAlt: "Pastel daging goreng garing keemasan",
  },
  {
    slug: "roti-cane-beku",
    name: "Roti Cane / Canai Original",
    brand: "Albafroz",
    category: "canai",
    summary: "Roti cane khas Timur Tengah bertekstur berserat, empuk di dalam dan renyah lembut di luar.",
    packSize: "Isi 5 Pcs (Diameter ±16cm)",
    price: 25000,
    wholesalePrice: 19500,
    wholesaleMin: 10,
    keywords: "roti cane canai prata paratha beku frozen original albafroz sarapan",
    featured: true,
    image: u("photo-1704742205127-56131b97e344"),
    imageAlt: "Roti cane canai beku siap dipanggang",
    more: [{ src: u("photo-1754394483922-4d3a10cc6187"), alt: "Roti cane dimasak di teflon panas" }],
  },
  {
    slug: "roti-cane-cokelat",
    name: "Roti Cane Cokelat Meses",
    brand: "Albafroz",
    category: "canai",
    summary: "Roti canai dengan filling cokelat manis lezat di antara lapisan serat adonan.",
    packSize: "Isi 5 Pcs",
    price: 28000,
    wholesalePrice: 22000,
    wholesaleMin: 10,
    keywords: "roti cane cokelat manis canai frozen albafroz",
    featured: false,
    image: u("photo-1754394483922-4d3a10cc6187"),
    imageAlt: "Roti canai cokelat panggang harum",
  },
  {
    slug: "madu-hey-honey",
    name: "Madu Murni Hey Honey Multiflora",
    brand: "Hey Honey",
    category: "madu",
    summary: "Madu murni alami tanpa pemanis buatan dari brand saudara Hey Honey. Segar dan kaya enzim alami.",
    packSize: "Jar Kaca 350gr",
    price: 65000,
    wholesalePrice: 52000,
    wholesaleMin: 6,
    keywords: "madu hey honey murni raw honey natural alami depok herbal manis",
    featured: true,
    image: u("photo-1587049352846-4a222e784d38"),
    imageAlt: "Madu murni alami dalam toples kaca",
  },
  {
    slug: "aneka-camilan",
    name: "Aneka Camilan & Keripik Khas",
    brand: "Alba Food Market",
    category: "camilan",
    summary: "Pilihan camilan gurih renyah teman santai dan pelengkap meja keluarga.",
    packSize: "Pack 250gr",
    price: 15000,
    wholesalePrice: 12000,
    wholesaleMin: 10,
    keywords: "camilan snack cemilan kue kering oleh-oleh gorengan",
    featured: false,
    image: u("photo-1773450970933-1e03603d8fba"),
    imageAlt: "Kotak kemasan aneka camilan renyah",
  },
  {
    slug: "kurma",
    name: "Kurma Sukari Al-Qassim",
    brand: "Alba Food Market",
    category: "kurma",
    summary: "Kurma Sukari basah kualitas super dari Al-Qassim. Lembut, manis alami karamel meleleh di lidah.",
    packSize: "Ember / Box 500gr",
    price: 45000,
    wholesalePrice: 38000,
    wholesaleMin: 5,
    keywords: "kurma sukari dates buah ramadan berbuka takjil sahur manis alqassim",
    featured: true,
    image: u("photo-1710228010206-934856204165"),
    imageAlt: "Kurma sukari berkualitas tinggi",
    more: [{ src: u("photo-1771231591559-d19c89ad118a"), alt: "Tumpukan kurma segar" }],
  },
  {
    slug: "bumbu-masak",
    name: "Aneka Bumbu Rempah Masak",
    brand: "Alba Food Market",
    category: "bumbu",
    summary: "Racikan bumbu rempah dapur pilihan untuk kari, kebuli, dan olahan daging autentik.",
    packSize: "Pouch 100gr",
    price: 15000,
    wholesalePrice: 11000,
    wholesaleMin: 10,
    keywords: "bumbu masak rempah dapur kari spices kebuli briyani",
    featured: false,
    image: u("photo-1650559347569-09a6bbed5f28"),
    imageAlt: "Deretan rempah alami bumbu masak",
    more: [{ src: u("photo-1707129767056-c4edd11bf87c"), alt: "Rempah dan herba di meja kayu" }],
  },
  {
    slug: "po-ramadan",
    name: "Pre-order Hampers & Sajian Ramadan",
    brand: "Alba Food Market",
    category: "po",
    summary: "Paket lengkap takjil, sambosa siap goreng, roti cane, kurma sukari & madu murni untuk iftar keluarga tercinta.",
    packSize: "Paket Box Eksklusif",
    keywords: "po pre order preorder ramadan puasa iftar berbuka takjil sajian keluarga hampers",
    preorder: true,
    featured: true,
    image: u("photo-1772729996007-40bad08b3c40"),
    imageAlt: "Paket hidangan berbuka puasa Ramadan",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function shotsOf(p: Product): Shot[] {
  return [{ src: p.image, alt: p.imageAlt }, ...(p.more ?? [])];
}

/** Unsplash: ganti lebar gambar (foto asli nanti: samakan dengan loader/CDN). */
export const thumb = (src: string, w: number) => src.replace("w=1200", `w=${w}`);

/** Cocokkan semua kata ketikan dengan nama, ringkasan, atau keywords. */
export function searchProducts(q: string, list: Product[] = products) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return list;
  return list.filter((p) => {
    const hay = `${p.name} ${p.summary} ${p.keywords}`.toLowerCase();
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
