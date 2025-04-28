"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInbox } from "@/context/InboxContext";

export function NotificationButton() {
  const { inboxCount: count } = useInbox(); // Assuming you have a context or state to get the inbox count
  const maxCount = 99; // Set the maximum count to display
  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <Link href="/dashboard/inbox" className="relative inline-flex">
      <Button variant="ghost" size="icon" className="relative h-10 w-10">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 min-w-[1.25rem] items-center justify-center rounded-full bg-tag-red text-xs font-medium text-tag-red-foreground">
            {displayCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
