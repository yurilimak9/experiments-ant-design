import { createRoute } from "@tanstack/react-router";
import { UserDetailPage } from "@/pages/user-detail";
import { UsersPage } from "@/pages/users";
import { requirePermission } from "@/routes/guards";
import { layoutRoute } from "./layout";

export const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/usuarios",
  component: UsersPage,
  validateSearch: (
    search: Record<string, unknown>,
  ): Partial<{
    page: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at__gte: string;
    created_at__lte: string;
  }> => ({
    page: Number(search.page) || 1,
    username: search.username as string | undefined,
    first_name: search.first_name as string | undefined,
    last_name: search.last_name as string | undefined,
    email: search.email as string | undefined,
    created_at__gte: search.created_at__gte as string | undefined,
    created_at__lte: search.created_at__lte as string | undefined,
  }),
});

export const userDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/usuarios/$userId",
  beforeLoad: requirePermission("dash.users.view_detail"),
  component: UserDetailPage,
});
