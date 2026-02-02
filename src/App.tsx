import { MainLayout } from "@/components/layout/MainLayout";

export default function App() {
  return (
    <MainLayout
      sidebar={<div className="text-sm text-slate-600">Sidebar</div>}
      main={<div className="text-sm text-slate-600">Main</div>}
    />
  );
}
