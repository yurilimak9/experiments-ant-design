import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { User } from "@/hooks/useCurrentUser";

export interface RouterContext {
  queryClient: QueryClient;
  user: User | null;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
