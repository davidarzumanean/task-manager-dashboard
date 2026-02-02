import { useMemo, useState } from "react";
import type { SyntheticEvent } from "react";
import type { TaskPriority } from "@/types/task";
import { PrioritySelect } from "@/features/tasks/PrioritySelect.tsx";
import { Button } from "@/components/ui/Button.tsx";

type TaskFormProps = {
  onAdd: (title: string, priority: TaskPriority) => void;
};

export const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const trimmedTitle = useMemo(() => title.trim(), [title]);
  const showError = hasSubmitted && trimmedTitle.length === 0;

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!trimmedTitle) return;

    onAdd(trimmedTitle, priority);
    setTitle("");
    setHasSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="task-priority" className="block text-sm font-medium text-slate-900">
          Priority
        </label>
        <PrioritySelect
          id="task-priority"
          priority={priority}
          className="w-full"
          onChange={setPriority}
        />
      </div>

      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-slate-900">
          Task title
        </label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Complete coding test"
          className={
            "mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none " +
            (showError ? "border-red-500" : "border-border") +
            " bg-surface focus:ring-2 focus:ring-slate-300"
          }
          autoComplete="off"
        />
        {showError ? (
          <p className="mt-1 text-xs text-red-600">Title is required.</p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">Press Enter to add quickly.</p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Add task
      </Button>
    </form>
  );
};
