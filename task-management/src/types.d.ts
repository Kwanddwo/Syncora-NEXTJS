export interface Task {
  id: string;
  title: string;
  dueDate?: string;
}

export interface Workspace {
  id: string;
  name: string;
  defaultOpen: boolean;
  tasks: Task[];
}
