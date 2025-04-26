"use client";
import { useEffect, useState } from "react";
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
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { sendInviteAPI } from "@/app/_api/InviteAPI";
import { getUsersFromEmailAPI } from "@/app/_api/UsersAPIs";

import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkspaceMember } from "@/lib/types";

export function InviteDialog({
  workspaceId,
  members,
}: {
  workspaceId: string;
  members: WorkspaceMember[] | undefined | null;
}) {
  const [userList, setUserList] = useState<User[]>([]);
  const [invitedUser, setInvitedUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!invitedUser) {
      toast.error("Please select a user to invite.");
      setLoading(false);
      return;
    }

    try {
      const res = await sendInviteAPI(workspaceId, invitedUser.id);
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
    console.log("Email changed:", email);
    const getUsersFromEmail = async () => {
      if (email.length > 2) {
        console.log("Fetching users from email API...");
        const { users } = await getUsersFromEmailAPI(email);
        console.log("Users fetched:", users);
        const filteredUsers = members
          ? users.filter(
              (user: User) =>
                !members.map((member) => member.user.id).includes(user.id)
            )
          : users;
        if (filteredUsers && filteredUsers.length > 0) {
          setUserList(filteredUsers);
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
              Invite an user to your workspace
            </DialogDescription>
          </DialogHeader>
          {invitedUser ? (
            <div
              key={invitedUser.id}
              className="flex items-center gap-2 rounded-md border-2 my-2 py-2 px-3"
            >
              <Avatar>
                <AvatarImage src={invitedUser.avatarUrl} />
                <AvatarFallback>
                  {invitedUser.name &&
                    invitedUser.name.charAt(0).toUpperCase() +
                      (invitedUser.lastName &&
                        invitedUser.lastName.charAt(0).toUpperCase())}
                </AvatarFallback>
              </Avatar>
              <span>{invitedUser.name}</span>
              {invitedUser.lastName && <span>{invitedUser.lastName}</span>}
              <Button
                type="button"
                variant="outline"
                className="ml-auto"
                onClick={() => setInvitedUser(null)}
              >
                Remove
              </Button>
            </div>
          ) : (
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
                  <ScrollArea>
                    <div className="flex flex-col gap-2">
                      {userList.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-2 hover:cursor-pointer hover:bg-slate-100 rounded-md border-2 py-2 px-3"
                          onClick={() => {
                            setInvitedUser(user);
                          }}
                        >
                          <Avatar>
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>
                              {user.name &&
                                user.name.charAt(0).toUpperCase() +
                                  (user.lastName &&
                                    user.lastName.charAt(0).toUpperCase())}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {user.name} {user.lastName && user.lastName}
                          </span>
                          <span className="text-sm ml-auto">{user.email}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setInvitedUser(null)}
              >
                Cancel
              </Button>
            </DialogClose>
            {invitedUser && (
              <Button type="button" onClick={handleSubmit}>
                Invite
              </Button>
            )}
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
