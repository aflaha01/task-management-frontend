import { Calendar, Trash2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/task.types";

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: number, status: Task["status"]) => void;
}

const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-red-100 text-red-700 border-red-200",
};

const statusStyles: Record<Task["status"], string> = {
  todo: "bg-slate-100 text-slate-600 border-slate-200",
  in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  done: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const statusLabels: Record<Task["status"], string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const nextStatus: Record<Task["status"], Task["status"]> = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function TaskCard({ task, onDelete, onEdit, onStatusChange }: TaskCardProps) {
  return (
    <div className="bg-white border border-border/60 rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow">

      {/* Priority + actions row */}
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className={`text-xs font-medium capitalize ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </Badge>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(task)}
          >
            <Pencil size={13} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-red-500"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>

      {/* Title + description */}
      <div>
        <h3
          className={`text-sm font-semibold leading-snug ${
            task.status === "done" ? "line-through text-muted-foreground" : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <Badge
          variant="outline"
          className={`text-xs cursor-pointer ${statusStyles[task.status]}`}
          onClick={() => onStatusChange(task.id, nextStatus[task.status])}
          title="Click to advance status"
        >
          {statusLabels[task.status]}
        </Badge>
        {task.due_date && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar size={11} />
            {formatDate(task.due_date)}
          </span>
        )}
      </div>
    </div>
  );
}