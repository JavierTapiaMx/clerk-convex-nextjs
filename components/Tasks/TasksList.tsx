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
import { CheckCircle2, Circle, Trash2, ListTodo } from "lucide-react";
import { LoadingSpinner, EmptyState } from "@/components/ui/loading";

interface Props {
  toggleTask: (id: Id<"tasks">) => Promise<void>;
  deleteTask: (id: Id<"tasks">) => Promise<void>;
}

const TasksList = ({ toggleTask, deleteTask }: Props) => {
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner text="Loading tasks..." />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No tasks yet"
        description="Add your first task above to get started!"
      />
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
