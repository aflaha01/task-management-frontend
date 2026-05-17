import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().max(500, "Description too long"),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.string().min(1, "Due date is required"),
});

export type TaskFormValues = z.infer<typeof taskSchema>;