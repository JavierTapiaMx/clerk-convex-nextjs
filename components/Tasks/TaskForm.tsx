"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { taskFormSchema, type TaskFormSchema } from "@/lib/validations/task";

interface Props {
  addTask: (description: string) => Promise<void>;
}

const TaskForm = ({ addTask }: Props) => {
  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (values: TaskFormSchema) => {
    await addTask(values.description);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex w-full items-center justify-center gap-4"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full items-center justify-center">
              <FormLabel className="sr-only">Task Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task description..."
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Adding..." : "Add Task"}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
