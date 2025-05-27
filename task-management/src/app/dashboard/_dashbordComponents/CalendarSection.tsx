import { Calendar } from "@/components/calendar";
import { Task } from "@/lib/types";
import React from "react";

function CalendarSection({
  todos,
  onMonthChange,
}: {
  todos: Task[];
  onMonthChange: (newMonth: Date) => void;
}) {
  return (
    <section id="calendar">
      <h2 className="mb-2 sm:mb-4 text-lg sm:text-xl font-bold">Calendar</h2>
      <div className="overflow-x-auto">
        <div className="min-w-[300px]">
          <Calendar todos={todos} onMonthChange={onMonthChange} />
        </div>
      </div>
    </section>
  );
}

export default CalendarSection;
