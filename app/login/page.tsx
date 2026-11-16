import type { Metadata } from "next";
import { LoginPageClient } from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Login Pemilik",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="wrap section">
      <LoginPageClient />
    </section>
  );
}
