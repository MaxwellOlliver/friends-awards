import { Home } from "@/modules/dashboard/pages/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/home")({
  component: Home,
});
