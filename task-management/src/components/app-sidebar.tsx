"use client";
import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import * as React from "react";
import Logo from "./Logo";
import {
  Building,
  Calendar,
  LayoutDashboard,
  LogOut,
  Search,
  Settings2,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useWorkspaces } from "@/context/WorkspaceContext";


const data = {
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Dashbord",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "My Workspaces",
      url: "/dashboard/workspace",
      icon: Building,
      hasDropdown: true,
      dropdownItems: [] as { name: string; url: string; active: boolean }[],
    },
    {
      title: "Personal",
      url: "/dashboard/personal",
      icon: User,
      hasDropdown: true,
      dropdownItems: [] as { name: string; url: string; active: boolean }[],
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOut,
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {workspaces} = useWorkspaces();
  const publicWorkspaces = workspaces.filter((workspace) => workspace.isPersonal == false);
  const personalWorkspaces = workspaces.filter((workspace) => workspace.isPersonal == true);
  const updatedNavMain = React.useMemo(() => {
    return data.navMain.map((item) => {
      if (item.hasDropdown && item.title == "My Workspaces") {
        item.dropdownItems = publicWorkspaces.map((workspace) => ({
          name: workspace.name,
          url: `/dashboard/workspace/${workspace.id}`,
          active: workspace.id === "someDefaultWorkspaceId", 
        }));
      }
      if (item.hasDropdown && item.title == "Personal") {
        item.dropdownItems = personalWorkspaces.map((workspace) => ({
          name: workspace.name,
          url: `/dashboard/personal/${workspace.id}`,
          active: workspace.id === "someDefaultWorkspaceId",
        }));
      }
      return item;
    });
  }, [personalWorkspaces,publicWorkspaces]);
  
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Logo isText={true} width={100} hasBottomGutter={true} />
        </div>
        <NavMain items={updatedNavMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
