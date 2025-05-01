import { Inbox } from "@/types";

export function getNotificationTitle(inbox: Inbox) {
  switch (inbox.type) {
    case "workspace_invite":
      return `You have been invited to ${inbox.details?.invite.workspace.name}`;
    case "workspace_role_updated":
      return "Your role in the workspace has been updated";
    case "removed_from_workspace":
      return "You have been removed from a workspace";
    case "workspace_deleted":
      return "A workspace you were part of has been deleted";
    case "task_assigned":
      return "You have been assigned a new task";
    case "task_updated":
      return "A task you are involved in has been updated";
    case "task_status_changed":
      return "The status of a task has changed";
    case "task_due_soon":
      return "A task is due soon";
    case "task_overdue":
      return "A task is overdue";
    case "task_comment_added":
      return "A new comment has been added to a task";
    case "admin_announcement":
      return "An announcement from the admin";
    default:
      return "Notification";
  }
}
