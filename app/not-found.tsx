import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        Halaman yang Anda cari tidak ditemukan.
      </p>
      <Link
        href="/"
        className="btn btn-primary"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          background: "var(--red)",
          color: "#fff",
          borderRadius: "999px",
          fontWeight: 600,
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
