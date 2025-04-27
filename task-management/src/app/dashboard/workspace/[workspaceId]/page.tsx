"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import KanbanBoard from "./KanbanBoard";
import TaskTab from "./TaskTab";
import CalendarTab from "./CalendarTab";
import MembersTab from "./MembersTab";
import { getTasksByWorkspaceId } from "@/app/_api/TasksAPI";
import { Task } from "@/lib/types";
import { useRecentWorkspacesContext } from "@/context/RecentWorkspacesContext";
import { toast } from "sonner";
import { useWorkspaces } from "@/context/WorkspaceContext";
import { notFound } from "next/navigation";

function Page() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const [todos, setTodos] = useState<Task[]>([]);
  const { addRecentWorkspace } = useRecentWorkspacesContext();
  const { workspaces, loading } = useWorkspaces();
  const isPersonal =
    workspaces.find((w) => w.id === workspaceId)?.isPersonal ?? false;

  useEffect(() => {
    let isWorkspace = false;
    if (!loading && workspaces.length > 0) {
      isWorkspace = !!workspaces.find((w) => w.id === workspaceId);
      if (!isWorkspace) {
        // This will show the 404 page
        notFound();
      }
    }
    const getTasks = async () => {
      try {
        const response = await getTasksByWorkspaceId(workspaceId);
        setTodos(response);
      } catch (error) {
        console.error(
          `Error fetching tasks for workspace ${workspaceId}:`,
          error
        );
        toast.error("Error fetching tasks for workspace:");
      }
    };
    if (!loading && isWorkspace) {
      getTasks();
      addRecentWorkspace(workspaceId);
    }
  }, [workspaces, workspaceId, loading]);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Tabs defaultValue="kanban">
        <TabsList className="mb-4">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          {!isPersonal && <TabsTrigger value="members">Members</TabsTrigger>}
        </TabsList>
        <KanbanBoard
          workspaceId={workspaceId}
          todos={todos.filter((todo) => !!todo.status)}
          setTodos={setTodos}
          isPersonal={isPersonal}
        />
        <TaskTab
          workspaceId={workspaceId}
          todos={todos}
          setTodos={setTodos}
          isPersonal={isPersonal}
        />
        {!isPersonal && <MembersTab workspaceId={workspaceId} />}
        <CalendarTab />
      </Tabs>
    </div>
  );
}
export default Page;
