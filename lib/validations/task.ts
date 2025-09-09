import { z } from "zod";

export const taskFormSchema = z.object({
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(100, "Description must be less than 100 characters")
    .trim()
    .refine((val) => val.length > 0, "Description is required"),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;
