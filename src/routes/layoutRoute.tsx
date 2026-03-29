import { createRoute, redirect } from "@tanstack/react-router";
import { apiFetch } from "../api/client";
import { rootRoute } from "./rootRoute";
import { MainLayout } from "../layouts/MainLayout";

const fetchCurrentSession = async () => {
  return apiFetch("/sessions/");
}

export const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_layout",
  component: MainLayout,
  beforeLoad: async ({ context, location }) => {
    try {
      await context.queryClient.fetchQuery({
        queryKey: ["currentSession"],
        queryFn: fetchCurrentSession,
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
