import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./store/auth-store";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function RouterApp() {
  const auth = useAuthStore();

  return <RouterProvider router={router} context={{ auth }} />;
}
