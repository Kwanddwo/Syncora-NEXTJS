import { acceptInviteAPI, declineInviteAPI } from "@/app/_api/InviteAPI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Inbox } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const InboxInviteCard = (notif: Inbox) => {
  const router = useRouter();

  const notifDate = new Date(notif.createdAt);

  const handleInviteAccept = async (inviteId: string) => {
    try {
      const response = await acceptInviteAPI(inviteId);
      console.log("Invite accepted:", response.data);
      toast.success("Invite accepted successfully!");
      router.push("/dashboard/workspace/" + response.data.workspaceId);
    } catch (error) {
      console.error("Error accepting invite:", error);
      toast.error("Failed to accept invite.");
    }
  };

  const handleInviteDecline = async (inviteId: string) => {
    try {
      const response = await declineInviteAPI(inviteId);
      console.log("Invite declined:", response.data);
      toast.success("Invite declined successfully!");
    } catch (error) {
      console.error("Error declining invite:", error);
      toast.error("Failed to decline invite.");
    }
  };

  const isAccepted = notif.details?.invite.status === "accepted";

  return (
    <div
      key={notif.id}
      onClick={() => {
        if (isAccepted)
          router.push(
            "/dashboard/workspace/" + notif.details?.invite.workspaceId
          );
      }}
      className={`flex items-start gap-4 rounded-lg border p-3 transition-colors ${
        (!notif.read ? "bg-muted/30" : " ") +
        (isAccepted ? "hover:bg-muted/50 hover:cursor-pointer" : "")
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
            {Date.now() - notifDate.getTime() < 1000 * 60
              ? "Just now"
              : notifDate.toLocaleDateString("fr-MA", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </div>
        </div>
        <div className="text-sm font-medium">
          You have been invited to {notif.details?.invite.workspace.name}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-2">
          {notif.message}
        </div>
        {notif.details?.invite.status === "pending" ? (
          <div className="flex gap-2 align-items-center">
            <Button
              onClick={() => handleInviteAccept(notif.details?.invite.id)}
            >
              Accept
            </Button>
            <Button
              onClick={() => handleInviteDecline(notif.details?.invite.id)}
            >
              Decline
            </Button>
          </div>
        ) : (
          <div className="text-muted-foreground text-xs">
            You have {notif.details?.invite.status} this invitation.
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxInviteCard;
