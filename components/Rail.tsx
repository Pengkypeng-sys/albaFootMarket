"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Satu baris yang bisa digeser (sentuh, scroll, atau tombol panah di desktop). */
export function Rail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="rail">
      <div ref={ref} className="rail-track" role="group" aria-label={label} onScroll={measure}>
        {children}
      </div>
      <button className="rail-btn" data-dir="prev" type="button" aria-label="Geser ke kiri" hidden={edge.start} onClick={() => go(-1)}>
        ‹
      </button>
      <button className="rail-btn" data-dir="next" type="button" aria-label="Geser ke kanan" hidden={edge.end} onClick={() => go(1)}>
        ›
      </button>
    </div>
  );
}
