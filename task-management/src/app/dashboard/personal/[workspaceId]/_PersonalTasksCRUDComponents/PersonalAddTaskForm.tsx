"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task} from "@/lib/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
} from "lucide-react";
import { addTaskAPI } from "@/app/_api/TasksAPI";
import CustomDatePicker from "@/components/datePicker";
import {ClipLoader} from "react-spinners"

export function NewTaskDialog({
  workspaceId,
  setTodos,
}: {
  workspaceId: string;
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [dueDate, setDueDate] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();
    setLoading(true);
    if (!title) {
      setError("Title is required");
      setLoading(false);
      return;
    }
    if (!priority) {
      setError("Priority is required");
      setLoading(false);
      return;
    }
    if (!dueDate) {
      setError("Due date is required");
      setLoading(false);
      return;
    }
    const task = {
      title,
      description,
      priority,
      workspaceId: workspaceId,
      dueDate: dueDate,
      assigneesIds: [user.id],
    };
    console.log("Task object to send:", task);

    try {
      const res = await addTaskAPI(task);
      if (res && res.message === "Task created successfully") {
        setLoading(false);
        setOpen(false);
        setTodos((prev) => [res.task,...prev])
      } else {
        throw new Error("Task creation failed.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>
              Create a new task by filling out the form below.
            </DialogDescription>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter task title" ref={titleRef} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                ref={descriptionRef}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2 ">
                <Label htmlFor="status">Due Date</Label>
                <CustomDatePicker
                  onChange={(timestamp) => setDueDate(timestamp)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={setPriority}>
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
          </div>
          <DialogFooter className="flex justify-between sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </form>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            {/* React spinner centered */}
            <ClipLoader color="#00BFFF" size={50} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
