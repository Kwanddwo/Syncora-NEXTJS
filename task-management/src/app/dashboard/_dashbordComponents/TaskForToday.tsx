import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/lib/types";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

function TaskForToday({ todos }: { todos: Task[] }) {
  const tasks = todos;
  const status = [
    { title: "pending", style: "bg-tag-neutral text-tag-neutral-foreground" },
    { title: "in_progress", style: "bg-tag-blue text-tag-blue-foreground" },
    { title: "completed", style: "bg-tag-green text-tag-green-foreground" },
  ];

  const priorities = [
    {
      value: "high",
      label: "High",
      style: "bg-tag-red hover:bg-tag-red text-tag-red-foreground",
    },
    {
      value: "medium",
      label: "Medium",
      style: "bg-tag-yellow hover:bg-tag-yellow text-tag-yellow-foreground",
    },
    {
      value: "low",
      label: "Low",
      style: "bg-tag-blue hover:bg-tag-blue text-tag-blue-foreground",
    },
  ];

  const getStatusStyle = (taskStatus: string) => {
    console.log(taskStatus);
    console.log(status);
    const foundStatus = status.find((s) => s.title === taskStatus);
    return foundStatus ? foundStatus.style : "bg-tag-red"; // Default style if not found
  };
  const getPriorityStyle = (taskPriority: string) => {
    const foundStatus = priorities.find((p) => p.value === taskPriority);
    return foundStatus ? foundStatus.style : "bg-tag-red"; // Default style if not found
  };
  return (
    <section>
      <h2 className="mb-2 sm:mb-4 text-lg sm:text-xl font-bold">
        Your tasks for today
      </h2>
      {tasks && tasks.length !== 0 ? (
        <div className="rounded-md border">
          <ScrollArea className="h-40 sm:h-48">
            <Table>
              <TableHeader>
                {" "}
                <TableRow className="bg-accent">
                  <TableHead className="py-2">Title</TableHead>
                  <TableHead className="py-2 hidden sm:table-cell">
                    Status
                  </TableHead>
                  <TableHead className="py-2">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium py-2 text-xs sm:text-sm">
                      <div className="flex flex-col">
                        {task.title}
                        <span className="sm:hidden mt-1">
                          <Badge
                            variant="outline"
                            className={getStatusStyle(task.status)}
                          >
                            {task.status}
                          </Badge>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 hidden sm:table-cell">
                      <Badge
                        variant="outline"
                        className={getStatusStyle(task.status)}
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2">
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
      ) : (
        <div className="flex w-full items-center justify-center p-3 sm:p-6 text-base sm:text-lg font-semibold text-muted-foreground">
          No tasks for today
        </div>
      )}
    </section>
  );
}
export default TaskForToday;
