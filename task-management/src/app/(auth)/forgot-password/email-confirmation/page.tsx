"use client"
import { Button } from '@/components/ui/button';
import {  useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react'
import {codeVerificationAPI, resetPassAPI} from "@/app/_api/ResetPassAPIs";

function EmailConfirmation() {
  const codeRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const code= codeRef.current?.value;
    if(!code){
      setError("Code Verification is required");
      return;
    }
    if(!email){
      setError("Error while sending email address");
      return;
    }
    try {
     const verificationResponse = await codeVerificationAPI(email,code);
     if (verificationResponse.data.message) {
       const resetResponse = await resetPassAPI(email);
       const token = resetResponse.data.token;

       window.location.href = `/forgot-password/reset-password?token=${token}`;
     } else {
       setError("Failed to verify the code. Please try again.");
     }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response) {
        setError(
          err.response?.data?.error ||
            "Failed to verify the code. Please try again."
        );
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      console.error("Verification or reset error:", err);
    }
    
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Enter Verification Code
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          A verification code has been sent to your email address. Please check
          your inbox and enter the 6-digit code below to proceed.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              ref={codeRef}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EmailConfirmation