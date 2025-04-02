import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { Plus, User } from "lucide-react";
import React from "react";
import { NewTaskDialog } from "./AddTaskForm";

function TaskTab() {
  const todos = [
    {
      id: "1",
      title: "Finish project documentation",
      due: "Today",
      assigne: "Person X",
      status: "Done",
      priority: "High",
    },
    {
      id: "2",
      title: "Review pull requests",
      due: "Tomorrow",
      assigne: "Person X",
      status: "On going",
      priority: "Low",
    },
    {
      id: "3",
      title: "Fix UI bugs in dashboard",
      due: "Friday",
      assigne: "Person X",
      status: "On going",
      priority: "High",
    },
    {
      id: "4",
      title: "Optimize database queries",
      due: "Friday",
      assigne: "Person X",
      status: "Done",
      priority: "Medium",
    },
    {
      id: "5",
      title: "Plan next sprint tasks",
      due: "Sunday",
      assigne: "Person X",
      status: "Done",
      priority: "Medium",
    },
  ];
  const status = [
    { title: "To Do", style: "bg-gray-100" },
    { title: "Done", style: "bg-green-100 text-green-800" },
    { title: "On going", style: "bg-blue-100 text-blue-800" },
  ];
  const priorities = [
    { title: "High", style: "bg-red-500 hover:bg-red-600" },
    { title: "Medium", style: "bg-yellow-500 hover:bg-yellow-600" },
    { title: "Low", style: "bg-blue-500 hover:bg-blue-600" },
  ];

  const getStatusStyle = (taskStatus: string) => {
    const foundStatus = status.find((s) => s.title === taskStatus);
    return foundStatus ? foundStatus.style : "bg-gray-100"; // Default style if not found
  };
  const getPriorityStyle = (taskPriority: string) => {
    const foundPriority = priorities.find((p) => p.title === taskPriority);
    return foundPriority ? foundPriority.style : "bg-gray-100"; // Default style if not found
  };
  return (
    <TabsContent value="tasks" className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Tasks</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assignee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell className="font-medium">{todo.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusStyle(todo.status)}
                      >
                        {todo.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityStyle(todo.priority)}>
                        {todo.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{todo.due}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <User className="h-4 w-4" /> {todo.assigne}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5}>
                    <NewTaskDialog />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

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

            <Button variant="outline" className="w-full justify-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Member...
            </Button>

            <div className="space-y-2 pt-2">
              {[
                { name: "Darrell Stewart", role: "Role", you: true },
                { name: "Dionne Russell", role: "Role" },
                { name: "Leslie Alexander", role: "Role" },
                { name: "Arlene McCoy", role: "Role" },
              ].map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32`}
                      />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">
                        {member.name} {member.you && "(You)"}
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
      </div>
    </TabsContent>
  );
}

export default TaskTab;
