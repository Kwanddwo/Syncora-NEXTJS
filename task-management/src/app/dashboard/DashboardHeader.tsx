"use client"
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
import { LayoutDashboard, Mail } from "lucide-react";
import React from "react";
import { useProfile } from "@/context/ProfileContext";
import AvatarUser from "@/components/Avatar-User";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";

function DashboardHeader() {
  const { userDetailsState } = useProfile();

  return (
      <header className="flex h-14 shrink-0 justify-between items-center gap-2 border-b px-3">
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-xl font-bold">Dashboard</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <HoverCard>
            <HoverCardTrigger>
              <div className="cursor-pointer">
                <AvatarUser
                    name={userDetailsState.name}
                    lastName={userDetailsState.lastName}
                    avatarUrl={userDetailsState.avatarUrl}
                    height={8}
                    width={8}
                    borderSize={2}
                    hasBorder={false}
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <AvatarUser
                      name={userDetailsState.name}
                      lastName={userDetailsState.lastName}
                      avatarUrl={userDetailsState.avatarUrl}
                      height={8}
                      width={8}
                      borderSize={2}
                      hasBorder={false}
                  />
                  <div>
                    <h4 className="text-sm font-semibold">{userDetailsState.name} {userDetailsState.lastName}</h4>
                    {userDetailsState.email && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {userDetailsState.email}
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <NotificationButton />
          <ModeToggle />
        </div>
      </header>
  );
}

export default DashboardHeader;