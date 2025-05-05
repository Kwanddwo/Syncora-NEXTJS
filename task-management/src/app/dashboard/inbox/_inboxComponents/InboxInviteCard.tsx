import { acceptInviteAPI, declineInviteAPI } from "@/app/_api/InviteAPI";
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import InboxGeneralCard, { InboxGeneralCardProps } from "./InboxGeneralCard";
import { useWorkspaces } from "@/context/WorkspaceContext";

interface InboxInviteCardProps extends InboxGeneralCardProps {
  router: AppRouterInstance;
}

const InboxInviteCard = ({
  notif,
  handleMark,
  router,
}: InboxInviteCardProps) => {
  const { refreshWorkspaces } = useWorkspaces();

  const handleInviteAccept = async (inviteId: string, workspaceId: string) => {
    try {
      const response = await acceptInviteAPI(inviteId);
      console.log("Invite accepted:", response.data);
      toast.success("Invite accepted successfully!");
      await refreshWorkspaces();
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

  return (
    <InboxGeneralCard
      notif={notif}
      title={`You have been invited to ${notif.details?.invite.workspace.name}`}
      handleMark={handleMark}
    >
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
          <Button onClick={() => handleInviteDecline(notif.details?.invite.id)}>
            Decline
          </Button>
        </div>
      ) : (
        <div className="text-muted-foreground text-xs">
          You have {notif.details?.invite.status} this invitation.
        </div>
      )}
    </InboxGeneralCard>
  );
};

export default InboxInviteCard;
