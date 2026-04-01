import { createRoute } from "@tanstack/react-router";
import { UsersPage } from "../pages/Users";
import { layoutRoute } from "./layout";

export const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/users",
  component: UsersPage,
});
