export interface Task {
  id: string;
  title: string;
  dueDate?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId ?: string;
  defaultOpen: boolean;
  isPersonal ?:boolean;
  icon ?:string;
  tasks : Task[];
}
interface User {
  id: string;
  name: string;
  lastName: string;
  email?: string;
  avatarUrl?: string | null;
}

interface AssignedBy {
  id: string;
  name: string;
  lastName: string;
}

export interface Assignee {
  id: string;
  taskId: string;
  userId: string;
  assignedAt: string; // ISO date string
  assignedById: string;
  user: User;
  assignedBy: AssignedBy;
}
export type TaskRequest = {
  title: string;
  description?: string;
  priority: string;
  workspaceId: string;
  dueDate: string;
};

export type TaskUpdateRequest = {
  title: string | undefined;
  description?: string | undefined;
  workspaceId: string;
  dueDate: string | undefined;
};

export type WorkspaceCreateRequest = {
  name : string;
  description? : string;
  isPersonal : boolean;
  icon ?: string;
}

export type RecentWorkspace = {
  id: string;
  userId: string;
  workspaceId: string;
  viewedAt: string;
  workspace: Workspace;
};

export type TaskAssignee={
  taskId: string;
  workspaceId: string;
  workspaceMemberIds ?: string[];
}