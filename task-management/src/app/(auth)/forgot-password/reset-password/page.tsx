"use client";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import ResetAlert from "@/app/(auth)/forgot-password/reset-password/reset-dialog";
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
  const token = localStorage.getItem("resetToken");
  console.log("RESET TOKEN :", token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form className="w-full max-w-md">
        <Card className="flex flex-col h-full">
          <CardHeader className="text-center">
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              <p>Enter your New Password</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <label>New Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              ref={passRef}
              required
            />
            <br />
            <label>Confirm your Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              ref={ConfirmpassRef}
              required
            />
          </CardContent>
          <p className="text-center text-sm text-muted-foreground">
            This link will expire in 15 minutes{" "}
          </p>
          <CardFooter className="mt-auto flex justify-center">
            <div className="cursor-pointer w-full">
              <br />
              <ResetAlert
                passRef={passRef}
                ConfirmpassRef={ConfirmpassRef}
                token={token}
              />
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
