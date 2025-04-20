import { useEffect, useState, useCallback } from "react";
import { Workspace } from "@/types";
import { useWorkspaces } from "@/context/WorkspaceContext";

export function useRecentWorkspaces() {
    const [recent, setRecent] = useState<Workspace[]>(() => {
        try {
            const stored = localStorage.getItem("recentWorkspaces");
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to parse recent workspaces:", error);
            return [];
        }
    });
    const { workspaces } = useWorkspaces();
    useEffect(() => {
        console.log("Recent workspaces state updated:", recent);
    }, [recent]);

    const addRecentWorkspace = useCallback((workspaceId: string) => {
        console.log(`Adding workspace ${workspaceId} to recent list`);

        const workspace = workspaces.find((w) => w.id === workspaceId);
        if (!workspace) {
            console.warn(`Workspace with ID ${workspaceId} not found in`, workspaces);
            return;
        }

        setRecent(prevRecent => {
            console.log("Previous recent:", prevRecent);
            const updated = [
                workspace,
                ...prevRecent.filter((w) => w.id !== workspace.id),
            ].slice(0, 5);
            try {
                localStorage.setItem("recentWorkspaces", JSON.stringify(updated));
            } catch (error) {
                console.error("Failed to save recent workspaces:", error);
            }

            return updated;
        });
    }, [workspaces]);

    const deleteRecentWorkspace = useCallback((workspaceId: string) => {
        console.log(`Deleting workspace ${workspaceId} from recent list`);
        setRecent(prevRecent => {
            const updated = prevRecent.filter((w) => w.id !== workspaceId);
            try {
                localStorage.setItem("recentWorkspaces", JSON.stringify(updated));

                console.log("After deletion - previous:", prevRecent);
                console.log("After deletion - updated:", updated);
            } catch (error) {
                console.error("Failed to save after deletion:", error);
            }
            return updated;
        });
    }, []);

    const clearRecent = useCallback(() => {
        setRecent([]);
        try {
            localStorage.removeItem("recentWorkspaces");
        } catch (error) {
            console.error("Failed to clear recent workspaces:", error);
        }
    }, []);

    return { recent, addRecentWorkspace, deleteRecentWorkspace, clearRecent };
}