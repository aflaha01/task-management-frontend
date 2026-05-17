//C:\Users\Dell\projects\project-round\frontend\src\components\dashboard\StatsBar.tsx
import type { Task } from "@/types/task.types";

interface StatsBarProps {
  tasks: Task[];
}

export function StatsBar({ tasks }: StatsBarProps) {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  const stats = [
    { label: "Total Tasks", value: total, color: "text-foreground" },
    { label: "To Do", value: todo, color: "text-amber-500" },
    { label: "In Progress", value: inProgress, color: "text-blue-500" },
    { label: "Done", value: done, color: "text-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-border/60 rounded-xl px-4 py-3"
        >
          <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
}