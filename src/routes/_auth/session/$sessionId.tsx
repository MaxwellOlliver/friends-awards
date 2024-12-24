import { SessionProvider } from "@/modules/session/contexts/session-context";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/session/$sessionId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SessionProvider>
      <Outlet />
    </SessionProvider>
  );
}
