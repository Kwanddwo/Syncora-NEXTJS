import { useEffect, useState } from "react";
import {Workspace} from "@/types";
import {useWorkspaces} from "@/context/WorkspaceContext";

export function useRecentWorkspaces() {
    const [recent, setRecent] = useState<Workspace[]>([]);
    const {workspaces} =useWorkspaces();

    useEffect(() => {
        const stored = localStorage.getItem("recentWorkspaces");
        if (stored) setRecent(JSON.parse(stored));
    }, []);

    const addRecentWorkspace = (workspaceId : string) => {
        const workspace = workspaces.find((w) => w.id === workspaceId);
        if (!workspace) return;
        setRecent((prev) => {
            const updated = [
                workspace,
                ...prev.filter((w) => w.id !== workspace.id),
            ].slice(0, 10);

            localStorage.setItem("recentWorkspaces", JSON.stringify(updated));
            return updated;
        });
    };

    const clearRecent = () => {
        setRecent([]);
        localStorage.removeItem("recentWorkspaces");
    };

    return { recent, addRecentWorkspace, clearRecent };
}
