"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, ImageIcon, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { useWorkspaces } from "@/context/WorkspaceContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteWorkspaceAlert from "@/app/dashboard/_dashbordComponents/_workspaceCrudComponents/workspaceDeleteAlert";

import { useAuth } from "@/hooks/use-auth";

interface OpenStates {
  [key: string]: boolean;
}
function ActiveWorkspaces() {
  const { workspaces } = useWorkspaces();
  const { currentUser: user } = useAuth();
  const [openStates, setOpenStates] = useState(
    workspaces.reduce((acc: OpenStates, workspace) => {
      acc[workspace.id] = workspace.defaultOpen;
      return acc;
    }, {})
  );

  const toggleWorkspace = (id: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Active Workspaces</h2>
      <div className="space-y-2">
        {workspaces.map((workspace) => (
          <Collapsible
            key={workspace.id}
            defaultOpen={workspace.defaultOpen}
            open={openStates[workspace.id]}
            onOpenChange={(open) =>
              setOpenStates((prev) => ({ ...prev, [workspace.id]: open }))
            }
          >
            <CollapsibleTrigger
              className="flex w-full items-center justify-between rounded-md bg-background p-3"
              onClick={() => toggleWorkspace(workspace.id)}
            >
              <div className="flex items-center gap-2">
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${openStates[workspace.id] ? "rotate-90" : ""}`}
                />
                <ImageIcon className="h-5 w-5" />
                <span>{workspace.name}</span>
              </div>
              {workspace.ownerId === user?.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="focus:outline-none"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-tag-destructive focus:text-tag-destructive"
                      asChild
                    >
                      <DeleteWorkspaceAlert workspaceId={workspace.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              {workspace.tasks?.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {workspace.tasks?.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div>{task.title}</div>
                      <div className="text-sm text-gray-500">Due: Soon</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="p-3 text-sm text-gray-500">No tasks available.</p>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </section>
  );
}

export default ActiveWorkspaces;
