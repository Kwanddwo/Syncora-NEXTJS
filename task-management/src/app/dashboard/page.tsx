
import {
  ChevronDown,
  ChevronRight,
  ImageIcon,
  MoreVertical,
  Plus,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
        <div className="flex flex-1 flex-col gap-8 p-6">
          {/* Recent Workspaces */}
          <section>
            <h2 className="mb-4 text-xl font-bold">Recent Workspaces</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              <Card className="flex h-36 w-36 flex-col items-center justify-center bg-green-500 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white">
                  <Plus className="h-8 w-8" />
                </div>
                <div className="mt-2 text-center">Add/Join...</div>
              </Card>

              <Card className="flex h-36 w-36 flex-col items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <div className="mt-2 text-center text-gray-500">Personal</div>
              </Card>

              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  className="flex h-36 w-36 flex-col items-center justify-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-300">
                    <ImageIcon className="h-10 w-10 text-gray-500" />
                  </div>
                  <div className="mt-2 text-center text-gray-500">
                    Workspace
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Your tasks for today */}
            <section>
              <h2 className="mb-4 text-xl font-bold">Your tasks for today</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Throw Trash</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-100">
                          To do
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          Medium
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pay rent</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          Done
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          Low
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Make report</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800"
                        >
                          Ongoing
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-red-500 hover:bg-red-600">
                          High
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Active Workspaces */}
            <section>
              <h2 className="mb-4 text-xl font-bold">Active Workspaces</h2>
              <div className="space-y-2">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-200 p-3">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4" />
                      <ImageIcon className="h-5 w-5" />
                      <span>Personal</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div>Pay rent</div>
                        <div className="text-sm text-gray-500">Due: Today</div>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div>Talk to Johns</div>
                        <div className="text-sm text-gray-500">
                          Due: Tomorrow
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex items-center justify-between rounded-md bg-gray-200 p-3">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <ImageIcon className="h-5 w-5" />
                    <span>Project X</span>
                  </div>
                </div>

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-200 p-3">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4" />
                      <ImageIcon className="h-5 w-5" />
                      <span>School</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div>Make report</div>
                        <div className="text-sm text-gray-500">
                          Due: Mar 28, 2025
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </section>
          </div>

          {/* Calendar */}
          <section>
            <h2 className="mb-4 text-xl font-bold">Calendar</h2>
            <div className="rounded-md border">
              <div className="grid grid-cols-7 border-b">
                {["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <div
                      key={day}
                      className="border-r p-2 text-center text-sm font-medium last:border-r-0"
                    >
                      {day}
                    </div>
                  )
                )}
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                            >
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
          </section>
        </div>
  );
}
