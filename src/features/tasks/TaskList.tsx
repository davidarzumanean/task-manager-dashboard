import type { Task } from "@/types/task";
import { TaskItem } from "@/features/tasks/TaskItem";

type TaskListProps = {
  tasks: Task[];
  onUpdate: (id: number, patch: Partial<Task>) => void;
  onDelete: (id: number) => void;
};

export const TaskList = ({ tasks, onUpdate, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <div className="text-sm font-medium text-slate-900">No tasks yet</div>
        <div className="mt-1 text-sm text-slate-600">
          Add a task from the left panel to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface">
      <ul className="divide-y divide-slate-100">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};
