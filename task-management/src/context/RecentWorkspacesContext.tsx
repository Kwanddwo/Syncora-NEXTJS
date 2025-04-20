"use client"
import React, { createContext, useContext, ReactNode } from 'react';
import { useRecentWorkspaces } from '@/hooks/useRecentWorkspaces';
import { Workspace } from '@/types';

interface RecentWorkspacesContextType {
    recent: Workspace[];
    addRecentWorkspace: (workspaceId: string) => void;
    deleteRecentWorkspace: (workspaceId: string) => void;
    clearRecent: () => void;
}

const RecentWorkspacesContext = createContext<RecentWorkspacesContextType | undefined>(undefined);

export function RecentWorkspacesProvider({ children }: { children: ReactNode }) {
    const recentWorkspacesHook = useRecentWorkspaces();

    return (
        <RecentWorkspacesContext.Provider value={recentWorkspacesHook}>
            {children}
        </RecentWorkspacesContext.Provider>
    );
}

export function useRecentWorkspacesContext() {
    const context = useContext(RecentWorkspacesContext);
    if (context === undefined) {
        throw new Error('useRecentWorkspacesContext must be used within a RecentWorkspacesProvider');
    }
    return context;
}