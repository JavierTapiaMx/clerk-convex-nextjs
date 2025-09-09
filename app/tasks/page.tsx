import Tasks from "@/components/Tasks/Tasks";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TasksPage = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-4xl font-bold">Tasks</h1>
      <Tasks />
      <Link href="/" className="btn mt-6">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
};

export default TasksPage;
