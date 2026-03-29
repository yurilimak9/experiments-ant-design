import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { MainLayout } from "./layouts/MainLayout";
import { UsersPage } from "./pages/Users";
import { LoginPage } from "./pages/Login";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_layout",
  component: MainLayout,
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

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
