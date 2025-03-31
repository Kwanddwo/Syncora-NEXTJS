"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, ImageIcon } from "lucide-react";
import React, { useState } from "react";
interface OpenStates {
  [key: string]: boolean;
}
function ActiveWorkspaces() {
  const workspaces = [
    {
      id: "1",
      name: "Personal",
      tasks: ["Pay rent", "Talk to Johns"],
      defaultOpen: false,
    },
    { id: "2", name: "Project X", tasks: ["Chill Out"], defaultOpen: false },
    { id: "3", name: "School", tasks: ["Make report"], defaultOpen: true },
  ];

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
              className="flex w-full items-center justify-between rounded-md bg-gray-200 p-3"
              onClick={() => toggleWorkspace(workspace.id)}
            >
              <div className="flex items-center gap-2">
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${openStates[workspace.id] ? "rotate-90" : ""}`}
                />
                <ImageIcon className="h-5 w-5" />
                <span>{workspace.name}</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {workspace.tasks.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {workspace.tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div>{task}</div>
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
