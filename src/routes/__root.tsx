import { setupAxios } from "@/lib/axios";
import { AuthStore } from "@/store/auth-store";
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useLayoutEffect } from "react";

interface RouterWithContext {
  auth?: AuthStore;
}

export const Route = createRootRouteWithContext<RouterWithContext>()({
  component: RootComponent,
});

function RootComponent() {
  useLayoutEffect(() => {
    setupAxios(() =>
      redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      })
    );
  }, []);

  return (
    <div className="w-full flex justify-center items-center bg-[#fff] dark:bg-[#161616] min-h-[100dvh] text-[#333] dark:text-white">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
