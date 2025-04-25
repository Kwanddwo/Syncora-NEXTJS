"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Archive,
  ArchiveX,
  ChevronDown,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import { useInbox } from "@/context/InboxContext";
import { Inbox } from "@/types";

export default function InboxPage() {
  const { inbox, fetchInbox, setInbox } = useInbox();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={fetchInbox}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inbox..."
              className="h-8 w-[150px] pl-8 sm:w-[250px] md:w-[300px]"
            />
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Checkbox id="select-all" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>None</DropdownMenuItem>
              <DropdownMenuItem>Read</DropdownMenuItem>
              <DropdownMenuItem>Unread</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Archive className="h-4 w-4" />
            <span className="sr-only">Archive</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArchiveX className="h-4 w-4" />
            <span className="sr-only">Move to spam</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Mark as read</DropdownMenuItem>
              <DropdownMenuItem>Mark as unread</DropdownMenuItem>
              {/* <DropdownMenuItem>Star</DropdownMenuItem>
              <DropdownMenuItem>Add label</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 grid gap-2">
          {inbox.map((notif) => (
            <div
              key={notif.id}
              className={`flex cursor-pointer items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50 ${
                !notif.read ? "bg-muted/30" : ""
              }`}
            >
              <Checkbox id={`notif-${notif.id}`} />
              <div className="grid flex-1 gap-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {notif.sender && (
                      <div className="font-semibold">
                        {notif.sender
                          ? notif.sender.name + " " + notif.sender.lastName
                          : "Notification"}
                      </div>
                    )}
                    {!notif.read && (
                      <Badge variant="secondary" className="ml-2">
                        Unread
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Date.now() - notif.createdAt.getTime() < 1000 * 60
                      ? "Just now"
                      : notif.createdAt.toLocaleDateString("fr-MA", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                  </div>
                </div>
                <div className="text-sm font-medium">{titles[notif.type]}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {notif.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const titles = {
  workspace_invite: "You have been invited to a workspace",
  workspace_role_updated: "Your role in the workspace has been updated",
  removed_from_workspace: "You have been removed from a workspace",
  workspace_deleted: "A workspace you were part of has been deleted",
  task_assigned: "You have been assigned a new task",
  task_updated: "A task you are involved in has been updated",
  task_status_changed: "The status of a task has changed",
  task_due_soon: "A task is due soon",
  task_overdue: "A task is overdue",
  task_comment_added: "A new comment has been added to a task",
  admin_announcement: "An announcement from the admin",
  generic: "Notification",
};

const previewInbox: Inbox[] = [
  {
    id: "notif-001",
    userId: "user-001",
    type: "generic",
    message: "Welcome to our app!",
    senderId: null,
    details: {
      action: "onboarding",
    },
    createdAt: new Date(),
    read: false,
    sender: null,
  },
  {
    id: "notif-002",
    userId: "user-001",
    type: "generic",
    message: "Hey, how are you?",
    senderId: "user-002",
    details: {
      chatId: "chat-123",
    },
    createdAt: new Date("2025-04-22T09:30:00.000Z"),
    read: false,
    sender: {
      id: "user-002",
      name: "Alice Johnson",
    },
  },
  {
    id: "notif-003",
    userId: "user-001",
    type: "workspace_role_updated",
    message: "Security alert: new login from unknown device.",
    senderId: null,
    details: {
      ip: "192.168.1.100",
    },
    createdAt: new Date("2025-04-22T10:15:00.000Z"),
    read: true,
    sender: null,
  },
  {
    id: "notif-004",
    userId: "user-001",
    type: "workspace_invite",
    message: "Don't forget our meeting at 3 PM.",
    senderId: "user-003",
    details: {
      eventId: "event-456",
    },
    createdAt: new Date("2025-04-22T11:00:00.000Z"),
    read: false,
    sender: {
      id: "user-003",
      name: "Mohamed El Amrani",
    },
  },
];
