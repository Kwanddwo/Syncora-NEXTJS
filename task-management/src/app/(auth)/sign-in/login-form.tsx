"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useRef, useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation"
export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentProps<"form">) {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error,setError]=useState("");
  const router = useRouter();


    const handleSubmit = async () => {
       const email = emailRef.current?.value;
       const password = passwordRef.current?.value;

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await axios.post(
          "http://localhost:3001/api/auth/login",
          {
            email:email,
            password:password,
          }
        );
        const token = response.data.token; 
        localStorage.setItem("authToken", token);
        router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      }
    };

  
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            ref={emailRef}
            required
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
          <Input id="password" type="password" ref={passwordRef} required />
        </div>
        <Button
          type="button"
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
