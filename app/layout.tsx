import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { Shell } from "@/components/Shell";
import { contact } from "@/lib/brand";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://albafootmarket.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alba Food Market | Kulit Sambosa, Roti Cane, Kurma di Sawangan Depok",
    template: "%s | Alba Food Market",
  },
  description:
    "Kulit sambosa, sambosa cokelat, roti cane beku, camilan, kurma, dan bumbu masak di Sawangan, Depok. Senin–Sabtu 09.00–17.00 WIB.",
  openGraph: {
    title: "Alba Food Market",
    description: "Fresh, Frozen & Healthy food. Sawangan, Depok.",
    locale: "id_ID",
    type: "website",
  },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: contact.name,
  telephone: contact.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Perumahan Koperasi BUGN, Jl. Pasir Kaliki 4 Blok B4 No.70 & 72, Pasir Putih",
    addressLocality: "Depok",
    addressRegion: "Jawa Barat",
    postalCode: "16519",
    addressCountry: "ID",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "17:00",
  },
  paymentAccepted: "Cash, Debit card, NFC mobile payment",
  sameAs: [contact.instagram, contact.website],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={font.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Shell>{children}</Shell>
        </CartProvider>
      </body>
    </html>
  );
}
