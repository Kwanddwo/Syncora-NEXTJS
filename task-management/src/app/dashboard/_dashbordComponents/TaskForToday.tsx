import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";

function TaskForToday() {
  const tasks = [
    { id: "1", title: "Throw Trash", status: "To do", priority: "Medium" },
    { id: "2", title: "Pay Rent", status: "Done", priority: "Low" },
    { id: "3", title: "Make report", status: "On going", priority: "High" },
    { id: "4", title: "Make Cake", status: "On going", priority: "High" },
    { id: "5", title: "Chill", status: "On going", priority: "High" },
    { id: "6", title: "Sleep", status: "On going", priority: "High" },
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


  const getStatusStyle = (taskStatus:string) => {
    const foundStatus = status.find((s) => s.title === taskStatus);
    return foundStatus ? foundStatus.style : "bg-gray-100"; // Default style if not found
  };
  const getPriorityStyle = (taskPriority: string) => {
    const foundStatus = priorities.find((p) => p.title === taskPriority);
    return foundStatus ? foundStatus.style : "bg-gray-100"; // Default style if not found
  };
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Your tasks for today</h2>
      <div className="rounded-md border">
        <ScrollArea className="h-40">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      <Badge
                          variant="outline"
                          className={getStatusStyle(task.status)}
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityStyle(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
        </Table>
      </ScrollArea>
      </div>
    </section>
  );
}

export default TaskForToday;
