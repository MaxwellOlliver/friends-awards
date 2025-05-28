import { accountService } from "@/modules/common/services/account-service";
import { AuthStore } from "@/store/auth-store";
import { tryCatch } from "@/utils/error";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterWithContext {
  auth?: AuthStore;
}

export const Route = createRootRouteWithContext<RouterWithContext>()({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    const { auth } = context;

    if (auth?.isAuthenticated && !auth.user) {
      const [error, data] = await tryCatch(accountService.getLoggedProfile());

      if (error) {
        auth.setIsAuthenticated(false);
        return;
      }

      auth.setUser(data.participant);
    }
  },
});

function RootComponent() {
  return (
    <div className="w-[calc(100vw-8px)] flex justify-center items-center min-h-[100dvh] text-[#333] dark:text-white">
      <ScrollRestoration />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
