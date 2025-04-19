"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {checkEmailAPI} from "@/app/_api/AuthAPIs";
import {sendEmailAPI} from "@/app/_api/ResetPassAPIs";

export default function ForgotPassowrd() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    if(!email){
      setError("Email is required");
      return;
    }
    try {
      const res = await checkEmailAPI(email);
      if (!res.data.user) {
        setError("Email not registered");
        return;
      }

      const response = await sendEmailAPI(email);
      if (response.data.message) {
        window.location.href = `/forgot-password/email-confirmation?email=${email}`;
      } else {
        setError("Failed to send verification email. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response) {
        setError(
          err.response.data.error || "Something went wrong. Please try again."
        );
      } else if (err.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      console.error("Email verification error:", err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              <p>
                Enter your email address to get instructions for resetting your
                password.
              </p>
            </CardDescription>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </CardHeader>
          <CardContent>
            <label>Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
              ref={emailRef}
              required
            ></Input>
          </CardContent>
          <CardFooter className="mt-auto flex justify-end">
            <div className="cursor-pointer">
              <Button type="submit">Reset</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
