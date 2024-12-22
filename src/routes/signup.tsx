import { CreateAccount } from "@/modules/common/pages/account/create-account";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: CreateAccount,
});
