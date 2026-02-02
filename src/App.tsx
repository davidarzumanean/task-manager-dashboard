import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TaskForm } from "@/features/tasks/TaskForm";
import { TaskList } from "@/features/tasks/TaskList";
import { TaskStats } from "@/features/tasks/TaskStats";
import { TaskFilters } from "@/features/tasks/TaskFilters";
import type { Task, TaskPriority, TaskStatusFilter } from "@/types/task";

const TASKS_STORAGE_KEY = "task-manager.tasks.v1";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = window.localStorage.getItem(TASKS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return [];

      // Best-effort validation to avoid breaking the app on bad storage.
      return (
        parsed
          .filter((t): t is Task => {
            if (!t || typeof t !== "object") return false;
            const task = t as Record<string, unknown>;
            return (
              typeof task.id === "number" &&
              typeof task.title === "string" &&
              (task.priority === "high" || task.priority === "medium" || task.priority === "low") &&
              typeof task.completed === "boolean" &&
              typeof task.createdAt === "string"
            );
          })
          // Ensure newest first (consistent with addTask)
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );
    } catch {
      return [];
    }
  });

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [status, setStatus] = useState<TaskStatusFilter>("all");

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);

    return () => window.clearTimeout(id);
  }, [query]);

  useEffect(() => {
    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore storage write errors (private mode/quota)
    }
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return tasks.filter((t) => {
      if (status === "complete" && !t.completed) return false;
      if (status === "incomplete" && t.completed) return false;
      if (q && !t.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tasks, debouncedQuery, status]);

  const addTask = (title: string, priority: TaskPriority) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now(),
      title: trimmed,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: number, patch: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const deleteTask = (id: number) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <MainLayout
      sidebar={
        <div className="space-y-4">
          <div>
            <h1 className="text-lg font-semibold">Task Manager</h1>
            <p className="text-sm text-slate-600">Create, track, and manage tasks.</p>
          </div>

          <TaskStats total={total} completed={completed} />
          <TaskFilters
            query={query}
            status={status}
            onQueryChange={(v) => {
              setQuery(v);
              if (v === "") setDebouncedQuery("");
            }}
            onStatusChange={setStatus}
          />
          <TaskForm onAdd={addTask} />
        </div>
      }
      main={<TaskList tasks={visibleTasks} onUpdate={updateTask} onDelete={deleteTask} />}
    />
  );
}
