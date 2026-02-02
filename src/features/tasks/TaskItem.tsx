import { useState } from "react";
import type { Task, TaskPriority } from "@/types/task";
import { PrioritySelect } from "@/features/tasks/PrioritySelect.tsx";
import { Button } from "@/components/ui/Button.tsx";

type TaskPatch = Partial<Pick<Task, "title" | "priority" | "completed">>;

type TaskItemProps = {
  task: Task;
  onUpdate: (id: number, patch: TaskPatch) => void;
  onDelete: (id: number) => void;
};

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const PRIORITY_BADGE_CLASS: Record<TaskPriority, string> = {
  high: "border-priority-high text-priority-high",
  medium: "border-priority-medium text-priority-medium",
  low: "border-priority-low text-priority-low",
};

export const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const isDone = task.completed;

  const [isEditing, setIsEditing] = useState(false);

  const startEdit = () => {
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <li className="flex items-start gap-3 p-3 sm:items-center">
      <input
        aria-label={isDone ? "Mark task as incomplete" : "Mark task as complete"}
        type="checkbox"
        checked={isDone}
        onChange={() => onUpdate(task.id, { completed: !task.completed })}
        className="mt-1 h-4 w-4 cursor-pointer accent-slate-900 sm:mt-0"
      />

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <TaskItemEdit
            task={task}
            onSave={(patch) => {
              onUpdate(task.id, patch);
              setIsEditing(false);
            }}
            onCancel={cancelEdit}
            onDelete={() => onDelete(task.id)}
          />
        ) : (
          <TaskItemView task={task} isDone={isDone} />
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isEditing && (
          <>
            <Button variant="text" onClick={startEdit} aria-label="Edit task" title="Edit">
              Edit
            </Button>
            <Button
              variant="text"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
              title="Delete"
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

const TaskItemView = ({ task, isDone }: { task: Task; isDone: boolean }) => {
  return (
    <>
      <div
        className={
          "truncate text-sm font-medium " +
          (isDone ? "text-task-completed line-through" : "text-slate-900")
        }
        title={task.title}
      >
        {task.title}
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span
          className={
            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium " +
            PRIORITY_BADGE_CLASS[task.priority]
          }
        >
          {PRIORITY_LABEL[task.priority]}
        </span>

        <span className="text-xs text-slate-500">{new Date(task.createdAt).toLocaleString()}</span>
      </div>
    </>
  );
};

type TaskItemEditProps = {
  task: Task;
  onSave: (patch: { title: string; priority: TaskPriority }) => void;
  onCancel: () => void;
  onDelete: () => void;
};

const TaskItemEdit = ({ task, onSave, onCancel, onDelete }: TaskItemEditProps) => {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const trimmed = title.trim();
  const showError = hasSubmitted && trimmed.length === 0;

  const submit = () => {
    setHasSubmitted(true);
    if (!trimmed) return;
    onSave({ title: trimmed, priority });
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onCancel();
              if (e.key === "Enter") submit();
            }}
            className={
              "w-full rounded-md border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 " +
              (showError ? "border-red-500" : "border-border")
            }
            aria-invalid={showError || undefined}
            aria-label="Task title"
            autoComplete="off"
            autoFocus
          />
          {showError && <div className="mt-1 text-xs text-red-600">Title is required.</div>}
        </div>

        <PrioritySelect priority={priority} onChange={setPriority} />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="grow text-xs text-slate-500">Enter saves. Esc cancels.</span>
        <Button variant="text" onClick={onDelete} aria-label="Delete task" title="Delete">
          Delete
        </Button>
        <Button variant="primary" onClick={submit}>
          Save
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
