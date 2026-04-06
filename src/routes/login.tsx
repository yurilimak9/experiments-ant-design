import { createRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/Login";
import { rootRoute } from "./root";

interface LoginSearch {
  next?: string;
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      next: search.next as string | undefined,
    };
  },
});
