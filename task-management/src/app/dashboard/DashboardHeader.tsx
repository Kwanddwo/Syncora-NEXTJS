import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { NotificationButton } from "@/components/notification-button";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Building } from "lucide-react";
import React from "react";

function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 justify-between items-center gap-2 border-b px-3">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 flex items-center gap-2">
                <Building className="h-5 w-5" />
                <span className="text-xl font-bold">Workspace</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <NotificationButton />
        <ModeToggle />
      </div>
    </header>
  );
}

export default DashboardHeader;
