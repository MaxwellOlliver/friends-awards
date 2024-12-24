import { Lobby } from "@/modules/session/pages/session/lobby";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/session/$sessionId/lobby")({
  component: Lobby,
});
