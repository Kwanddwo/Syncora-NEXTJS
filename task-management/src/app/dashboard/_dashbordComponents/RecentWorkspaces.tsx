"use client";
import { Card } from "@/components/ui/card";
import { ImageIcon, User } from "lucide-react";
import React from "react";
import AddWorkspaceDialog from "@/app/dashboard/_dashbordComponents/_workspaceCrudComponents/workspaceAddModalDialog";
import { useRecentWorkspacesContext } from "@/context/RecentWorkspacesContext";
import Link from "next/link";

function RecentWorkspaces() {
  const { recent } = useRecentWorkspacesContext();
  const personalWorkspaces = recent.filter(
    (item) => item.workspace.isPersonal == true
  );
  const publicWorkspaces = recent.filter(
    (item) => item.workspace.isPersonal == false
  );
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Recent Workspaces</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <AddWorkspaceDialog />

        {personalWorkspaces.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/workspace/${item.workspaceId}`}
            className="hover:no-underline"
          >
            <Card className="flex h-36 w-36 flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card cursor-pointer">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="mt-2 text-center text-muted-foreground">
                {item.workspace.name}
              </div>
            </Card>
          </Link>
        ))}
        {publicWorkspaces.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/workspace/${item.workspaceId}`}
            className="hover:no-underline"
          >
            <Card className="flex h-36 w-36 flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-card cursor-pointer">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="mt-2 text-center text-muted-foreground">
                {item.workspace.name}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecentWorkspaces;
