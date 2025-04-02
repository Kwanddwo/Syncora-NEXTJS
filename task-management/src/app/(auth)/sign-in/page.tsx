"use client";
import { LoginForm } from "@/app/(auth)/sign-in/login-form";
import Logo from "@/components/Logo";
export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <Logo isText={true} hasBottomGutter={true} />
          <LoginForm />
        </div>
      </div>
    </>
  );
}
