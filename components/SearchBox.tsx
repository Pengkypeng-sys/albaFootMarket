"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { searchProducts, thumb } from "@/data/products";

export function SearchBox({
  large = false,
  initial = "",
  placeholder = "Cari produk: kulit sambosa, kurma, bumbu…",
}: {
  large?: boolean;
  initial?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);

  const hits = q.trim() ? searchProducts(q).slice(0, 5) : [];

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function go(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    if (cursor >= 0 && hits[cursor]) router.push(`/produk/${hits[cursor].slug}`);
    else router.push(q.trim() ? `/produk?q=${encodeURIComponent(q.trim())}` : "/produk");
  }

  function keys(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, -1));
    } else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className={large ? "search search-lg" : "search"} ref={root}>
      <form role="search" onSubmit={go}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          name="q"
          value={q}
          placeholder={placeholder}
          aria-label="Cari produk"
          aria-controls={listId}
          aria-expanded={open && q.trim() !== ""}
          autoComplete="off"
          onChange={(e) => {
            setQ(e.target.value);
            setCursor(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={keys}
        />
      </form>
      {open && q.trim() ? (
        <div className="suggest" id={listId}>
          {hits.length === 0 ? (
            <p>Tidak ketemu. Tanya langsung via WhatsApp.</p>
          ) : (
            hits.map((p, i) => (
              <Link
                key={p.slug}
                href={`/produk/${p.slug}`}
                data-on={i === cursor}
                onClick={() => setOpen(false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(p.image, 120)} alt="" />
                <span>
                  {p.name}
                  <small>{p.summary}</small>
                </span>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
