import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TabsContent } from '@/components/ui/tabs';
import { MoreVertical } from 'lucide-react';
import React from 'react'

function CalendarTab() {
  return (
    <TabsContent value="calendar" className="space-y-6">
      <h2 className="mb-4 text-xl font-bold">Calendar</h2>
      <div className="rounded-md border">
        <div className="grid grid-cols-7 border-b">
          {["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"].map((day) => (
            <div
              key={day}
              className="border-r p-2 text-center text-sm font-medium last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {[
            { day: 29, month: "prev" },
            { day: 30, month: "prev" },
            { day: 31, month: "prev" },
            {
              day: 1,
              events: [
                { title: "Do stuff", category: "Personal" },
                { title: "Implement Feature", category: "Project X" },
                { title: "Write Report", category: "School" },
              ],
            },
            { day: 2 },
            { day: 3 },
            { day: 4 },
            { day: 5 },
            { day: 6 },
            { day: 7 },
            { day: 8 },
            {
              day: 9,
              events: [{ title: "Rendez-vous", hasMenu: true }],
            },
            { day: 10 },
            { day: 11 },
            { day: 12 },
            { day: 13 },
            { day: 14 },
            { day: 15 },
            { day: 16 },
            { day: 17 },
            { day: 18 },
            { day: 19 },
            { day: 20 },
            { day: 21 },
            { day: 22 },
            { day: 23 },
            { day: 24 },
            { day: 25 },
            { day: 26 },
            { day: 27 },
            { day: 28 },
            { day: 29 },
            { day: 30 },
            { day: 31 },
            { day: 1, month: "next" },
          ].map((date, i) => (
            <div
              key={i}
              className={`min-h-[100px] border-r border-b p-1 last:border-r-0 ${
                date.month ? "text-muted-foreground" : ""
              }`}
            >
              <div className="p-1 text-sm">{date.day}</div>
              {date.events?.map((event, j) => (
                <div
                  key={j}
                  className="mb-1 rounded bg-white p-1 text-xs shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span>{event.title}</span>
                    {event.hasMenu ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  {event.category && (
                    <div className="text-xs text-muted-foreground">
                      {event.category}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </TabsContent>
  );
}

export default CalendarTab