// context/WorkspacesContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Workspace } from "@/types";
import { fetchWorkspacesAPI } from "@/app/_api/WorkspacesAPIs";

type WorkspacesContextType = {
  workspaces: Workspace[];
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  loading: boolean;
  refreshWorkspaces: () => Promise<void>;
};

const WorkspacesContext = createContext<WorkspacesContextType | null>(null);

export const WorkspacesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const getWorkspaces = async () => {
    try {
      const data = await fetchWorkspacesAPI();
      setWorkspaces(data);
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    }
  };
  useEffect(() => {
    getWorkspaces();
    setLoading(false);
  }, []);
  const refreshWorkspaces = async () => {
    return getWorkspaces();
  };

  return (
    <WorkspacesContext.Provider
      value={{ workspaces, setWorkspaces, loading, refreshWorkspaces }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspaces = () => {
  const context = useContext(WorkspacesContext);
  if (!context)
    throw new Error("useWorkspaces must be used inside WorkspacesProvider");
  return context;
};
