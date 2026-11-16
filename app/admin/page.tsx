import type { Metadata } from "next";
import { Admin } from "@/components/admin/Admin";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="wrap section">
      <div className="head">
        <h1>Dashboard</h1>
      </div>
      <Admin />
    </section>
  );
}
