"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import KanbanBoard from "./KanbanBoard";
import TaskTab from "./TaskTab";
import CalendarTab from "./CalendarTab";
import MembersTab from "./MembersTab";
import { getTasksByWorkspaceId } from "@/app/_api/TasksAPI";
import { Task, WorkspaceMember } from "@/lib/types";
import { useRecentWorkspacesContext } from "@/context/RecentWorkspacesContext";
import { toast } from "sonner";
import { useWorkspaces } from "@/context/WorkspaceContext";
import { AxiosError } from "axios";
import { fetchMembersFromWorkspace } from "@/app/_api/WorkspacesAPIs";
import { Workspace } from "@/types";

function Page() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const [todos, setTodos] = useState<Task[]>([]);
  const { addRecentWorkspace } = useRecentWorkspacesContext();
  const { workspaces, loading } = useWorkspaces();
  const [notFoundError, setNotFoundError] = useState(false);
  const [forbiddenError, setForbiddenError] = useState(false);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [workspace, setWorkspace] = useState<Workspace | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const found = workspaces.find((w) => w.id === workspaceId);
      setWorkspace(found);

      if (!found && workspaces.length > 0) {
        setNotFoundError(true);
      }
    }
  }, [workspaces, workspaceId, loading]);

  useEffect(() => {
    const getWorkspaceMembers = async () => {
      try {
        if (notFoundError || forbiddenError) return;

        const response = await fetchMembersFromWorkspace(workspaceId);
        setMembers(response);
      } catch (e) {
        const error = e as AxiosError<{ message: string }>;
        if (error.response?.status === 403) {
          setForbiddenError(true);
          toast.error("You are not authorized to access this workspace.");
        } else if (error.response?.status === 404) {
          setNotFoundError(true);
          toast.error("Workspace not found.");
        } else {
          toast.error("Failed to fetch workspace members.");
        }
      }
    };

    if (!loading && workspaceId && !notFoundError && !forbiddenError) {
      getWorkspaceMembers();
    }
  }, [workspaceId, loading, notFoundError, forbiddenError]);

  useEffect(() => {
    const getTasks = async () => {
      setIsLoading(true);
      try {
        if (notFoundError || forbiddenError) return;

        const response = await getTasksByWorkspaceId(workspaceId);
        setTodos(response);
        addRecentWorkspace(workspaceId);
      } catch (e) {
        const error = e as AxiosError<{ message: string }>;
        if (error.response?.status === 403) {
          setForbiddenError(true);
          toast.error("You are not authorized to access this workspace.");
        } else if (error.response?.status === 404) {
          setNotFoundError(true);
          toast.error("Workspace not found.");
        } else {
          console.error(
            `Error fetching tasks for workspace ${workspaceId}:`,
            e
          );
          toast.error("Error fetching tasks for workspace.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && workspaceId && !notFoundError && !forbiddenError) {
      getTasks();
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [workspaceId, loading, addRecentWorkspace, notFoundError, forbiddenError]);

  const isPersonal = workspace?.isPersonal ?? false;

  if (loading || isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-gray-500">Loading workspace...</p>
      </div>
    );
  }

  if (notFoundError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-lg text-gray-600">Workspace not found</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check the URL or go back to your dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (forbiddenError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
          <p className="text-lg text-gray-600">
            You are not authorized to access this workspace.
          </p>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-lg text-gray-600">Workspace not found</p>
          <p className="text-sm text-gray-500 mt-2">
            Please check the URL or go back to your dashboard.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-3 sm:gap-6 p-2 sm:p-4 md:p-6">
      <Tabs defaultValue="kanban">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-4 w-full min-w-[300px]">
            <TabsTrigger value="kanban" className="text-xs sm:text-sm">
              Kanban Board
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs sm:text-sm">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs sm:text-sm">
              Calendar
            </TabsTrigger>
            {!isPersonal && (
              <TabsTrigger value="members" className="text-xs sm:text-sm">
                Members
              </TabsTrigger>
            )}
          </TabsList>
        </div>
        <KanbanBoard
          workspaceId={workspaceId}
          todos={todos}
          setTodos={setTodos}
          isPersonal={isPersonal}
        />
        <TaskTab
          workspaceId={workspaceId}
          todos={todos}
          members={members}
          setTodos={setTodos}
          isPersonal={isPersonal}
        />
        {!isPersonal && (
          <MembersTab
            workspace={workspace}
            setWorkspace={setWorkspace}
            members={members}
            setMembers={setMembers}
          />
        )}
        <CalendarTab todos={todos} />
      </Tabs>
    </div>
  );
}

export default Page;
