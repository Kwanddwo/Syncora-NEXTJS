import { Card } from '@/components/ui/card';
import { ImageIcon, User } from 'lucide-react';
import React from 'react'
import AddWorkspaceDialog from "@/app/dashboard/_dashbordComponents/_workspaceCrudComponents/workspaceAddModalDialog";

function RecentWorkspaces() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Recent Workspaces</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <Card className="flex h-36 w-36 flex-col items-center justify-center bg-green-500 text-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white cursor-pointer">
            <AddWorkspaceDialog/>
          </div>
          <div className="mt-2 text-center">Add/Join...</div>
        </Card>

        <Card className="flex h-36 w-36 flex-col items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 cursor-pointer">
            <User className="h-10 w-10 text-gray-500" />
          </div>
          <div className="mt-2 text-center text-gray-500">Personal</div>
        </Card>

        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="flex h-36 w-36 flex-col items-center justify-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-300 cursor-pointer">
              <ImageIcon className="h-10 w-10 text-gray-500" />
            </div>
            <div className="mt-2 text-center text-gray-500">Workspace</div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default RecentWorkspaces