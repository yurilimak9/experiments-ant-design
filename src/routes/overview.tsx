import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "./layout";

export const overviewRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => <h1>Dashboard (Home)</h1>,
});
