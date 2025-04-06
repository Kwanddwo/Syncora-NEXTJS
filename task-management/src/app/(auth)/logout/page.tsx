"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push("/");
  });
  return null;
}
