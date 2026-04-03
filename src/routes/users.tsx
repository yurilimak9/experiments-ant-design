import { createRoute } from "@tanstack/react-router";
import { UsersPage } from "../pages/users";
import { layoutRoute } from "./layout";

export const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/usuarios",
  component: UsersPage,
});
