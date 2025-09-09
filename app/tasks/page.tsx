import Tasks from "@/components/Tasks/Tasks";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TasksPage = () => {
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Tasks</h1>
      <Tasks />
      <Link href="/" className="btn mt-6">
        <Button>Go Back</Button>
      </Link>
    </div>
  );
};

export default TasksPage;
