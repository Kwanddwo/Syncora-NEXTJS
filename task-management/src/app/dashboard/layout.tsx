import React from 'react'
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashbordHeader from "./DashbordHeader";
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashbordHeader />
       {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout