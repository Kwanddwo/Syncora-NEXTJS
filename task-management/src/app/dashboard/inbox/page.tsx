"use client";

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
import InboxInviteCard from "./_inboxComponents/InboxInviteCard";
import InboxGeneralCard from "./_inboxComponents/InboxGeneralCard";
import { useRouter } from "next/navigation";

export default function InboxPage() {
  const router = useRouter();
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
          {inbox.map((notif) => {
            switch (notif.type) {
              case "workspace_invite":
                return InboxInviteCard(notif, router);
              default:
                return InboxGeneralCard(notif);
            }
          })}
        </div>
      </main>
    </div>
  );
}
