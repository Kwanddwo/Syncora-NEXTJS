import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Inbox } from "@/types";
import { getNotificationTitle } from "@/app/dashboard/inbox/_inboxComponents/inboxUtils";

const InboxGeneralCard = (notif: Inbox) => {
  const notifDate = new Date(notif.createdAt);
  return (
    <div
      key={notif.id}
      onClick={() => {}}
      className={`flex items-start gap-4 rounded-lg border p-3 transition-colors ${
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
        <div className="text-sm font-medium">{getNotificationTitle(notif)}</div>
        <div className="text-xs text-muted-foreground line-clamp-2">
          {notif.message}
        </div>
      </div>
    </div>
  );
};

export default InboxGeneralCard;
