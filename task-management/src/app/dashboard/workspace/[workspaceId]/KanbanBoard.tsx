"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import {Task, TaskAssignee, TaskStatus} from '@/lib/types';
import { MoreVertical } from 'lucide-react';
import React from 'react'
import {DragDropContext, Droppable, Draggable, DropResult} from "@hello-pangea/dnd"
import {updateStatusAPI} from "@/app/_api/TasksAPI";
function TodoTab({workspaceId,todos,setTodos}:
                 {workspaceId : string,todos : Task[],setTodos :React.Dispatch<React.SetStateAction<Task[]>>}) {
  const todoTasks = todos?.filter((todo) => todo.status === "pending");
  const OngoingTasks=todos?.filter((todo) => todo.status == "in_progress")
  const doneTasks=todos?.filter((todo) => todo.status == "completed")

  const onDragEnd = async(result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same place
    if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
    ) return;

    // Find the task that was dragged
    let draggedTask;
    let newStatus;

    // Determine which list the task was dragged from
    if (source.droppableId === 'todo') {
      draggedTask = todoTasks[source.index];
      newStatus = 'pending';
    } else if (source.droppableId === 'ongoing') {
      draggedTask = OngoingTasks[source.index];
      newStatus = 'in_progress';
    } else {
      draggedTask = doneTasks[source.index];
      newStatus = 'completed';
    }

    // Update the status based on where it was dropped
    if (destination.droppableId === 'todo') {
      newStatus = 'pending';
    } else if (destination.droppableId === 'ongoing') {
      newStatus = 'in_progress';
    } else if (destination.droppableId === 'done') {
      newStatus = 'completed';
    }
    if (draggedTask.status !== newStatus) {
      try {
        const response = await updateStatusAPI(workspaceId, draggedTask.id, newStatus);
        if (response && response.message == "Task status updated") {
          setTodos((prev) => prev.map((todo) =>
              todo.id === draggedTask.id ? {...todo, status: newStatus as TaskStatus} : todo
          ));
        } else {
          throw new Error("An error occurred while updating task");
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
        }
        console.error("Error Updating Status", e);
      }
    }
    // Here you would typically also update the backend
    // by calling an API to update the task status
    console.log(`Task ${draggedTask.id} moved to ${newStatus}`);
  };
  const TaskCard = ({ task, index }:{task :Task,index : number}) => (
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
            <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="p-3 mb-2 cursor-grab"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="text-sm font-medium">{task.title}</h4>
                  <div className="text-xs text-muted-foreground">
                    Due: {new Date(task.dueDate).toISOString().split("T")[0]}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Assignee:{" "}
                    <div className="flex space-x-2">
                      {task.assignees?.map((assigne:TaskAssignee) => (
                          <div
                              key={assigne.id}
                              className="flex items-center space-x-1"
                          >
                            <span>{assigne.user.name}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </Card>
        )}
      </Draggable>
  );
  return (
    <TabsContent value="kanban" className="space-y-6">
      <DragDropContext onDragEnd={onDragEnd} >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* To Do Column */}
        <Card className="border-t-4 border-t-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">To Do</h3>
            <Badge variant="outline" className="text-xs font-normal">
              {todoTasks?.length} Tasks
            </Badge>
          </CardHeader>
          <Droppable droppableId="todo">
            {(provided) => (
                <CardContent className="min-h-64">
                  <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2"
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
        <Card className="border-t-4 border-t-blue-200 bg-blue-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">Ongoing</h3>
            <Badge variant="outline" className="text-xs font-normal">
              {OngoingTasks?.length} Tasks
            </Badge>
          </CardHeader>
          <Droppable droppableId="ongoing">
            {(provided) => (
                <CardContent className="min-h-64">
                  <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2"
                  >
                    {OngoingTasks.map((todo, index) => (
                        <TaskCard key={todo.id} task={todo} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                </CardContent>
            )}
          </Droppable>
        </Card>

        {/* Done Column */}
        <Card className="border-t-4 border-t-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-semibold">Done</h3>
            <Badge variant="outline" className="text-xs font-normal">
              {doneTasks?.length} Tasks
            </Badge>
          </CardHeader>
          <Droppable droppableId="done">
            {(provided) => (
                <CardContent className="min-h-64">
                  <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-2"
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

export default TodoTab