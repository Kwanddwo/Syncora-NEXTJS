"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InboxIcon, RefreshCw, Search } from "lucide-react";

import { useInbox } from "@/context/InboxContext";
import InboxInviteCard from "./_inboxComponents/InboxInviteCard";
import InboxGeneralCard from "./_inboxComponents/InboxGeneralCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Inbox } from "@/types";
import {
  markAllAsReadAPI,
  markAsReadAPI,
  markAsUnreadAPI,
} from "@/app/_api/InboxAPI";
import { toast } from "sonner";

export default function InboxPage() {
  const router = useRouter();
  const { inbox, fetchInbox, setInbox, loading } = useInbox();
  const [notifications, setNotifications] = useState<Inbox[]>([]);

  useEffect(() => {
    if (!loading) {
      setNotifications(inbox);
    }
  }, [inbox, loading]);

  const handleMarkAllAsRead = async () => {
    const prevInbox = inbox;
    setInbox((prev) => prev.map((item) => ({ ...item, read: true })));
    const response = await markAllAsReadAPI();
    if (response && response.status !== 200) {
      toast.error("Failed to mark all as read.");
      setInbox(prevInbox); // Revert to previous state on error
    } else {
      toast.success("All notifications marked as read.");
    }
  };

  // In your notification handling logic
  const handleMark = async (id: string, read: boolean) => {
    // Optimistic update
    setInbox((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: read } : item))
    );

    try {
      let response;
      if (read) {
        response = await markAsReadAPI(id);
      } else {
        response = await markAsUnreadAPI(id);
      }
      if (response && response.status !== 200) {
        throw new Error("Failed to update notification");
      }
    } catch (error) {
      // Revert on error
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, read: !read } : item))
      );
      toast.error("Failed to update notification.");
    }
  };

  const filterInbox = (query: string) => {
    if (query === "") {
      setNotifications(inbox);
    } else {
      query = query.toLowerCase();
      const filtered = inbox.filter(
        (notif) =>
          notif.message?.toLowerCase().includes(query) ||
          notif.type?.toLowerCase().includes(query) ||
          (
            notif.sender?.name +
            " " +
            notif.sender?.lastName +
            " " +
            notif.sender?.email
          )
            .toLowerCase()
            .includes(query)
      );
      setNotifications(filtered);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={inbox.every((item) => item.read)}
          >
            Mark all as read
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={fetchInbox}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          {/* Keep just search and refresh */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inbox..."
              className="h-8 w-[150px] pl-8 sm:w-[250px] md:w-[300px]"
              onChange={(e) => filterInbox(e.target.value)} // Add actual filtering function
            />
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        {inbox.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <InboxIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No notifications</h2>
            <p className="text-muted-foreground">
              When you receive notifications, they&apos;ll appear here.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            {notifications.map((notif) => {
              switch (notif.type) {
                case "workspace_invite":
                  return InboxInviteCard(notif, handleMark, router);
                default:
                  return InboxGeneralCard(notif, handleMark);
              }
            })}
          </div>
        )}
      </main>
    </div>
  );
}
