"use client";

import { format, isSameDay } from "date-fns";
import { Calendar, Clock } from "lucide-react";

import { Task, TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskListProps {
  selectedDate: Date | null;
  tasks?: Task[];
}

export function TaskList({ selectedDate, tasks }: TaskListProps) {
  if (!selectedDate) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select a date to view tasks
          </p>
        </CardContent>
      </Card>
    );
  }

  const dayTasks = tasks
    ? tasks
        .filter((task) => isSameDay(new Date(task.dueDate), selectedDate))
        .sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        )
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
      </CardHeader>
      <CardContent>
        {dayTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tasks scheduled for this day
          </p>
        ) : (
          <div className="space-y-4">
            {dayTasks.map((task, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-lg border p-3",
                  task.status === TaskStatus.pending &&
                    "bg-tag-neutral text-tag-neutral-foreground",
                  task.status === TaskStatus.in_progress &&
                    "bg-tag-blue text-tag-blue-foreground",
                  task.status === TaskStatus.completed &&
                    "bg-teg-green text-tag-green-foreground"
                )}
              >
                <h3 className="font-medium">{task.title}</h3>
                <div className="mt-2 flex flex-col space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    {/* This might be wrong, this was for events where there would be a start and end time */}
                    <span>{format(new Date(task.dueDate), "h:mm a")}</span>
                    {task.dueDate && (
                      <span> - {format(new Date(task.dueDate), "h:mm a")}</span>
                    )}
                  </div>
                  {task.workspaceId && (
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      <span>{task.workspaceId}</span>
                    </div>
                  )}
                </div>
                {task.description && (
                  <p className="mt-2 text-sm">{task.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
