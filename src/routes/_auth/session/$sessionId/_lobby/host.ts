import { Host } from "@/modules/session/pages/lobby/host";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/session/$sessionId/_lobby/host")({
  component: Host,
});
