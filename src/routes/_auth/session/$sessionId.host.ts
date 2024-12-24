import { Host } from "@/modules/session/pages/session/host";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/session/$sessionId/host")({
  component: Host,
});
