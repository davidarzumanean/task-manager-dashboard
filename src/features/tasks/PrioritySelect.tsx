import type { TaskPriority } from "@/types/task.ts";

type PrioritySelectProps = {
  id?: string;
  priority: TaskPriority;
  className?: string;
  onChange: (priority: TaskPriority) => void;
};

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const TASK_PRIORITIES: ReadonlyArray<TaskPriority> = ["high", "medium", "low"];

export const PrioritySelect = ({
  id = "priority-select",
  priority,
  className = "",
  onChange,
}: PrioritySelectProps) => {
  return (
    <select
      id={id}
      name="priority"
      value={priority}
      onChange={(e) => onChange(e.target.value as TaskPriority)}
      className={`mt-1 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 ${className}`}
    >
      {TASK_PRIORITIES.map((p) => (
        <option key={p} value={p}>
          {PRIORITY_LABEL[p]}
        </option>
      ))}
    </select>
  );
};
