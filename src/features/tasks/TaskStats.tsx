type TaskStatsProps = {
  total: number;
  completed: number;
};

export const TaskStats = ({ total, completed }: TaskStatsProps) => {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-900">Tasks</div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-600">Total:</span>
          <span className="font-semibold text-slate-900">{total}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">Completed:</span>
          <span className="font-semibold text-slate-900">{completed}</span>
        </div>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-100">
        <div className="h-full bg-slate-900" style={{ width: `${percent}%` }} aria-hidden />
      </div>

      <div className="mt-1 text-xs text-slate-500">
        {total === 0 ? "No tasks yet." : `${percent}% complete`}
      </div>
    </div>
  );
};
