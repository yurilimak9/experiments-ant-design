import { EMPTY_RESPONSE } from "@/constants/pagination";
import type { Filters } from "@/pages/users/modals/filters";
import type { PaginatedReponse } from "@/types/pagination";
import { apiFetch } from "../api/client";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export const fetchUsers = async (
  page: number = 1,
  filters: Filters = {},
): Promise<PaginatedReponse<User>> => {
  const params = new URLSearchParams({ page: page.toString() });

  if (filters.username) {
    params.append("username", filters.username);
  }

  if (filters.first_name) {
    params.append("first_name", filters.first_name);
  }

  if (filters.last_name) {
    params.append("last_name", filters.last_name);
  }

  if (filters.email) {
    params.append("email", filters.email);
  }

  if (filters.created_at) {
    params.append(
      "created_at__gte",
      filters.created_at[0].format("YYYY-MM-DD"),
    );
    params.append(
      "created_at__lte",
      filters.created_at[1].format("YYYY-MM-DD"),
    );
  }

  const response = await apiFetch<PaginatedReponse<User>>(`/users/?${params}`);

  return response ?? EMPTY_RESPONSE;
};
