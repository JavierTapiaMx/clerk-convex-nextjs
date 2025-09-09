"use client";
import TaskForm from "./TaskForm";
import TasksList from "./TasksList";
import { useTasks } from "@/hooks/useTasks";

const Tasks = () => {
  const { addTask, toggleTask, deleteTask, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex flex-row items-center p-8">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  return (
    <>
      <TaskForm addTask={addTask} />
      <TasksList toggleTask={toggleTask} deleteTask={deleteTask} />
    </>
  );
};

export default Tasks;
