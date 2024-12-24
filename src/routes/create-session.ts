import { createFileRoute } from "@tanstack/react-router";
import { CreateSession } from "../pages/CreateSession";

export const Route = createFileRoute("/create-session")({
  component: CreateSession,
});
