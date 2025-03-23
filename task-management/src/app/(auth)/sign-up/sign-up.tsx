"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !lastname || !email || !password) {
      setError("All fields are required.");
      return;
    }
     try {
       const res = await axios.post(
         "http://localhost:3001/api/auth/emailCheck",
         {
           email,
         }
       );

       if (res.data.user) {
         setError("Email is already in use");
         return;
       }
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (err: any) {
       console.error("Email check error:", err);
       setError("Failed to verify email. Please try again.");
       return;
     }

     try {
       const response = await axios.post(
         "http://localhost:3001/api/auth/register",
         {
           name,
           lastname,
           email,
           password,
         }
       );

       console.log("User registered:", response.data);
       alert("User created successfully");
       router.push("/home");
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (err: any) {
       console.error("Registration error:", err);
       setError(
         err.response ? err.response.data.message : "Registration failed."
       );
     }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your information below to create your account
        </p>
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John"
            ref={nameRef}
            required
          />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            type="text"
            placeholder="Doe"
            ref={lastnameRef}
            required
          />
        </div>
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
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" ref={passwordRef} required />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        You already have an account?{" "}
        <Link href="/" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </form>
  );
}
