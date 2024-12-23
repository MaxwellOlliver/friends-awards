import { Home } from "@/modules/common/pages/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
  component: Home,
});
