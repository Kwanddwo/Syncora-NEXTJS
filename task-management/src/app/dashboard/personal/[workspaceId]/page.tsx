"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodoTab from "./PersonalKanbanBoard";
import TaskTab from "./PersonalTaskTab";
import CalendarTab from "./PersonalCalendarTab";
import { useParams } from 'next/navigation';
import { Task } from '@/lib/types';
import { getTasksByWorkspaceId } from '@/app/_api/TasksAPI';
import {useRecentWorkspacesContext} from "@/context/RecentWorkspacesContext";
import {toast} from "sonner";

function Page() {
   const params = useParams();
    const workspaceId = params.workspaceId as string;
    const [todos, setTodos] = useState<Task[]>([]);
    const {addRecentWorkspace} =useRecentWorkspacesContext();
    useEffect(()=>{
      const getTasks =async() =>{
        try{
          const response = await getTasksByWorkspaceId(workspaceId);
          setTodos(response)
        }catch(error){
          console.error(
              `Error fetching tasks for workspace ${workspaceId}:`,
              error
          );
          toast.error("Error fetching tasks for workspace");
        }
      };
      getTasks();
      addRecentWorkspace(workspaceId);
    },[workspaceId,addRecentWorkspace]);
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Tabs defaultValue="kanban">
        <TabsList className="mb-4">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TodoTab workspaceId={workspaceId} todos={todos} setTodos={setTodos} />
        <TaskTab workspaceId={workspaceId} todos={todos} setTodos={setTodos} />
        <CalendarTab />
      </Tabs>
    </div>
  );
}

export default Page