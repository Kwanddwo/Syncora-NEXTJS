import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Custom skeleton with higher opacity
function HigherOpacitySkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return <Skeleton className={cn("opacity-70", className)} {...props} />;
}

export default function SkeletonDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Recent Workspaces */}
      <div className="space-y-4">
        <HigherOpacitySkeleton className="h-8 w-48" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {/* Workspace Cards */}
          {[1, 2, 3, 4, 5].map((i) => (
            <HigherOpacitySkeleton
              key={i}
              className="flex-shrink-0 w-[120px] h-[140px] rounded-xl"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your tasks for today */}
        <div className="space-y-4">
          <HigherOpacitySkeleton className="h-8 w-48" />
          <HigherOpacitySkeleton className="h-[200px] w-full rounded-lg" />
        </div>

        {/* Active Workspaces */}
        <div className="space-y-4">
          <HigherOpacitySkeleton className="h-8 w-48" />
          <div className="space-y-2">
            <HigherOpacitySkeleton className="h-[80px] w-full rounded-lg" />
            <HigherOpacitySkeleton className="h-[50px] w-full rounded-lg" />
            <HigherOpacitySkeleton className="h-[80px] w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="space-y-4">
        <HigherOpacitySkeleton className="h-8 w-48" />
        <HigherOpacitySkeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  );
}
