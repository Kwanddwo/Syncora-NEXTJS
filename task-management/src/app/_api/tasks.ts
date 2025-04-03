import { Task, TaskPriority, TaskStatus } from "@/lib/types";

export async function getTasksByUserId(userId: string): Promise<Task[]> {
  console.log(userId);
  return [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Implement user authentication",
      description: "Create login/signup system with JWT tokens",
      status: TaskStatus.in_progress,
      priority: TaskPriority.high,
      workspaceId: "3f9a8f7b-2e4d-4c6a-a1b2-c5d6e7f8a9b0",
      createdById: "d83ff7a0-9b2c-4b8d-9e8a-c5d6e7f8a9b0",
      createdAt: new Date("2024-02-15T09:00:00Z"),
      dueDate: new Date("2025-04-10T18:00:00Z"),
      priorityOrder: 1,
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      title: "Design dashboard UI",
      description: "Create Figma mockups for main dashboard",
      status: TaskStatus.pending,
      priority: TaskPriority.medium,
      workspaceId: "3f9a8f7b-2e4d-4c6a-a1b2-c5d6e7f8a9b0",
      createdById: "a1b2c3d4-e5f6-4a5b-9c8d-7e8f9a0b1c2d",
      createdAt: new Date("2024-02-14T14:30:00Z"),
      dueDate: new Date("2025-04-21T12:00:00Z"),
      priorityOrder: 2,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      title: "Database schema review",
      description: "Conduct performance review of current schema",
      status: TaskStatus.completed,
      priority: TaskPriority.medium,
      workspaceId: "8g9h0i1j-2k3l-4m5n-a6b7-c8d9e0f1a2b3",
      createdById: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
      createdAt: new Date("2024-02-10T08:45:00Z"),
      dueDate: new Date("2024-02-14T17:00:00Z"),
      priorityOrder: 3,
      assignees: [],
    },
  ];
}

export async function getTasksByWorkspaceId(
  workspaceId: string
): Promise<Task[]> {
  console.log(workspaceId);
  return [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      title: "Implement user authentication",
      description: "Create login/signup system with JWT tokens",
      status: TaskStatus.in_progress,
      priority: TaskPriority.high,
      workspaceId: "3f9a8f7b-2e4d-4c6a-a1b2-c5d6e7f8a9b0",
      createdById: "d83ff7a0-9b2c-4b8d-9e8a-c5d6e7f8a9b0",
      createdAt: new Date("2024-02-15T09:00:00Z"),
      dueDate: new Date("2025-04-10T18:00:00Z"),
      priorityOrder: 1,
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      title: "Design dashboard UI",
      description: "Create Figma mockups for main dashboard",
      status: TaskStatus.pending,
      priority: TaskPriority.medium,
      workspaceId: "3f9a8f7b-2e4d-4c6a-a1b2-c5d6e7f8a9b0",
      createdById: "a1b2c3d4-e5f6-4a5b-9c8d-7e8f9a0b1c2d",
      createdAt: new Date("2024-02-14T14:30:00Z"),
      dueDate: new Date("2025-04-21T12:00:00Z"),
      priorityOrder: 2,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      title: "Database schema review",
      description: "Conduct performance review of current schema",
      status: TaskStatus.completed,
      priority: TaskPriority.medium,
      workspaceId: "8g9h0i1j-2k3l-4m5n-a6b7-c8d9e0f1a2b3",
      createdById: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
      createdAt: new Date("2024-02-10T08:45:00Z"),
      dueDate: new Date("2024-02-14T17:00:00Z"),
      priorityOrder: 3,
      assignees: [],
    },
  ];
}
