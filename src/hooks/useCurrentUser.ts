import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/client";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export const fetchCurrentUser = async (): Promise<User | null> => {
  return apiFetch("/sessions/");
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
