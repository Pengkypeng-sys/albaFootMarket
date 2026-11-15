"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { contact, partners, waLink } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { SearchBox } from "./SearchBox";

const links = [
  { href: "/produk", label: "Katalog Produk" },
  { href: "/albafroz", label: "Albafroz Frozen", badge: "Baru" },
  { href: "/reseller", label: "Program Reseller", badge: "Grosir" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/lokasi", label: "Lokasi & Toko" },
  { href: "/faq", label: "FAQ & Panduan" },
];

const tabs = [
  { href: "/", label: "Beranda", d: "M4 11l8-7 8 7v9h-5v-6H9v6H4z" },
  { href: "/produk", label: "Produk", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { href: "/albafroz", label: "Albafroz", d: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A8 8 0 0 1 4.07 13H5a1 1 0 0 1 0-2h-.93A8 8 0 0 1 11 4.07V5a1 1 0 0 1 2 0v-.93A8 8 0 0 1 19.93 11H19a1 1 0 0 1 0 2h.93A8 8 0 0 1 13 16.93z" },
  { href: "/reseller", label: "Reseller", d: "M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { count } = useCart();
  const [cart, setCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-row" data-search={path !== "/"}>
          <Link href="/" className="logo" aria-label="Alba Food Market, beranda">
            <b>Alba</b><span> Food Market</span>
          </Link>
          {path === "/" ? <span className="nav-gap" /> : (
            <div className="nav-search">
              <SearchBox />
            </div>
          )}
          <nav className="nav-links" aria-label="Utama">
            {links.map((l) => (
              <Link key={l.href} href={l.href} data-active={path.startsWith(l.href)}>
                {l.label}
                {l.badge ? (
                  <span style={{
                    marginLeft: "4px",
                    fontSize: "0.65rem",
                    padding: "1px 6px",
                    borderRadius: "999px",
                    background: l.badge === "Baru" ? "#e10600" : "#006d30",
                    color: "#fff",
                    verticalAlign: "middle"
                  }}>
                    {l.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
          <button
            className="bag"
            type="button"
            aria-label="Keranjang"
            onClick={() => setCart(true)}
            style={{ position: "relative" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 8V7a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {count > 0 ? <i>{count}</i> : null}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site">
        <div className="wrap foot">
          <div>
            <h3>{contact.name}</h3>
            <p>{contact.tagline}</p>
            <p>{contact.addressShort}</p>
            <div style={{ marginTop: "1rem" }}>
              <span style={{
                display: "inline-block",
                background: "#e10600",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "4px",
                marginRight: "6px"
              }}>
                Albafroz
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Lini Frozen Food Premium</span>
            </div>
          </div>
          <div>
            <h3>Navigasi</h3>
            <ul>
              <li><Link href="/produk">Katalog Produk</Link></li>
              <li><Link href="/albafroz">Albafroz Frozen</Link></li>
              <li><Link href="/reseller">Program Reseller &amp; Grosir</Link></li>
              <li><Link href="/tentang">Tentang Kami</Link></li>
              <li><Link href="/lokasi">Lokasi &amp; Jam Buka</Link></li>
              <li><Link href="/faq">FAQ &amp; Panduan</Link></li>
            </ul>
          </div>
          <div>
            <h3>Hubungi &amp; Order</h3>
            <ul>
              <li><a href={waLink("Halo Alba Food Market, saya mau tanya.")}>{contact.phoneIntl}</a></li>
              <li><a href={contact.instagram} target="_blank" rel="noreferrer">{contact.instagramHandle}</a></li>
              <li><Link href="/lokasi">Pasir Putih, Sawangan, Depok</Link></li>
            </ul>
            <div style={{ marginTop: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", margin: "0 0 0.2rem" }}>Jam Buka Toko</h4>
              <p style={{ fontSize: "0.85rem", margin: 0 }}>{contact.hours.label}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>{contact.hours.closedNote}</p>
            </div>
          </div>
        </div>
        <div className="wrap legal">
          © {new Date().getFullYear()} {contact.name} · Bagian dari jaringan{" "}
          {partners.map((p, i) => (
            <span key={p.handle}>
              {i > 0 ? " · " : ""}
              <a href={p.url} target="_blank" rel="noreferrer">{p.handle}</a>
            </span>
          ))}
        </div>
      </footer>

      <a className="wa-float" href={waLink("Halo Alba Food Market, saya mau pesan.")} aria-label="Pesan via WhatsApp">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 5h16v11H9l-5 4V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span>Pesan WhatsApp</span>
      </a>

      <nav className="tabbar" aria-label="Menu cepat">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} data-active={t.href === "/" ? path === "/" : path.startsWith(t.href)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d={t.d} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            {t.label}
          </Link>
        ))}
        <button type="button" onClick={() => setMenuOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Menu
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              padding: "1.5rem",
              maxHeight: "85vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Menu Navigasi</h3>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "4px 8px"
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: path === "/" ? "#f6f6f4" : "transparent", fontWeight: 600 }}
              >
                🏠 Beranda
              </Link>
              <Link
                href="/produk"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: path.startsWith("/produk") ? "#f6f6f4" : "transparent", fontWeight: 600 }}
              >
                🥟 Katalog Produk Lengkap
              </Link>
              <Link
                href="/albafroz"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: path.startsWith("/albafroz") ? "#f6f6f4" : "transparent", fontWeight: 600, color: "#d90700" }}
              >
                ❄️ Albafroz Frozen Food
              </Link>
              <Link
                href="/reseller"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: path.startsWith("/reseller") ? "#f6f6f4" : "transparent", fontWeight: 600, color: "#006d30" }}
              >
                🤝 Program Reseller &amp; Grosir
              </Link>
              <Link
                href="/tentang"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: path.startsWith("/tentang") ? "#f6f6f4" : "transparent", fontWeight: 600 }}
              >
                📖 Tentang Kami
              </Link>
              <Link
                href="/lokasi"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: path.startsWith("/lokasi") ? "#f6f6f4" : "transparent", fontWeight: 600 }}
              >
                📍 Lokasi &amp; Jam Buka Toko
              </Link>
              <Link
                href="/faq"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: path.startsWith("/faq") ? "#f6f6f4" : "transparent", fontWeight: 600 }}
              >
                ❓ FAQ &amp; Panduan Masak
              </Link>
              <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "0.5rem 0" }} />
              <button
                type="button"
                onClick={() => { setMenuOpen(false); setCart(true); }}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  background: "#f6f6f4",
                  fontWeight: 700,
                  display: "flex",
                  justifyContent: "space-between",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <span>🛒 Buka Keranjang Belanja</span>
                {count > 0 ? <span style={{ background: "#d90700", color: "#fff", padding: "1px 8px", borderRadius: "999px", fontSize: "0.8rem" }}>{count}</span> : null}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {cart ? <CartDrawer onClose={() => setCart(false)} /> : null}
    </>
  );
}
