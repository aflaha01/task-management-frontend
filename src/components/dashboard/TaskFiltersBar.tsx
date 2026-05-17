import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskFilters } from "@/types/task.types";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "@/lib/constants/task.constants";

interface TaskFiltersBarProps {
  filters: TaskFilters;
  view: "grid" | "list";
  onFilterChange: (filters: TaskFilters) => void;
  onViewChange: (view: "grid" | "list") => void;
  onNewTask: () => void;
}

export function TaskFiltersBar({
  filters,
  view,
  onFilterChange,
  onViewChange,
  onNewTask,
}: TaskFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          placeholder="Search tasks..."
          className="pl-8 h-9 text-sm"
          value={filters.search ?? ""}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Status filter */}
      <Select
        value={filters.status || "all"}
        onValueChange={(val) =>
          onFilterChange({
            ...filters,
            status: val === "all" ? "" : (val as TaskFilters["status"]),
          })
        }
      >
        <SelectTrigger className="h-9 w-[130px] text-sm">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority filter */}
      <Select
        value={filters.priority || "all"}
        onValueChange={(val) =>
          onFilterChange({
            ...filters,
            priority: val === "all" ? "" : (val as TaskFilters["priority"]),
          })
        }
      >
        <SelectTrigger className="h-9 w-[130px] text-sm">
          <SelectValue placeholder="All Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          {PRIORITY_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* View toggle */}
      <div className="flex border border-border rounded-md overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className={`h-9 w-9 rounded-none ${view === "grid" ? "bg-muted" : ""}`}
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid size={15} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-9 w-9 rounded-none ${view === "list" ? "bg-muted" : ""}`}
          onClick={() => onViewChange("list")}
        >
          <List size={15} />
        </Button>
      </div>

      {/* New Task */}
      <Button
        className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold"
        onClick={onNewTask}
      >
        + New Task
      </Button>
    </div>
  );
}