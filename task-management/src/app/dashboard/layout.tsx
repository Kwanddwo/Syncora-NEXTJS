import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import DashboardHeader from "./DashboardHeader";
import ProtectedPage from "@/components/ProtectedPage";
import { WorkspacesProvider } from "@/context/WorkspaceContext";
import { RecentWorkspacesProvider } from "@/context/RecentWorkspacesContext";
import { InboxProvider } from "@/context/InboxContext";
import {ProfileProvider} from "@/context/ProfileContext";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtectedPage>
        <ReactQueryProvider>
          <SidebarProvider>
            <WorkspacesProvider>
              <InboxProvider>
                <RecentWorkspacesProvider>
                  <ProfileProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <DashboardHeader />
                    {children}
                  </SidebarInset>
                  </ProfileProvider>
                </RecentWorkspacesProvider>
              </InboxProvider>
            </WorkspacesProvider>
          </SidebarProvider>
        </ReactQueryProvider>
      </ProtectedPage>
    </>
  );
}

export default MainLayout;
