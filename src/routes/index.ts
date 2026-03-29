import { createRouter } from "@tanstack/react-router";
import { layoutRoute } from "./layoutRoute";
import { loginRoute } from "./loginRoute";
import { overviewRoute } from "./overviewRoute";
import { rootRoute } from "./rootRoute";
import { usersRoute } from "./usersRoute";

const routeTree = rootRoute.addChildren([
  loginRoute,
  layoutRoute.addChildren([overviewRoute, usersRoute]),
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
