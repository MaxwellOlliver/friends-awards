import { createFileRoute } from "@tanstack/react-router";
import { VoteRegistered } from "../../pages/VoteRegistered";

export const Route = createFileRoute("/vote-registered/$session")({
  component: VoteRegistered,
});
