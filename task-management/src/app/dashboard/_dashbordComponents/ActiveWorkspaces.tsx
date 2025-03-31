import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, ImageIcon } from 'lucide-react';
import React from 'react'

function ActiveWorkspaces() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Active Workspaces</h2>
      <div className="space-y-2">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-200 p-3">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-4 w-4" />
              <ImageIcon className="h-5 w-5" />
              <span>Personal</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>Pay rent</div>
                <div className="text-sm text-gray-500">Due: Today</div>
              </div>
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>Talk to Johns</div>
                <div className="text-sm text-gray-500">Due: Tomorrow</div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex items-center justify-between rounded-md bg-gray-200 p-3">
          <div className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            <ImageIcon className="h-5 w-5" />
            <span>Project X</span>
          </div>
        </div>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-200 p-3">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-4 w-4" />
              <ImageIcon className="h-5 w-5" />
              <span>School</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div>Make report</div>
                <div className="text-sm text-gray-500">Due: Mar 28, 2025</div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
}

export default ActiveWorkspaces