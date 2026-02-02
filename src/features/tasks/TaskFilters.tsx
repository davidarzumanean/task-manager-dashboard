import type { TaskStatusFilter } from "@/types/task";
import { Button } from "@/components/ui/Button.tsx";

type TaskFiltersProps = {
  query: string;
  status: TaskStatusFilter;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: TaskStatusFilter) => void;
};

const STATUS_OPTIONS: Array<{ value: TaskStatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "incomplete", label: "Active" },
  { value: "complete", label: "Completed" },
];

export const TaskFilters = ({ query, status, onQueryChange, onStatusChange }: TaskFiltersProps) => {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="text-sm font-medium text-slate-900">Filters</div>

      <div className="mt-3 space-y-3">
        <div>
          <label htmlFor="task-search" className="block text-xs font-medium text-slate-700">
            Search
          </label>
          <input
            id="task-search"
            name="task-search"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search tasks…"
            className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
            autoComplete="off"
          />
        </div>

        <div>
          <div className="block text-xs font-medium text-slate-700">Status</div>
          <div className="mt-1 grid grid-cols-3 gap-2">
            {STATUS_OPTIONS.map((opt) => {
              const isActive = status === opt.value;
              return (
                <Button
                  key={opt.value}
                  onClick={() => onStatusChange(opt.value)}
                  variant={isActive ? "primary" : "secondary"}
                >
                  {opt.label}
                </Button>
              );
            })}
          </div>
        </div>

        {(query.length > 0 || status !== "all") && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              onQueryChange("");
              onStatusChange("all");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};
