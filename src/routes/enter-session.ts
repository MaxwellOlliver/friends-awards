import { createFileRoute } from "@tanstack/react-router";
import { EnterSession } from "../pages/EnterSession";

export const Route = createFileRoute("/enter-session")({
  component: EnterSession,
});
