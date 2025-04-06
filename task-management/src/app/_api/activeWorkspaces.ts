import axios from "axios";

const WORKSPACES_API = "http://localhost:3001/api/workspace/workspaces";
const TASKS_API = "http://localhost:3001/api/task/tasks";

interface Task {
  id: string;
  title: string;
}

interface Workspace {
  id: string;
  name: string;
  defaultOpen: boolean;
  tasks: Task[];
}

// Function to fetch tasks for a given workspace ID
export const fetchTasksForWorkspace = async (
  workspaceId: string
): Promise<Task[]> => {
  try {
    const response = await axios.post(TASKS_API, { workspaceId: workspaceId });
    return response.data; // Assuming the API returns an array of tasks
  } catch (error) {
    console.error(`Error fetching tasks for workspace ${workspaceId}:`, error);
    return []; // Return empty tasks if API fails
  }
};

// Main function to fetch workspaces with their tasks
export const fetchActiveWorkspaces = async (): Promise<Workspace[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(WORKSPACES_API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const workspacesData = response.data as Workspace[];

    // Fetch tasks for each workspace
    const workspacesWithTasks = await Promise.all(
      workspacesData.map(async (workspace) => {
        const tasks = await fetchTasksForWorkspace(workspace.id);
        return { ...workspace, defaultOpen: false, tasks };
      })
    );

    return workspacesWithTasks;
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return [];
  }
};

export const fetchMembersByWorkspaceId = async (workspaceId: string) => {
  if (!workspaceId || typeof workspaceId !== "string") {
    throw new Error("Invalid workspaceId: It must be a non-empty string.");
  }

  try {
    const res = await axios.post(
      "http://localhost:3001/api/workspace/members",
      {
        workspaceId,
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch workspace members."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while fetching workspace members."
      );
    }
  }
};
