"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

import { feedbackAPI } from "@/app/_api/FeedbackAPI";
import { Feedback } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FeedbackPage() {
  const [selectedType, setSelectedType] = useState<string>("general");
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const type = selectedType;
    const message = messageRef.current?.value;

    if (!type || !message) {
      toast.error("Type and message are required");
      return;
    }
    try {
      await feedbackAPI({ type, message } as Feedback);
      toast.success("Feedback sent successfully");
      // Reset form
      setSelectedType("general");
      if (messageRef.current) {
        messageRef.current.value = "";
      }
    } catch (err: any) {
      console.log(err);
      toast.error(
        err.response ? err.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Feedback
          </h1>
          <p className="mt-2 text-muted-foreground">
            Please share your thoughts with us. We value your feedback and use
            it to improve our services.
          </p>
          <p className="mt-2">
            <Link href="https://github.com/0XAymax/Syncora-NEXTJS/issues">
              <Button variant="outline">
                <Github /> Check out Issues
              </Button>
            </Link>
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="messageType"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Feedback Type
            </Label>{" "}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="messageType">
                <SelectValue placeholder="Select message type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Feedback Message
            </Label>{" "}
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows={4}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Share your feedback with us..."
              required
            ></textarea>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackPage;
