"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { contact, partners, waLink } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { SearchBox } from "./SearchBox";

const links = [
  { href: "/produk", label: "Produk" },
  { href: "/lokasi", label: "Lokasi" },
];

const icons = {
  home: "M4 11l8-7 8 7v9h-5v-6H9v6H4z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  pin: "M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11zM12 12.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z",
  bag: "M6 8h12l-1 12H7L6 8ZM9 8V7a3 3 0 0 1 6 0v1",
  chat: "M4 5h16v11H9l-5 4V5Z",
};

const tabs = [
  { href: "/produk", label: "Produk", d: icons.grid },
  { href: "/lokasi", label: "Lokasi", d: icons.pin },
];

/** Satu gaya ikon: garis 1.8, ujung bulat, ukuran seragam. */
function Icon({ d, size = 22 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { count } = useCart();
  const [cart, setCart] = useState(false);
  const wa = waLink("Halo Alba Food Market, saya mau pesan.");

  return (
    <>
      <header className="nav">
        <div className="wrap nav-row" data-search={path !== "/"}>
          <Link href="/" className="logo" aria-label="Alba Food Market, beranda">
            <b>Alba</b>
            <span> Food Market</span>
          </Link>
          {path === "/" ? (
            <span className="nav-gap" />
          ) : (
            <div className="nav-search">
              <SearchBox />
            </div>
          )}
          <nav className="nav-links" aria-label="Utama">
            {links.map((l) => (
              <Link key={l.href} href={l.href} data-active={path.startsWith(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <button className="bag" type="button" aria-label="Keranjang" onClick={() => setCart(true)}>
            <Icon d={icons.bag} size={20} />
            {count > 0 ? <i>{count}</i> : null}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site">
        <div className="wrap foot">
          <div>
            <h3>{contact.name}</h3>
            <p>{contact.addressShort}</p>
            <p>{contact.hours.label}</p>
          </div>
          <div>
            <h3>Menu</h3>
            <ul>
              <li><Link href="/produk">Produk</Link></li>
              <li><Link href="/lokasi">Lokasi</Link></li>
              <li><Link href="/keranjang">Keranjang</Link></li>
            </ul>
          </div>
          <div>
            <h3>Hubungi</h3>
            <ul>
              <li><a href={wa}>{contact.phoneIntl}</a></li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noreferrer">{contact.instagramHandle}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap legal">
          © {new Date().getFullYear()} {contact.name}
          {partners.map((p) => (
            <span key={p.handle}>
              {" · "}
              <a href={p.url} target="_blank" rel="noreferrer">{p.handle}</a>
            </span>
          ))}
        </div>
      </footer>

      <a className="wa-float" href={wa} aria-label="Pesan via WhatsApp">
        <Icon d={icons.chat} size={22} />
        <span>Pesan WhatsApp</span>
      </a>

      <nav className="tabbar" aria-label="Menu cepat">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} data-active={path.startsWith(t.href)}>
            <Icon d={t.d} />
            {t.label}
          </Link>
        ))}
        <Link className="tab-home" href="/" data-active={path === "/"}>
          <span>
            <Icon d={icons.home} size={26} />
          </span>
          Beranda
        </Link>
        <button type="button" onClick={() => setCart(true)}>
          <Icon d={icons.bag} />
          Keranjang
          {count > 0 ? <i>{count}</i> : null}
        </button>
        <a className="tab-wa" href={wa}>
          <Icon d={icons.chat} />
          WhatsApp
        </a>
      </nav>

      {cart ? <CartDrawer onClose={() => setCart(false)} /> : null}
    </>
  );
}
