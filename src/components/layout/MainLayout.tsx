import type { ReactNode } from "react";

type MainLayoutProps = {
  sidebar: ReactNode;
  main: ReactNode;
};

export const MainLayout = ({ sidebar, main }: MainLayoutProps) => {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 p-4">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4">{sidebar}</aside>
        <main className="rounded-xl border border-slate-200 bg-white p-4">{main}</main>
      </div>
    </div>
  );
};
