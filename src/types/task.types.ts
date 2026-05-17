export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;

export interface TaskFilters {
  status?: TaskStatus | "";
  priority?: TaskPriority | "";
  search?: string;
}