-- CreateTable
CREATE TABLE "RecentWorkspace" (
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentWorkspace_pkey" PRIMARY KEY ("userId","workspaceId")
);

-- CreateIndex
CREATE INDEX "RecentWorkspace_viewedAt_idx" ON "RecentWorkspace"("viewedAt");

-- AddForeignKey
ALTER TABLE "RecentWorkspace" ADD CONSTRAINT "RecentWorkspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentWorkspace" ADD CONSTRAINT "RecentWorkspace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
