import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import type { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useCallback } from "react";

export const useTasks = () => {
  const tasks = useQuery(api.tasks.getTasks);
  const addTaskMutation = useMutation(api.tasks.addTask);
  const toggleTaskMutation = useMutation(api.tasks.toggleTask);
  const deleteTaskMutation = useMutation(api.tasks.deleteTask);

  const addTask = useCallback(
    async (description: string) => {
      try {
        await addTaskMutation({ description });
        toast.success("Task added successfully!");
      } catch (error) {
        toast.error("Failed to add task");
        console.error("Error adding task:", error);
      }
    },
    [addTaskMutation],
  );

  const toggleTask = useCallback(
    async (id: Id<"tasks">) => {
      try {
        await toggleTaskMutation({ id });
        toast.success("Task status updated!");
      } catch (error) {
        toast.error("Failed to update task");
        console.error("Error toggling task:", error);
      }
    },
    [toggleTaskMutation],
  );

  const deleteTask = useCallback(
    async (id: Id<"tasks">) => {
      try {
        await deleteTaskMutation({ id });
        toast.success("Task deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete task");
        console.error("Error deleting task:", error);
      }
    },
    [deleteTaskMutation],
  );

  return {
    tasks: tasks ?? [],
    addTask,
    toggleTask,
    deleteTask,
    isLoading: tasks === undefined,
  };
};
