import { createRoute } from "@tanstack/react-router";
import { UsersPage } from "../pages/users";
import { layoutRoute } from "./layout";

export const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/usuarios",
  component: UsersPage,
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page) || 1,
    username: search.username,
    first_name: search.first_name,
    last_name: search.last_name,
    email: search.email,
    created_at__gte: search.created_at__gte,
    created_at__lte: search.created_at__lte,
  }),
});
