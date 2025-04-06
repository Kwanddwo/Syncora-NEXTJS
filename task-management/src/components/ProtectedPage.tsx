"use client";
import React, { useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  // Either return children or null (while redirecting)
  if (!isAuthenticated) {
    return null; // Or a loading spinner/message
  }

  return <>{children}</>;
}
