import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import DashbordHeader from "./DashbordHeader";
import ProtectedPage from "@/components/ProtectedPage";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtectedPage>
        <ReactQueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <DashbordHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ReactQueryProvider>
      </ProtectedPage>
    </>
  );
}

export default MainLayout;
