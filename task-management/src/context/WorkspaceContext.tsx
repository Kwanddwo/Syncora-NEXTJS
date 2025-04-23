// context/WorkspacesContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Workspace } from "@/types";
import { fetchActiveWorkspaces } from "@/app/_api/WorkspacesAPIs";

type WorkspacesContextType = {
    workspaces: Workspace[];
    setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
};

const WorkspacesContext = createContext<WorkspacesContextType | null>(null);

export const WorkspacesProvider = ({ children }: { children: React.ReactNode }) => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

    useEffect(() => {
        const getWorkspaces = async () => {
            try {
                const data = await fetchActiveWorkspaces();
                setWorkspaces(data);
            } catch (error) {
                console.error("Failed to fetch workspaces:", error);
            }
        };
        getWorkspaces();
    }, []);

    return (
        <WorkspacesContext.Provider value={{ workspaces, setWorkspaces }}>
            {children}
        </WorkspacesContext.Provider>
    );
};

export const useWorkspaces = () => {
    const context = useContext(WorkspacesContext);
    if (!context) throw new Error("useWorkspaces must be used inside WorkspacesProvider");
    return context;
};
