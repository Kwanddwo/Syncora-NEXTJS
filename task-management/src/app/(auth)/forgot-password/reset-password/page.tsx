"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {  useSearchParams } from "next/navigation";
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
  const [error, setError] = useState("");
   const searchParams = useSearchParams();
   const token = searchParams.get("token");

  return (
    <div className=" flex items-center justify-center min-h-screen ">
      <form >
        <Card className="flex flex-col h-full w-[400px]">
          <CardHeader className="text-center">
            <CardTitle >Reset Password</CardTitle>
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
            <br />
            <label>Confirm your Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              ref={ConfirmpassRef}
              required
            ></Input>
          </CardContent>
          <p className="text-center text-sm text-muted-foreground">This link will expire in 15 minutes </p>
          <CardFooter className="mt-auto flex justify-center">
            <div className="cursor-pointer">
              <br />
              <ResetAlert passRef={passRef} ConfirmpassRef={ConfirmpassRef} setError={setError} token={token} />
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
