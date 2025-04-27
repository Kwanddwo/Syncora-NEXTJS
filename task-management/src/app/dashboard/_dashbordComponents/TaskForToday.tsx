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

function TaskForToday() {
  const tasks = [
    { id: "1", title: "Throw Trash", status: "pending", priority: "medium" },
    { id: "2", title: "Pay Rent", status: "completed", priority: "low" },
    { id: "3", title: "Make report", status: "in_progress", priority: "high" },
  ];
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
      <h2 className="mb-4 text-xl font-bold">Your tasks for today</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent">
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
      </div>
    </section>
  );
}

export default TaskForToday;
