"use client"
import React, {useState} from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {Check, ChevronDown, ChevronRight, MoreHorizontal, User} from 'lucide-react';
import { NewTaskDialog } from '../_TasksCRUDComponents/AddTaskForm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EditTaskDialog } from '../_TasksCRUDComponents/EditTaskForm';
import { cn } from '@/lib/utils';
import {Task, TaskPriority, WorkspaceMember} from "@/lib/types";
import DeleteTaskAlert from '../_TasksCRUDComponents/DeleteTaskAlert';
import AssigneeManagement from './AssigneeManagement';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import {updateTaskPriorityAPI} from "@/app/_api/TasksAPI";
import {toast} from "sonner";

const TaskTable = ({
                       workspaceId,
                       todos,
                       setTodos,
                       isPersonal,
                       expandedRows,
                       toggleRowExpand,
                       members,
                       tempSelectedAssignees,
                       handleAssigneeSelection,
                       saveAssignees,
                       unassignUser
                   }: {
    workspaceId: string,
    todos: Task[],
    setTodos: React.Dispatch<React.SetStateAction<Task[]>>,
    isPersonal: boolean,
    expandedRows: Record<string, boolean>,
    toggleRowExpand: (id: string) => void,
    members: WorkspaceMember[],
    tempSelectedAssignees: Record<string, string[]>,
    handleAssigneeSelection: (taskId: string, memberId: string) => void,
    saveAssignees: (taskId: string) => Promise<void>,
    unassignUser: (taskId: string, memberId: string) => Promise<void>
}) => {
    const [priorityPopoverTask, setPriorityPopoverTask] = useState<string | null>(null)
    const updatePriority = async(taskId: string, newPriority: string) => {
        console.log("New priority",newPriority);
        try{
            const pastTodos =  todos;
            setTodos((prev) => prev.map((todo) =>
                todo.id === taskId ? { ...todo, priority: newPriority as TaskPriority } : todo
            ));
            const res = await updateTaskPriorityAPI(workspaceId,taskId,newPriority);
            if(res){
                toast.success("Priority updated successfully.");
               return ;
            }else{
                setTodos(pastTodos);
                toast.error('Failed to update priority');
                return;
            }
        }catch(error){
            console.log("Failed to update Priority",error);
        }

    };
    const status = [
        { title: "pending", style: "bg-gray-100" },
        { title: "in_progress", style: "bg-green-100 text-green-800" },
        { title: "completed", style: "bg-blue-100 text-blue-800" },
    ];

    const priorities = [
        { value: "high", label: "High", style: "bg-red-500 hover:bg-red-600" },
        { value: "medium", label: "Medium", style: "bg-yellow-500 hover:bg-yellow-600" },
        { value: "low", label: "Low", style: "bg-blue-500 hover:bg-blue-600" },
    ]

    const getStatusStyle = (taskStatus: string) => {
        const foundStatus = status.find((s) => s.title === taskStatus);
        return foundStatus ? foundStatus.style : "bg-gray-100";
    };

    const getPriorityStyle = (taskPriority: string) => {
        const foundPriority = priorities.find((p) => p.value === taskPriority)
        return foundPriority ? foundPriority.style : "bg-gray-100"
    }

    const isUserSelected = (taskId: string, memberId: string) => {
        return (tempSelectedAssignees[taskId] || []).includes(memberId);
    };

    return (
        <div className="rounded-md border">
            <Table>
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
                                    <Popover
                                        open={priorityPopoverTask === todo.id}
                                        onOpenChange={(open) => {
                                            if (open) {
                                                setPriorityPopoverTask(todo.id)
                                            } else {
                                                setPriorityPopoverTask(null)
                                            }
                                        }}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                                                <Badge
                                                    className={cn(
                                                        getPriorityStyle(todo.priority),
                                                        "transition-opacity duration-200 flex items-center gap-1",
                                                    )}
                                                >
                                                    {todo.priority}
                                                    <ChevronDown className="h-3 w-3 opacity-70" />
                                                </Badge>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0" align="start">
                                            <Command>
                                                <CommandList>
                                                    <CommandGroup>
                                                        {priorities.map((priority) => (
                                                            <CommandItem
                                                                key={priority.value}
                                                                value={priority.value}
                                                                onSelect={() => updatePriority(todo.id, priority.value)}
                                                                className="flex items-center gap-2 cursor-pointer"
                                                            >
                                                                <Badge className={priority.style}>{priority.label}</Badge>
                                                                <span className="ml-auto">
                                          {todo.priority === priority.value && <Check className="h-4 w-4" />}
                                        </span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell>
                                    {new Date(todo.dueDate).toISOString().split("T")[0]}
                                </TableCell>
                                {!isPersonal && (
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
                                        <AssigneeManagement
                                            todo={todo}
                                            members={members}
                                            isUserSelected={isUserSelected}
                                            handleAssigneeSelection={handleAssigneeSelection}
                                            saveAssignees={saveAssignees}
                                            unassignUser={unassignUser}
                                        />
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
    );
};

export default TaskTable;