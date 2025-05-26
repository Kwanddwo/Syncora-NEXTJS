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
      <h2 className="mb-4 text-xl font-bold">Calendar</h2>
      <Calendar todos={todos} onMonthChange={onMonthChange} />
    </section>
  );
}

export default CalendarSection;
