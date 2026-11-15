"use client";

import { useEffect, useState } from "react";
import { openStatus, type OpenStatus } from "@/lib/brand";

/** Dihitung di browser (WIB) supaya tidak basi pada halaman statis. */
export function StatusBadge() {
  const [s, setS] = useState<OpenStatus | null>(null);

  useEffect(() => {
    setS(openStatus());
    const t = setInterval(() => setS(openStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!s) return <span className="status" aria-hidden style={{ visibility: "hidden" }}>Tutup · buka besok 09.00</span>;
  return (
    <span className="status" data-open={s.open}>
      {s.text}
    </span>
  );
}
