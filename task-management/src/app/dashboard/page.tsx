import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashbordHeader from "./DashbordHeader";
import TodoTab from "./TodoTab";
import TaskTab from "./TaskTab";
import CalendarTab from "./CalendarTab";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashbordHeader />
        <div className="flex flex-1 flex-col gap-6 p-6">
          <Tabs defaultValue="kanban">
            <TabsList className="mb-4">
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TodoTab />
            <TaskTab />
            <CalendarTab />
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
