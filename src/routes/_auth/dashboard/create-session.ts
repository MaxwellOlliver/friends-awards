import { CreateSession } from "@/modules/dashboard/pages/sessions/create-session";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/create-session")({
  component: CreateSession,
});
