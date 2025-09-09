import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import type { Id } from "@/convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
  toggleTask: (id: Id<"tasks">) => void;
  deleteTask: (id: Id<"tasks">) => void;
}

const TasksList = ({ toggleTask, deleteTask }: Props) => {
  const tasks = useQuery(api.tasks.getTasks) || [];

  return (
    <div className="rounded-box border-base-content/5 bg-base-100 w-full overflow-x-auto border">
      <Table className="table">
        <TableCaption>A list of your recent tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.completed ? "Completed" : "Pending"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="secondary"
                  onClick={() => toggleTask(task._id)}
                >
                  Toggle
                </Button>
                <Button
                  variant="destructive"
                  className="ml-2"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
