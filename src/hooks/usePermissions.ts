import { useCurrentUser } from "@/hooks/useCurrentUser";

export const usePermissions = () => {
  const { data: user } = useCurrentUser();

  const hasPermission = (permission: string) => {
    return user?.permissions.includes(permission);
  };

  const hasAllPermissions = (permissions: string[]) => {
    return permissions.every(hasPermission);
  };

  return {
    hasPermission,
    hasAllPermissions,
  };
};
