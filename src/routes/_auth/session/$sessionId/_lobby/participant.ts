import { Participant } from "@/modules/session/pages/lobby/participant";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/session/$sessionId/_lobby/participant"
)({
  component: Participant,
});
