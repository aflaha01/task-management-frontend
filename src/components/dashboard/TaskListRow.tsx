// src/components/dashboard/TaskListRow.tsx
import { Calendar, Trash2, Pencil, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types/task.types";
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  priorityStyles,
  statusStyles,
} from "@/lib/constants/task.constants";

interface TaskListRowProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: number, status: Task["status"]) => void;
  onPriorityChange?: (id: number, priority: Task["priority"]) => void;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function TaskListRow({
  task,
  onDelete,
  onEdit,
  onStatusChange,
  onPriorityChange,
}: TaskListRowProps) {
  return (
    <div className="bg-white border border-border/60 rounded-xl px-4 py-3 flex items-center gap-4 hover:shadow-sm transition-shadow">

      {/* Priority dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant="outline"
            className={`text-xs font-medium capitalize shrink-0 cursor-pointer gap-1 ${priorityStyles[task.priority]}`}
          >
            {task.priority}
            <ChevronDown size={10} />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-32">
          <DropdownMenuLabel className="text-xs text-muted-foreground">Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {PRIORITY_OPTIONS.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              className={`text-xs cursor-pointer ${task.priority === opt.value ? "font-semibold" : ""}`}
              onSelect={() => onPriorityChange?.(task.id, opt.value)}
            >
              <span className={`mr-2 h-2 w-2 rounded-full inline-block ${priorityStyles[opt.value].split(" ")[0]}`} />
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground truncate">{task.description}</p>
        )}
      </div>

      {/* Status dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            variant="outline"
            className={`text-xs shrink-0 cursor-pointer gap-1 ${statusStyles[task.status]}`}
          >
            {STATUS_OPTIONS.find((o) => o.value === task.status)?.label}
            <ChevronDown size={10} />
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuLabel className="text-xs text-muted-foreground">Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {STATUS_OPTIONS.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              className={`text-xs cursor-pointer ${task.status === opt.value ? "font-semibold" : ""}`}
              onSelect={() => onStatusChange(task.id, opt.value)}
            >
              <span className={`mr-2 h-2 w-2 rounded-full inline-block ${statusStyles[opt.value].split(" ")[0]}`} />
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Due date */}
      <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
        <Calendar size={11} />
        {formatDate(task.due_date)}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => onEdit(task)}>
          <Pencil size={13} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500" onClick={() => onDelete(task.id)}>
          <Trash2 size={13} />
        </Button>
      </div>
    </div>
  );
}