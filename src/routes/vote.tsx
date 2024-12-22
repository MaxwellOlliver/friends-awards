import { createFileRoute } from "@tanstack/react-router";
import { Vote } from "../pages/Vote";

export const Route = createFileRoute("/vote")({
  component: Vote,
});
