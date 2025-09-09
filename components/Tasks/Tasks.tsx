"use client";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import type { Id } from "@/convex/_generated/dataModel";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import { toast } from "sonner";

const Tasks = () => {
  const addTask = useMutation(api.tasks.addTask);
  const toggleTask = useMutation(api.tasks.toggleTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const handleAddTask = async (description: string) => {
    await addTask({ description });
    toast.success("Task added successfully!");
  };

  const handleToggleTask = async (id: string) => {
    await toggleTask({ id: id as unknown as Id<"tasks"> });
    toast.success("Task status updated!");
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask({ id: id as unknown as Id<"tasks"> });
    toast.success("Task deleted successfully!");
  };

  return (
    <>
      <TaskForm addTask={handleAddTask} />
      <TasksList toggleTask={handleToggleTask} deleteTask={handleDeleteTask} />
    </>
  );
};

export default Tasks;
