import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { MainLayout } from "../layouts/MainLayout";
import { fetchCurrentUser } from "../hooks/useCurrentUser";

export const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_layout",
  component: MainLayout,
  beforeLoad: async ({ context, location }) => {
    try {
      await context.queryClient.fetchQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
        staleTime: 1000 * 60 * 5,
      })
    } catch {
      throw redirect({
        to: "/login",
        search: {
          next: location.href,
        }
      })
    }
  }
})
