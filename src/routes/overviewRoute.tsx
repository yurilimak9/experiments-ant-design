import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "./layoutRoute";

export const overviewRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => <h1>Dashboard (Home)</h1>
})
