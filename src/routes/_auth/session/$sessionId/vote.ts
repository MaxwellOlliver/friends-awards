import { Vote } from "@/pages/Vote";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/session/$sessionId/vote")({
  component: Vote,
});
