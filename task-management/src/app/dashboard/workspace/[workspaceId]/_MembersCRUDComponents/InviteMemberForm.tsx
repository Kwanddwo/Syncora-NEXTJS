"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchMembersFromWorkspace } from "@/app/_api/WorkspacesAPIs";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { sendInviteAPI } from "@/app/_api/InviteAPI";
import { getUsersFromEmailAPI } from "@/app/_api/UsersAPIs";

import { User } from "@/types";
import { Avatar } from "@/components/ui/avatar";

export function InviteDialog({ workspaceId }: { workspaceId: string }) {
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [invitedUserId, setInvitedUserId] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!invitedUserId) {
      toast.error("Please select a user to invite.");
      setLoading(false);
      return;
    }

    try {
      const res = await sendInviteAPI(invitedUserId, workspaceId);
      if (res && res.message) {
        setLoading(false);
        setOpen(false);
        toast.success("Member invited successfully");
      } else {
        throw new Error("Invite failed.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    const getWorkspaceMembers = async () => {
      const response = await fetchMembersFromWorkspace(workspaceId);
      setMembers(response);
    };
    getWorkspaceMembers();
  }, [workspaceId]);

  useEffect(() => {
    console.log("Email changed:", email);
    const getUsersFromEmail = async () => {
      if (email.length > 2) {
        console.log("Fetching users from email API...");
        const { users } = await getUsersFromEmailAPI(email);
        console.log("Users fetched:", users);
        if (users && users.length > 0) {
          setUserList(users);
        } else {
          setUserList([]);
        }
      }
    };
    getUsersFromEmail();
  }, [email]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Invite User...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Invite user</DialogTitle>
            <DialogDescription>
              Invite a new user to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              {email.length > 2 && userList.length > 0 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {userList[0].name}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4">
                    <div className="flex flex-col gap-2">
                      {userList.map((user) => (
                        <div key={user.id} className="flex items-center gap-2">
                          {/* <Avatar src={user.avatarUrl} alt={user.name} /> */}
                          <span>{user.name}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSubmit}>
              Invite
            </Button>
          </DialogFooter>
        </form>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            {/* React spinner centered */}
            <ClipLoader color="#00BFFF" size={50} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
