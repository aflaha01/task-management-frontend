// src/lib/constants/task.constants.ts

import type { Task } from "@/types/task.types";

export const STATUS_OPTIONS: { value: Task["status"]; label: string }[] = [
  { value: "todo",        label: "To Do"      },
  { value: "in_progress", label: "In Progress" },
  { value: "done",        label: "Done"        },
];

export const PRIORITY_OPTIONS: { value: Task["priority"]; label: string }[] = [
  { value: "low",    label: "Low"    },
  { value: "medium", label: "Medium" },
  { value: "high",   label: "High"   },
];

export const priorityStyles: Record<Task["priority"], string> = {
  low:    "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100  text-amber-700  border-amber-200",
  high:   "bg-red-100    text-red-700    border-red-200",
};

export const statusStyles: Record<Task["status"], string> = {
  todo:        "bg-slate-100  text-slate-600  border-slate-200",
  in_progress: "bg-blue-100   text-blue-700   border-blue-200",
  done:        "bg-emerald-100 text-emerald-700 border-emerald-200",
};