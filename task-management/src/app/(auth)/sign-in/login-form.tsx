"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { login } = useAuth(); // Assuming you have a useAuth hook to manage authentication

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(
        err.response ? err.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <form className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            ref={emailRef}
            required
            className="w-full"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            ref={passwordRef}
            required
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/sign-up" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
