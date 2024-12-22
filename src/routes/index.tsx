import { Login } from "@/modules/common/pages/login";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: Login,
  validateSearch: loginSearchSchema,
});
