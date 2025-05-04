import { acceptInviteAPI, declineInviteAPI } from "@/app/_api/InviteAPI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

interface InboxInviteCardProps {
  notif: Inbox;
  handleMark: (id: string, read: boolean) => void;
  router: AppRouterInstance;
}
const InboxInviteCard =({ notif, handleMark, router }: InboxInviteCardProps)  => {
  const notifDate = new Date(notif.createdAt);
  const inviteDetails = notif.details?.invite;
  console.log("NOTIFICATION DETAILS", notif.details);
  const handleInviteAccept = async (inviteId: string, workspaceId: string) => {
    try {
      const response = await acceptInviteAPI(inviteId);
      console.log("Invite accepted:", response.data);
      toast.success("Invite accepted successfully!");
      router.push("/dashboard/workspace/" + workspaceId);
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
      router.refresh();
    } catch (error) {
      console.error("Error declining invite:", error);
      toast.error("Failed to decline invite.");
    }
  };

  const isAccepted = inviteDetails.status === "accepted";
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
            <Badge variant="outline" className="text-xs">
              {notif.read ? "Read" : "Unread"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMark(notif.id, !notif.read)}
            >
              {notif.read ? "Mark as unread" : "Mark as read"}
            </Button>
          </div>
          <p className="mt-0 text-xs text-muted-foreground">
            {formatDistanceToNow(notifDate, {
              addSuffix: true,
            })}
          </p>
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
              onClick={() =>
                handleInviteAccept(
                  notif.details?.invite.id,
                  notif.details?.invite.workspaceId
                )
              }
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
