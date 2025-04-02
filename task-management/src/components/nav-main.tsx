"use client";

import { ChevronRight, Plus, type LucideIcon } from "lucide-react";
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

type WorkspaceItem = {
  name: string;
  url: string;
  active?: boolean;
};

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  badge?: string;
  hasDropdown?: boolean;
  dropdownItems?: WorkspaceItem[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeWorkspaces, setActiveWorkspaces] = useState<
    Record<string, boolean>
  >(
    items.reduce(
      (acc, item) => {
        if (item.hasDropdown && item.dropdownItems) {
          item.dropdownItems.forEach((di) => {
            acc[di.name] = !!di.active;
          });
        }
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleWorkspaceClick = (name: string) => {
    setActiveWorkspaces((prev) => {
      const newState = { ...prev };
      // Set all to false
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      // Set the clicked one to true
      newState[name] = true;
      return newState;
    });
  };

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          {item.hasDropdown ? (
            <Collapsible
              open={openItems[item.title] || false}
              className="group/collapsible"
            >
              <CollapsibleTrigger
                asChild
                onClick={() => toggleItem(item.title)}
              >
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.title}</span>
                  <ChevronRight
                    className={`ml-auto h-4 w-4 transition-transform ${openItems[item.title] ? "rotate-90" : ""}`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <SidebarMenuAction showOnHover>
                <Plus />
              </SidebarMenuAction>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.dropdownItems?.map((workspace) => (
                    <SidebarMenuSubItem key={workspace.name}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={activeWorkspaces[workspace.name]}
                        onClick={() => handleWorkspaceClick(workspace.name)}
                      >
                        <a href={workspace.url}>
                          <span>{workspace.name}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
