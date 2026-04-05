import { fetchUserById, type UserDetail } from "@/services/user-detail";
import { useQuery } from "@tanstack/react-query";

export const useUserDetail = (userId: number) => {
  const { data, isLoading, isError } = useQuery<UserDetail | null>({
    queryKey: ["userDetail", userId],
    queryFn: () => fetchUserById(userId),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
