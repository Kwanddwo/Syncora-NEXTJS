"use client";
import { LoginForm } from "@/app/(auth)/sign-in/login-form";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white dark:bg-card rounded-lg shadow-lg p-6 space-y-6 flex flex-col items-center">
        <Logo isText={true} hasBottomGutter={true} />
        <LoginForm />
      </div>
    </div>
  );
}
