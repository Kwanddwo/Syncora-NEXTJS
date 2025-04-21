"use client"
import React, { createContext, useContext, ReactNode } from 'react';
import { useRecentWorkspaces } from '@/hooks/useRecentWorkspaces';
import { RecentWorkspace } from '@/types';

interface RecentWorkspacesContextType {
    recent: RecentWorkspace[];
    addRecentWorkspace: (workspaceId: string) => void;
    deleteRecentWorkspace: (workspaceId: string) => void;
    clearRecent: () => void;
}

const RecentWorkspacesContext = createContext<RecentWorkspacesContextType | undefined>(undefined);

export function RecentWorkspacesProvider({ children }: { children: ReactNode }) {
    const recentWorkspacesHook = useRecentWorkspaces();

    return (
        <RecentWorkspacesContext.Provider value={{
            recent: recentWorkspacesHook.recent ?? [],
            addRecentWorkspace: recentWorkspacesHook.addRecentWorkspace,
            deleteRecentWorkspace: recentWorkspacesHook.deleteRecentWorkspace,
            clearRecent: recentWorkspacesHook.clearRecent,
        }}>
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