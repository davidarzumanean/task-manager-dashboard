export type TaskPriority = "high" | "medium" | "low";

export type TaskStatusFilter = "all" | "complete" | "incomplete";

export type Task = {
  id: number;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string; // ISO
};

export const TASK_STATUS_FILTERS: ReadonlyArray<TaskStatusFilter> = [
  "all",
  "complete",
  "incomplete",
];
