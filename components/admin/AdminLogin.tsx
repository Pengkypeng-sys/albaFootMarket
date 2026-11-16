"use client";

import Link from "next/link";
import { useState } from "react";
import { DEFAULT_ADMIN_PASS, DEFAULT_ADMIN_PIN, useAdminAuth } from "@/lib/sales";

export function AdminLogin({ onSuccess }: { onSuccess?: () => void }) {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
      if (onSuccess) onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-head">
          <div className="adm-login-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Akses Pemilik Toko</span>
          </div>
          <h2>Login Dashboard</h2>
          <p>
            Kelola kasir transaksi harian, cetak kuitansi, dan pantau stok produk Alba Food Market.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="adm-login-form">
          <label className="field">
            <span>Password atau PIN Pemilik</span>
            <div className="adm-input-eye">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Masukkan password / PIN"
                autoFocus
                required
              />
              <button
                type="button"
                className="adm-eye-btn"
                onClick={() => setShowPass((s) => !s)}
                aria-label={showPass ? "Sembunyikan password" : "Lihat password"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          {error && (
            <p className="adm-login-error" role="alert">
              ⚠️ Password atau PIN salah. Silakan coba lagi.
            </p>
          )}

          <div className="adm-login-hint">
            <small>
              💡 <b>Default Password:</b> <code>{DEFAULT_ADMIN_PASS}</code> atau <b>PIN:</b> <code>{DEFAULT_ADMIN_PIN}</code>
            </small>
          </div>

          <button type="submit" className="btn btn-red btn-block">
            Masuk ke Dashboard →
          </button>
        </form>

        <div className="adm-login-foot">
          <Link href="/" className="fine" style={{ color: "var(--muted)", textDecoration: "underline" }}>
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
