import { useEffect, useState, useCallback } from "react";
import { RecentWorkspace } from "@/types";
import {
  clearRecentWorkspaceAPI,
  createRecentWorkspaceAPI,
  deleteRecentWorkspaceAPI,
  getRecentWorkspaceAPI,
} from "@/app/_api/RecentWorkspacesAPIs";

import { useAuth } from "@/hooks/use-auth";

export function useRecentWorkspaces() {
  const { currentUser: user } = useAuth();
  const [recent, setRecent] = useState<RecentWorkspace[]>([]);
  useEffect(() => {
    const recentWorkspaces = async () => {
      try {
        if (!user) {
          console.error("User is not authenticated");
          return;
        }
        const response = await getRecentWorkspaceAPI(user.id);
        if (response) {
          setRecent(response);
        } else {
          throw new Error("Failed to fetch recent workspaces");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
        console.error("Failed to fetch recent workspaces:", error);
      }
    };
    recentWorkspaces();
  }, [user]);

  const addRecentWorkspace = useCallback(
    async (workspaceId: string) => {
      if (!workspaceId) {
        console.error("Workspace ID is required");
        return;
      }
      try {
        if (!user) {
          console.error("User is not authenticated");
          return;
        }
        const res = await createRecentWorkspaceAPI(workspaceId, user.id);

        if (!res) {
          console.error("No response from API");
          return;
        }
        if (res.status === 201) {
          setRecent((prev) => {
            const isWorkspaceExist = prev.some(
              (workspace) =>
                workspace.userId === res.data.userId &&
                workspace.workspaceId === res.data.workspaceId
            );
            return isWorkspaceExist
              ? prev
              : [...prev, res.data as RecentWorkspace];
          });
          console.log("Recent workspace created:", res.data);
          console.log("Recent workspace updated:", recent);
        } else if (res.status === 200) {
          console.log("Workspace already exists in recent:", res.data.message);
        } else {
          console.warn("Unexpected response:", res.status, res.data);
        }
      } catch (err: any) {
        if (err.response) {
          console.error(
            "Backend error:",
            err.response.status,
            err.response.data
          );
        } else {
          console.error("Request failed:", err.message);
        }
      }
    },
    [recent, user]
  );

  const deleteRecentWorkspace = useCallback(
    async (workspaceId: string) => {
      console.log(`Deleting workspace ${workspaceId} from recent list`);
      try {
        if (!user) {
          console.error("User is not authenticated");
          return;
        }
        const res = await deleteRecentWorkspaceAPI(workspaceId, user.id);
        if (!res) {
          console.error("No response from API");
          return;
        }
        setRecent((prev) => prev?.filter((w) => w.workspaceId !== workspaceId));
      } catch (error) {
        console.error("Failed to delete recent workspace:", error);
      }
    },
    [user]
  );

  const clearRecent = useCallback(async () => {
    try {
      if (!user) {
        console.error("User is not authenticated");
        return;
      }
      const res = await clearRecentWorkspaceAPI(user.id);
      if (!res) {
        console.error("No response from API");
        return;
      }
      if (res.status === 200) {
        setRecent([]);
      } else if (res.status === 400) {
        console.log("User Id is required", res.data.error);
      } else if (res.status === 500) {
        console.log("Failed to clear recent workspaces", res.data.error);
      }
    } catch (error) {
      console.error("Failed to clear recent workspaces:", error);
    }
  }, [user]);

  return { recent, addRecentWorkspace, deleteRecentWorkspace, clearRecent };
}
