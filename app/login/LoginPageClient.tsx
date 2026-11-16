"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { useAdminAuth } from "@/lib/sales";

export function LoginPageClient() {
  const router = useRouter();
  const { isAuth, ready } = useAdminAuth();

  useEffect(() => {
    if (ready && isAuth) {
      router.replace("/admin");
    }
  }, [ready, isAuth, router]);

  return <AdminLogin onSuccess={() => router.push("/admin")} />;
}
