import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import DashbordHeader from "./DashbordHeader";
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <DashbordHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </ReactQueryProvider>
    </>
  );
}

export default MainLayout;
