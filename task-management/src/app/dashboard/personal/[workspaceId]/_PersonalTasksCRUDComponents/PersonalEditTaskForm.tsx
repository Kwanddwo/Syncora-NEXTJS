"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/lib/types";
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
import { Edit } from "lucide-react";
import { updateTaskAPI } from "@/app/_api/TasksAPI";
import CustomDatePicker from "@/components/datePicker";
import { ClipLoader } from "react-spinners";
import {toast} from "sonner";

export function EditTaskDialog({
  workspaceId,
  taskId,
  setTodos,
}: {
  workspaceId: string;
  taskId :string
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [dueDate, setDueDate] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();
    setLoading(true);
    
  const task = {
    title: title === "" ? undefined : title,
    description: description === "" ? undefined : description,
    priority:priority === "" ? undefined : priority,
    workspaceId,
    dueDate:dueDate === "" ? undefined  :dueDate,
    assignees: null,
  };

    console.log("Task object to send:", task);
    try {
      const res = await updateTaskAPI(workspaceId,taskId,task);
      if (res && res.message === "Task updated successfully.") {
        console.log("Task to updaate",res.updatedTask);
        
        setTodos((prev) =>
            prev.map((t) => (t.id === res.updatedTask.id ? res.updatedTask : t))
          );
        setLoading(false);
        setOpen(false);
        toast.success("Task updated successfully");
      } else {
        throw new Error("Task update failed.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-8 justify-start text-muted-foreground"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update a task by filling out the form below.
            </DialogDescription>
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
              Update
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
