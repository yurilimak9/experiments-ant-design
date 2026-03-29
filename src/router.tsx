import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { MainLayout } from "./layouts/MainLayout";
import { UsersPage } from "./pages/Users";
import { LoginPage } from "./pages/Login";
import { apiFetch } from "./api/client";
import type { QueryClient } from "@tanstack/react-query";

const fetchCurrentSession = async () => {
  return apiFetch("/sessions/");
}

interface MyRouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      next: search.next as string | undefined,
    }
  }
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_layout",
  component: MainLayout,
  beforeLoad: async ({ context, location }) => {
    try {
      await context.queryClient.fetchQuery({
        queryKey: ["currentSession"],
        queryFn: fetchCurrentSession,
        staleTime: 1000 * 60 * 5,
      })
    } catch {
      throw redirect({
        to: "/login",
        search: {
          next: location.href,
        }
      })
    }
  }
})

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => <h1>Dashboard (Home)</h1>
})

const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/users",
  component: UsersPage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  layoutRoute.addChildren([
    indexRoute,
    usersRoute,
  ])
])

export const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
  },
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
