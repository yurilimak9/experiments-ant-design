import { createRoute } from "@tanstack/react-router";
import { ForbiddenPage } from "@/pages/403";
import { layoutRoute } from "@/routes/layout";

export const forbiddenRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/403",
  component: ForbiddenPage,
});
