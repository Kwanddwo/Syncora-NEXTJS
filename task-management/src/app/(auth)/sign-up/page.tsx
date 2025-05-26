"use client";
import { SignUpForm } from "@/app/(auth)/sign-up/sign-up";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white dark:bg-card rounded-lg shadow-lg p-6 space-y-6 flex flex-col items-center">
        <SignUpForm />
      </div>
    </div>
  );
}
