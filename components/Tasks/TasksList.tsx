import { useTasks } from "@/hooks/useTasks";
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
import { CheckCircle2, Circle, Loader2, Trash2 } from "lucide-react";

interface Props {
  toggleTask: (id: Id<"tasks">) => Promise<void>;
  deleteTask: (id: Id<"tasks">) => Promise<void>;
}

const TasksList = ({ toggleTask, deleteTask }: Props) => {
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading tasks...</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <Circle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-semibold">No tasks yet</h3>
        <p className="text-muted-foreground">
          Add your first task above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-box border-base-content/5 bg-base-100 w-full overflow-x-auto border">
      <Table>
        <TableCaption className="text-muted-foreground text-sm">
          You have {tasks.length} task{tasks.length !== 1 ? "s" : ""} total
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[200px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task._id}
              className={task.completed ? "opacity-60" : ""}
            >
              <TableCell>
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="text-muted-foreground h-5 w-5" />
                )}
              </TableCell>
              <TableCell className={task.completed ? "line-through" : ""}>
                <span className="font-medium">{task.description}</span>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleTask(task._id)}
                    aria-label={
                      task.completed ? "Mark as pending" : "Mark as completed"
                    }
                  >
                    {task.completed ? "Mark Pending" : "Complete"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTask(task._id)}
                    aria-label={`Delete task: ${task.description}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
