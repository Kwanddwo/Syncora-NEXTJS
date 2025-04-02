"use client";

import { useEffect, useState } from "react";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  tasks?: Task[];
}

export function CalendarGrid({
  currentDate,
  selectedDate,
  onSelectDate,
  tasks,
}: CalendarGridProps) {
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    setCalendarDays(days);
  }, [currentDate]);

  const getTasksForDate = (date: Date) => {
    return tasks
      ? tasks.filter((task) => isSameDay(new Date(task.dueDate), date))
      : [];
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="grid grid-cols-7 gap-px border-b bg-muted">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-3 text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {calendarDays.map((day, i) => {
          const dayTasks = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = selectedDate
            ? isSameDay(day, selectedDate)
            : false;

          return (
            <div
              key={i}
              className={cn(
                "min-h-[100px] p-2 transition-colors hover:bg-muted/50",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isSelected && "bg-muted"
              )}
              onClick={() => onSelectDate(day)}
            >
              <div className="flex justify-between">
                <span className="text-sm font-medium">{format(day, "d")}</span>
                {dayTasks.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-1">
                    {dayTasks.length}
                  </Badge>
                )}
              </div>
              <div className="mt-1 space-y-1">
                {dayTasks.slice(0, 2).map((task, index) => (
                  <div
                    key={index}
                    className={cn(
                      "truncate rounded px-1 py-0.5 text-xs",
                      task.status === TaskStatus.pending &&
                        "bg-tag-neutral text-tag-neutral-foreground",
                      task.status === TaskStatus.in_progress &&
                        "bg-tag-blue text-tag-blue-foreground",
                      task.status === TaskStatus.completed &&
                        "bg-teg-green text-tag-green-foreground"
                    )}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayTasks.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
