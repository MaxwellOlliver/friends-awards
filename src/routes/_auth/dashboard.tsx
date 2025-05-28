import { MainLayout } from "@/layout/components/MainLayout";
import { Sidebar } from "@/layout/components/Sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Menu } from "lucide-react";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
  notFoundComponent: () => <Navigate to="/dashboard/home" />,
});

function RouteComponent() {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <MainLayout>
      <header className="flex justify-between items-center py-4 lg:hidden">
        <button onClick={toggleSidebar}>
          <Menu className="size-8" />
        </button>
      </header>
      <div className="flex gap-8 w-full">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
