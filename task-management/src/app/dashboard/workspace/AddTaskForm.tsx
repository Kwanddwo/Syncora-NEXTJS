"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, ChevronDown, Check, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {WorkspaceMember} from "@/lib/types"
import { fetchMembersByWorkspaceId } from "@/app/_api/activeWorkspaces";

export function NewTaskDialog({ workspaceId }: { workspaceId: string }) {
  const [members,setMembers]=useState<WorkspaceMember[]>([]);
  useEffect(() => {
    const getWorkspaceMembers = async ()=>{
      const response=await fetchMembersByWorkspaceId(workspaceId);
      setMembers(response)
    }
    getWorkspaceMembers();
  },[workspaceId]);
  
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const toggleAssignee = (id: string) => {
    setSelectedAssignees((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const getSelectedNames = () => {
    return members
      .filter((member) => selectedAssignees.includes(member.id))
      .map((member) => member.user.name);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>
            Create a new task by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter task title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter task description" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="ongoing">On going</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignees</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !selectedAssignees.length && "text-muted-foreground"
                  )}
                >
                  {selectedAssignees.length > 0 ? (
                    <div className="flex items-center gap-1 truncate">
                      <span className="truncate">
                        {selectedAssignees.length === 1
                          ? getSelectedNames()[0]
                          : `${getSelectedNames()[0]} +${selectedAssignees.length - 1}`}
                      </span>
                    </div>
                  ) : (
                    "Select assignees"
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <div className="max-h-[200px] overflow-auto p-1">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-muted cursor-pointer"
                      onClick={() => toggleAssignee(member.id)}
                    >
                      <Checkbox
                        id={`assignee-${member.id}`}
                        checked={selectedAssignees.includes(member.id)}
                        onCheckedChange={() => toggleAssignee(member.id)}
                      />
                      <label
                        htmlFor={`assignee-${member.id}`}
                        className="flex-grow cursor-pointer text-sm"
                      >
                        {member.user.name}
                      </label>
                      {selectedAssignees.includes(member.id) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Display selected assignees */}
            {selectedAssignees.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {getSelectedNames().map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                  >
                    <User className="h-3 w-3" />
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
