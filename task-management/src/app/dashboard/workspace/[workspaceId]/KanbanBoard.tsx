"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Task, TaskAssignee, TaskStatus } from "@/lib/types";
import { MoreVertical, GripVertical } from "lucide-react";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { updateStatusAPI } from "@/app/_api/TasksAPI";

function KanbanBoard({
  workspaceId,
  todos,
  setTodos,
  isPersonal,
}: {
  workspaceId: string;
  todos: Task[];
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
  isPersonal: boolean;
}) {
  const todoTasks = todos?.filter((todo) => todo.status === "pending");
  const ongoingTasks = todos?.filter((todo) => todo.status === "in_progress");
  const doneTasks = todos?.filter((todo) => todo.status === "completed");

  // Track which column is currently being dragged over
  const [activeDroppableId, setActiveDroppableId] = useState<string | null>(
    null
  );

  const onDragEnd = async (result: DropResult) => {
    // Clear the active droppable when drag ends
    setActiveDroppableId(null);

    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find the task that was dragged
    let draggedTask;
    let newStatus;

    // Determine which list the task was dragged from
    if (source.droppableId === "todo") {
      draggedTask = todoTasks[source.index];
      newStatus = "pending";
    } else if (source.droppableId === "ongoing") {
      draggedTask = ongoingTasks[source.index];
      newStatus = "in_progress";
    } else {
      draggedTask = doneTasks[source.index];
      newStatus = "completed";
    }

    // Update the status based on where it was dropped
    if (destination.droppableId === "todo") {
      newStatus = "pending";
    } else if (destination.droppableId === "ongoing") {
      newStatus = "in_progress";
    } else if (destination.droppableId === "done") {
      newStatus = "completed";
    }

    if (draggedTask.status !== newStatus) {
      try {
        const pastTodos = todos;
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === draggedTask.id
              ? { ...todo, status: newStatus as TaskStatus }
              : todo
          )
        );

        const response = await updateStatusAPI(
          workspaceId,
          draggedTask.id,
          newStatus
        );

        if (response && response.message == "Task status updated") {
          return;
        } else {
          setTodos(pastTodos);
          throw new Error("An error occurred while updating task");
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
        }
        console.error("Error Updating Status", e);
      }
    }
    console.log(`Task ${draggedTask.id} moved to ${newStatus}`);
  };

  // Track when dragging starts to provide visual feedback
  const onDragStart = (result: DropResult) => {
    const { source } = result;
    // Set the source droppable as active initially
    setActiveDroppableId(source.droppableId);
  };

  // Update which column is being dragged over
  const onDragUpdate = (result: DropResult) => {
    const { destination } = result;
    setActiveDroppableId(destination?.droppableId || null);
  };

  const TaskCard = ({ task, index }: { task: Task; index: number }) => (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-3 mb-3 transition-all ${snapshot.isDragging ? "shadow-lg ring-2 ring-tag-blue z-10" : ""}`}
        >
          <div className="flex justify-between">
            <div className="flex-1 pr-2">
              <div className="flex items-center mb-2">
                <div
                  {...provided.dragHandleProps}
                  className="mr-2 p-1 rounded hover:bg-accent cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4 text-accent-foreground" />
                </div>
                <h4 className="text-sm font-medium">{task.title}</h4>
              </div>
              <div className="text-xs text-muted-foreground ml-6">
                Due: {new Date(task.dueDate).toISOString().split("T")[0]}
              </div>
              {!isPersonal && (
                <div className="text-xs text-muted-foreground ml-6 mt-1">
                  Assignee:{" "}
                  <div className="flex space-x-2">
                    {task.assignees?.map((assignee: TaskAssignee) => (
                      <div
                        key={assignee.id}
                        className="flex items-center space-x-1"
                      >
                        <span>{assignee.user.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 self-start">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </Draggable>
  );

  return (
    <TabsContent value="kanban" className="space-y-6">
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* To Do Column */}
          <Card
            className={`border-t-4 border-t-tag-neutral-foreground transition-all ${activeDroppableId === "todo" ? "ring-2 ring-tag-neutral-foreground bg-tag-neutral/20" : ""}`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="font-semibold">To Do</h3>
              <Badge variant="outline" className="text-xs font-normal">
                {todoTasks?.length} Tasks
              </Badge>
            </CardHeader>
            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <CardContent
                  className={`min-h-64 transition-colors ${snapshot.isDraggingOver ? "bg-tag-blue/50" : ""}`}
                >
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 p-1"
                  >
                    {todoTasks.map((todo, index) => (
                      <TaskCard key={todo.id} task={todo} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                </CardContent>
              )}
            </Droppable>
          </Card>

          {/* Ongoing Column */}
          <Card
            className={`border-t-4 border-t-tag-blue-foreground transition-all ${activeDroppableId === "ongoing" ? "ring-2 ring-tag-blue-foreground bg-tag-blue/30" : "bg-tag-blue/10"}`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="font-semibold">Ongoing</h3>
              <Badge variant="outline" className="text-xs font-normal">
                {ongoingTasks?.length} Tasks
              </Badge>
            </CardHeader>
            <Droppable droppableId="ongoing">
              {(provided, snapshot) => (
                <CardContent
                  className={`min-h-64 transition-colors ${snapshot.isDraggingOver ? "bg-tag-blue/50" : ""}`}
                >
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 p-1"
                  >
                    {ongoingTasks.map((todo, index) => (
                      <TaskCard key={todo.id} task={todo} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                </CardContent>
              )}
            </Droppable>
          </Card>

          {/* Done Column */}
          <Card
            className={`border-t-4 border-t-tag-green-foreground transition-all ${activeDroppableId === "done" ? "ring-2 ring-tag-green bg-tag-green-foreground/30" : "bg-tag-green-foreground/10"}`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="font-semibold">Done</h3>
              <Badge variant="outline" className="text-xs font-normal">
                {doneTasks?.length} Tasks
              </Badge>
            </CardHeader>
            <Droppable droppableId="done">
              {(provided, snapshot) => (
                <CardContent
                  className={`min-h-64 transition-colors ${snapshot.isDraggingOver ? "bg-tag-green-foreground/50" : ""}`}
                >
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 p-1"
                  >
                    {doneTasks.map((todo, index) => (
                      <TaskCard key={todo.id} task={todo} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                </CardContent>
              )}
            </Droppable>
          </Card>
        </div>
      </DragDropContext>
    </TabsContent>
  );
}

export default KanbanBoard;
