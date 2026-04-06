import type { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { layoutRoute } from "./layout";
import { loginRoute } from "./login";
import { overviewRoute } from "./overview";
import { rootRoute } from "./root";
import { userDetailRoute, usersRoute } from "./users";

const routeTree = rootRoute.addChildren([
  loginRoute,
  layoutRoute.addChildren([overviewRoute, usersRoute, userDetailRoute]),
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined as unknown as QueryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
