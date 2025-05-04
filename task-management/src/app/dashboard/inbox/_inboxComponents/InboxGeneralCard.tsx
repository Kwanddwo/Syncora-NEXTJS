import { Badge } from "@/components/ui/badge";
import { Inbox } from "@/types";
import { getNotificationTitle } from "@/app/dashboard/inbox/_inboxComponents/inboxUtils";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";


interface InboxGeneralCardProps {
  notif: Inbox;
  handleMark: (id: string, read: boolean) => void;
}
const InboxGeneralCard = ({ notif, handleMark }: InboxGeneralCardProps)  => {
  const notifDate = new Date(notif.createdAt);
  return (
    <div
      key={notif.id}
      onClick={() => {}}
      className={`flex items-start gap-4 rounded-lg border p-3 transition-colors ${
        !notif.read ? "bg-muted/30" : ""
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
        <div className="text-sm font-medium">{getNotificationTitle(notif)}</div>
        <div className="text-xs text-muted-foreground line-clamp-2">
          {notif.message}
        </div>
      </div>
    </div>
  );
};

export default InboxGeneralCard;
