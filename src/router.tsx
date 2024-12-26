import {
  createRouteMask,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./store/auth-store";

const createSessionMask = createRouteMask({
  routeTree,
  from: "/dashboard/create-session",
  to: "/dashboard/my-sessions",
});

const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
  },
  routeMasks: [createSessionMask],
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
