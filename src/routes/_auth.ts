import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      context.auth?.logout();

      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
