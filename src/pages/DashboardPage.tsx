import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { DashboardNavbar } from "@/components/dashboard/Dashboardnavbar";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { TaskFiltersBar } from "@/components/dashboard/TaskFiltersBar";
import { TaskCard } from "@/components/dashboard/TaskCard";
import { TaskListRow } from "@/components/dashboard/TaskListRow";
import { NewTaskDialog } from "@/components/dashboard/NewTaskDialog";
import { EditTaskDialog } from "@/components/dashboard/Edittaskdialog";

import { getTasks, createTask, updateTask, deleteTask } from "@/services/task.service";
import type { Task, TaskFilters } from "@/types/task.types";
import type { TaskFormValues } from "@/lib/validators/task.validator";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [view, setView] = useState<"grid" | "list">("grid");

  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTasks(filters);
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleCreateTask(values: TaskFormValues) {
    setIsCreating(true);
    try {
      const newTask = await createTask({
        ...values,
        due_date: values.due_date || null,
      });
      setTasks((prev) => [newTask, ...prev]);
      setNewDialogOpen(false);
      toast.success("Task created!");
    } catch {
      toast.error("Failed to create task.");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleUpdateTask(id: number, values: TaskFormValues) {
    setIsUpdating(true);
    try {
      const updated = await updateTask(id, {
        ...values,
        due_date: values.due_date || null,
      });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingTask(null);
      toast.success("Task updated!");
    } catch {
      toast.error("Failed to update task.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted.");
    } catch {
      toast.error("Failed to delete task.");
    }
  }

  async function handleStatusChange(id: number, status: Task["status"]) {
    try {
      const updated = await updateTask(id, { status });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      toast.error("Failed to update status.");
    }
  }


  
async function handlePriorityChange(id: number, priority: Task["priority"]) {
  try {
    const updated = await updateTask(id, { priority });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  } catch {
    toast.error("Failed to update priority.");
  }
}

  return (
    <div className="min-h-screen bg-[#f5f5f0] px-4 py-6 sm:px-8">
        <DashboardNavbar />
      <div className="max-w-6xl mx-auto space-y-5">

        <StatsBar tasks={tasks} />

        <TaskFiltersBar
          filters={filters}
          view={view}
          onFilterChange={setFilters}
          onViewChange={setView}
          onNewTask={() => setNewDialogOpen(true)}
        />

        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-12">Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">
            No tasks found. Create one!
          </p>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={setEditingTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskListRow
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={setEditingTask}
                onStatusChange={handleStatusChange}
                onPriorityChange={handlePriorityChange}
              />
            ))}
          </div>
        )}
      </div>

      <NewTaskDialog
        open={newDialogOpen}
        onClose={() => setNewDialogOpen(false)}
        onSubmit={handleCreateTask}
        isSubmitting={isCreating}
      />

      <EditTaskDialog
        task={editingTask}
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdateTask}
        isSubmitting={isUpdating}
      />
    </div>
  );
}