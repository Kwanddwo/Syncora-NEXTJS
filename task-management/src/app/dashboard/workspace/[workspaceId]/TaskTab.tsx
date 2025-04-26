"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';
import {ChevronRight, MoreHorizontal, Plus, User, X} from 'lucide-react';
import React, {useEffect, useState} from 'react'
import { NewTaskDialog } from './_TasksCRUDComponents/AddTaskForm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EditTaskDialog } from './_TasksCRUDComponents/EditTaskForm';
import { cn } from '@/lib/utils';
import {Task, WorkspaceMember} from "@/lib/types"
import DeleteTaskAlert from './_TasksCRUDComponents/DeleteTaskAlert';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Checkbox} from "@/components/ui/checkbox";
import {fetchMembersFromWorkspace} from "@/app/_api/WorkspacesAPIs";
import {taskAssigneeAPI, taskUnassigneeAPI} from "@/app/_api/TasksAPI";
import {toast} from "sonner";
import {TaskAssignee} from "@/lib/types";

function TaskTab({workspaceId, todos, setTodos, isPersonal}
                 :{workspaceId: string, todos: Task[], setTodos: React.Dispatch<React.SetStateAction<Task[]>>, isPersonal: boolean}) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [tempSelectedAssignees, setTempSelectedAssignees] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const getWorkspaceMembers = async () => {
      const response = await fetchMembersFromWorkspace(workspaceId);
      setMembers(response);
    };
    getWorkspaceMembers();
  }, [workspaceId]);

  const handleAssigneeSelection = (taskId: string, memberId: string) => {
    setTempSelectedAssignees(prev => {
      const currentSelected = prev[taskId] || [];
      if (currentSelected.includes(memberId)) {
        return {
          ...prev,
          [taskId]: currentSelected.filter(id => id !== memberId)
        };
      } else {
        return {
          ...prev,
          [taskId]: [...currentSelected, memberId]
        };
      }
    });
  };

  const saveAssignees = async(taskId: string) => {
    const selectedIds = tempSelectedAssignees[taskId] || [];
    const assignees = {
      taskId,
      workspaceId,
      workspaceMemberIds: selectedIds
    }
    try {
      const response = await taskAssigneeAPI(assignees);
      if(response && response.data.message === "Task assigned successfully"){
        setTodos(prevTodos => {
          return prevTodos.map(todo => {
            if (todo.id === taskId) {
              const newAssignees = selectedIds.map(id => {
                const member = members.find(m => m.id === id);
                if (!member) return null;
                return {
                  id: crypto.randomUUID(),
                  taskId: taskId,
                  userId: member.user.id,
                  assignedAt: new Date(),
                  task: todo,
                  user: member.user,
                } as TaskAssignee;
              }).filter(Boolean) as TaskAssignee[];

              return {
                ...todo,
                assignees: newAssignees,
              };
            }
            return todo;
          });
        });
      }
      if(response?.data.message === "All users are already assigned to this task."){
        toast.error("All users are already assigned to this task.")
        return;
      }
    } catch(e) {
      console.error(e);
    }

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  const isUserSelected = (taskId: string, memberId: string) => {
    return (tempSelectedAssignees[taskId] || []).includes(memberId);
  };

  const toggleRowExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const unassignUser = async(taskId: string, memberId: string) => {
    const member =members.find((m) => m.user.id === memberId);
    if(!member) {
      toast.error("Cannot find the user,please try again.")
      return;
    }
    const unassign = {
      taskId,
      workspaceId,
      workspaceMemberIds: [member.id],
    }
    try{
      const res = await taskUnassigneeAPI(unassign);
      if(res && res.data.message ==="Task unassigned successfully"){
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            if (todo.id === taskId) {
              return {
                ...todo,
                assignees: (todo.assignees || []).filter((assignee) => assignee.user.id !== memberId),
              }
            }
            return todo
          })
        })
        toast.success("Task unassigned successfully");
      }
    }catch(e) {
      console.error("Failed to unassign task",e);
    }
  }

  const status = [
    { title: "pending", style: "bg-gray-100" },
    { title: "in_progress", style: "bg-green-100 text-green-800" },
    { title: "completed", style: "bg-blue-100 text-blue-800" },
  ];

  const priorities = [
    { title: "high", style: "bg-red-500 hover:bg-red-600" },
    { title: "medium", style: "bg-yellow-500 hover:bg-yellow-600" },
    { title: "low", style: "bg-blue-500 hover:bg-blue-600" },
  ];

  const getStatusStyle = (taskStatus: string) => {
    const foundStatus = status.find((s) => s.title === taskStatus);
    return foundStatus ? foundStatus.style : "bg-gray-100";
  };

  const getPriorityStyle = (taskPriority: string) => {
    const foundPriority = priorities.find((p) => p.title === taskPriority);
    return foundPriority ? foundPriority.style : "bg-gray-100";
  };

  return (
      <TabsContent
          value="tasks"
          className="space-y-6 [&_td]:border-0 [&_th]:border-0"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold">Tasks</h2>
            <div className="rounded-md border">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    {!isPersonal && (<TableHead>Assignee</TableHead>)}
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todos.map((todo) => (
                      <React.Fragment key={todo.id}>
                        <TableRow>
                          <TableCell className="font-medium">
                            {todo.title}
                          </TableCell>
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
                          <TableCell>
                            {new Date(todo.dueDate).toISOString().split("T")[0]}
                          </TableCell>
                          { !isPersonal && (
                              <TableCell className="flex items-center pt-3">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    {todo.assignees?.[0]?.user?.name}
                                  </div>
                                  <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => toggleRowExpand(todo.id)}
                                  >
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 transition-transform",
                                            expandedRows[todo.id]
                                                ? "transform rotate-90"
                                                : ""
                                        )}
                                    />
                                  </Button>
                                </div>
                              </TableCell>
                          )}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <EditTaskDialog
                                      workspaceId={workspaceId}
                                      taskId={todo.id}
                                      setTodos={setTodos}
                                  />
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <DeleteTaskAlert
                                      workspaceId={workspaceId}
                                      taskId={todo.id}
                                      setTodos={setTodos}
                                  />
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        {expandedRows[todo.id] && (
                            <TableRow>
                              <TableCell
                                  colSpan={6}
                                  className="py-2 px-4 bg-muted/50"
                              >
                                <div className="pl-8">
                                  <div className="flex justify-between items-start mb-2">
                                    <p className="font-medium text-sm">Assignees:</p>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 p-0"
                                        >
                                          <Plus className="h-4 w-4" />
                                          <span className="sr-only">Add assignees</span>
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-80" align="end">
                                        <div className="space-y-4">
                                          <h4 className="font-medium text-sm">Add Assignees</h4>
                                          <div className="space-y-2">
                                            {members.map((member) => (
                                                <div key={member.id} className="flex items-center space-x-2">
                                                  <Checkbox
                                                      id={`user-${todo.id}-${member.id}`}
                                                      checked={isUserSelected(todo.id, member.id)}
                                                      onCheckedChange={() => handleAssigneeSelection(todo.id, member.id)}
                                                  />
                                                  <label
                                                      htmlFor={`user-${todo.id}-${member.id}`}
                                                      className="text-sm flex flex-col cursor-pointer"
                                                  >
                                                    <span>{member.user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{member.user.email}</span>
                                                  </label>
                                                </div>
                                            ))}
                                          </div>
                                          <div className="flex justify-end gap-2 pt-2 border-t">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                                                }}
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => saveAssignees(todo.id)}
                                            >
                                              Save Changes
                                            </Button>
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {todo.assignees?.length ? (
                                        todo.assignees.map((assignee, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-sm bg-muted/40 rounded-md px-3 py-2"
                                            >
                                              <User className="h-4 w-4 text-muted-foreground" />
                                              <div className="flex-1 min-w-0">
                                                <div className="font-medium truncate">{assignee.user.name}</div>
                                                <div className="text-xs text-muted-foreground truncate">
                                                  {assignee.user.email}
                                                </div>
                                              </div>
                                              <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-7 w-7 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive"
                                                  onClick={() => unassignUser(todo.id, assignee.user.id)}
                                              >
                                                <X className="h-3.5 w-3.5" />
                                                <span className="sr-only">Remove {assignee.user.name}</span>
                                              </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-muted-foreground italic col-span-2">No assignees</div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                        )}
                      </React.Fragment>
                  ))}
                  <TableRow>
                    <TableCell colSpan={6}>
                      <NewTaskDialog
                          workspaceId={workspaceId}
                          setTodos={setTodos}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </TabsContent>
  );
}

export default TaskTab;