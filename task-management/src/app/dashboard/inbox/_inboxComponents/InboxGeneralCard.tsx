import { Badge } from "@/components/ui/badge";
import { Inbox } from "@/types";
import { getNotificationTitle } from "@/app/dashboard/inbox/_inboxComponents/inboxUtils";
import { formatDistanceToNow } from "date-fns";

export interface InboxGeneralCardProps {
  notif: Inbox;
  title?: string;
  message?: string;
  handleMark: (id: string, read: boolean) => void;
  children?: React.ReactNode;
}

const InboxGeneralCard = ({
  notif,
  title,
  message,
  handleMark,
  children,
}: InboxGeneralCardProps) => {
  const notifDate = new Date(notif.createdAt);
  return (
    <div
      key={notif.id}
      className={`flex items-start gap-2 sm:gap-4 rounded-lg border p-2 sm:p-3 transition-colors ${
        !notif.read ? "bg-muted/30" : ""
      }`}
    >
      <div className="grid flex-1 gap-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <div className="font-semibold text-sm sm:text-base">
              {notif.sender && notif.sender != null
                ? notif.sender.name + " " + notif.sender.lastName
                : "Alert"}
            </div>
            <Badge
              variant="outline"
              className="text-xs hover:bg-accent cursor-pointer"
              onClick={() => handleMark(notif.id, !notif.read)}
            >
              {notif.read ? "Read" : "Unread"}
            </Badge>
          </div>
          <p className="mt-0 text-xs text-muted-foreground">
            {formatDistanceToNow(notifDate, {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="text-sm font-medium">
          {title || getNotificationTitle(notif)}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-2">
          {message || notif.message}
        </div>
        {children}
      </div>
    </div>
  );
};

export default InboxGeneralCard;
