import { Session } from "@/pages/Session";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/session")({
  component: Session,
});
