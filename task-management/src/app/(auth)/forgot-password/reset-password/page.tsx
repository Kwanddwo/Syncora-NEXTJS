"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function ResetPassowrd() {
  const passRef = useRef<HTMLInputElement>(null);
  const ConfirmpassRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();
   const searchParams = useSearchParams();
   const token = searchParams.get("token");
   console.log("Token from URL:", token);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = passRef.current?.value;
    const confirmpass = ConfirmpassRef.current?.value;
    if (password !== confirmpass) {
      setError("Password does not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/reset-password",
        { token, password }
      );
      alert(response.data.message);
      router.push("/")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response ? err.response.data.message : "Invalid or expired token"
      );
    }
  };
  
  return (
    <div className=" flex items-center justify-center min-h-screen ">
      <form onSubmit={handleSubmit}>
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              <p>Enter your New Password</p>
            </CardDescription>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </CardHeader>
          <CardContent>
            <label>New Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              ref={passRef}
              required
            ></Input>
            <label>Confirm your Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              ref={ConfirmpassRef}
              required
            ></Input>
          </CardContent>
          <CardFooter className="mt-auto">
            <div className="cursor-pointer">
              <Button type="submit">Reset</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
