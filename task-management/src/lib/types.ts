export enum WorkspaceRoles {
  admin = "admin",
  member = "member",
  viewer = "viewer",
}

export enum GlobalUserRoles {
  Super = "Super",
  Regular = "Regular",
}

export enum TaskStatus {
  pending = "pending",
  in_progress = "in_progress",
  completed = "completed",
}

export enum RecurringFrequency {
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  custom = "custom",
}

export enum TaskPriority {
  low = "low",
  medium = "medium",
  high = "high",
}

export enum TaskActivityType {
  created = "created",
  updated = "updated",
  deleted = "deleted",
  assigned = "assigned",
  unassigned = "unassigned",
  commented = "commented",
  status_changed = "status_changed",
}

export enum WorkspaceActivityType {
  created = "created",
  updated = "updated",
  deleted = "deleted",
  member_added = "member_added",
  member_removed = "member_removed",
  role_changed = "role_changed",
}

export enum UserActivityType {
  logged_in = "logged_in",
  logged_out = "logged_out",
  profile_updated = "profile_updated",
  password_changed = "password_changed",
  preferences_updated = "preferences_updated",
}

export enum TaskAssigneeType {
  assigned = "assigned",
  unassigned = "unassigned",
}

export enum Theme {
  light = "light",
  dark = "dark",
}

export interface User {
  id: string;
  role: GlobalUserRoles;
  email: string;
  avatarUrl?: string;
  password: string;
  name: string;
  lastName: string;
  createdAt: Date;
  preferences?: UserPreferences;
  workspacesOwned: Workspace[];
  workspaceMembership: WorkspaceMember[];
  tasksCreated: Task[];
  taskActivities: TaskActivity[];
  workspaceActivities: WorkspaceActivity[];
  userActivities: UserActivity[];
  taskAssignees: TaskAssignee[];
  invitedBy: WorkspaceMember[];
  assignedBy: TaskAssignee[];
}

export interface UserPreferences {
  id: string;
  userId: string;
  theme: Theme;
  notifications: boolean;
  emailNotifications: boolean;
  taskReminders: boolean;
  taskAssignmentAlerts: boolean;
  privacyProfileVisibility: boolean;
  privacyLastSeen: boolean;
  taskAutoAccept: boolean;
  defaultTaskPriority?: string;
  user: User;
}

export interface Workspace {
  id: string;
  icon?: string;
  name: string;
  description?: string;
  ownerId?: string;
  createdAt: Date;
  updatedAt: Date;
  isPersonal: boolean;
  owner?: User;
  members: WorkspaceMember[];
  tasks: Task[];
  recTasks: RecurringTask[];
  activities: WorkspaceActivity[];
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role: WorkspaceRoles;
  joinedAt: Date;
  invitedById?: string;
  workspace: Workspace;
  user: User;
  invitedBy?: User;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  workspaceId: string;
  createdById?: string;
  createdAt: Date;
  dueDate: Date;
  priorityOrder: number;
  workspace?: Workspace;
  createdBy?: User;
  assignees?: TaskAssignee[];
  activities?: TaskActivity[];
}

export interface RecurringTask {
  id: string;
  title: string;
  description?: string;
  workspaceId: string;
  created: Date;
  frequency: RecurringFrequency;
  workspace: Workspace;
}

export interface TaskAssignee {
  id: string;
  taskId: string;
  userId: string;
  assignedAt: Date;
  assignedById?: string;
  task: Task;
  user: User;
  assignedBy?: User;
}

export interface TaskActivity {
  id: string;
  taskId: string;
  userId?: string;
  action: TaskActivityType;
  details?: object; // Use specific type if known
  createdAt: Date;
  task: Task;
  user?: User;
}

export interface WorkspaceActivity {
  id: string;
  workspaceId: string;
  userId?: string;
  action: WorkspaceActivityType;
  details?: object; // Use specific type if known
  createdAt: Date;
  workspace: Workspace;
  user?: User;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: UserActivityType;
  details?: object; // Use specific type if known
  createdAt: Date;
  user: User;
}
