import { AuthStore } from "@/store/auth-store";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterWithContext {
  auth?: AuthStore;
}

export const Route = createRootRouteWithContext<RouterWithContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="w-full flex justify-center items-center bg-[#fff] dark:bg-[#161616] min-h-[100dvh] text-[#333] dark:text-white">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
