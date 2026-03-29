import { createRoute } from "@tanstack/react-router";
import { UsersPage } from "../pages/Users";
import { layoutRoute } from "./layoutRoute";

export const usersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/users",
  component: UsersPage,
})
