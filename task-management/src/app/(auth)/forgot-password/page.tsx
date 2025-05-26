"use client";
import React, { useRef } from "react";
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
import { checkEmailAPI } from "@/app/_api/AuthAPIs";
import { sendEmailAPI } from "@/app/_api/ResetPassAPIs";
import { toast } from "sonner";

export default function ForgotPassowrd() {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      const res = await checkEmailAPI(email);
      if (!res.data.user) {
        toast.error("Email not registered");
        return;
      }

      const response = await sendEmailAPI(email);
      if (response.data.message) {
        window.location.href = `/forgot-password/email-confirmation?email=${email}`;
      } else {
        toast.error("Failed to send verification email. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response) {
        toast.error(
          err.response.data.error || "Something went wrong. Please try again."
        );
      } else if (err.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

      console.error("Email verification error:", err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              <p>
                Enter your email address to get instructions for resetting your
                password.
              </p>
            </CardDescription>
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
            />
          </CardContent>
          <CardFooter className="mt-auto flex justify-end">
            <div className="cursor-pointer w-full">
              <Button type="submit" className="w-full">
                Reset
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
