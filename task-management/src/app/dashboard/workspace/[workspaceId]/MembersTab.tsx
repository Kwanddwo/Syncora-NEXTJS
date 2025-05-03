"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useMembersByWorkspace } from "@/hooks/use-workspace";
import { useAuth } from "@/hooks/use-auth";
import { InviteDialog } from "./_MembersCRUDComponents/InviteMemberForm";
import AvatarUser from "@/components/Avatar-User";

export default function MembersTab({ workspaceId }: { workspaceId: string }) {
  const { currentUser } = useAuth();
  const { data: members } = useMembersByWorkspace(workspaceId);

  return (
    <TabsContent
      value="members"
      className="space-y-6 [&_td]:border-0 [&_th]:border-0"
    >
      <div>
        <h2 className="mb-4 text-xl font-bold">Members</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Name:</span>
              <Input className="h-8 w-24" placeholder="Text" />
              <span className="text-sm text-muted-foreground">Role:</span>
              <Input className="h-8 w-24" placeholder="Text" />
            </div>
          </div>

          <InviteDialog workspaceId={workspaceId} members={members} />

          <div className="space-y-2 pt-2">
            {members &&
              members.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <div className="flex items-center gap-2">
                    <AvatarUser
                        name={member.user.name}
                        lastName={member.user.lastName}
                        avatarUrl={member.user.avatarUrl}
                        height={10}
                        width={10}
                        borderSize={2}
                        hasBorder={true}
                    />
                    <div>
                      <div className="text-sm font-medium">
                        {member.user.name}
                        {member.user.id === currentUser?.id && " (You)"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {member.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Attributes...
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Permissions...
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
