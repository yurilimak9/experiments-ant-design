import { redirect } from "@tanstack/react-router";
import type { RouterContext } from "@/routes/root";

export function requirePermission(permission: string) {
  return ({ context }: { context: RouterContext }) => {
    if (!context.user?.permissions.includes(permission)) {
      throw redirect({ to: "/403" });
    }
  };
}
