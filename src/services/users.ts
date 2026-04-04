import { EMPTY_RESPONSE } from "@/constants/pagination";
import type { Filters } from "@/pages/users/modals/filters";
import type { PaginatedReponse } from "@/types/pagination";
import { API_BASE_URL, apiFetch } from "../api/client";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

const filtersToQueryParams = (filters: Filters): URLSearchParams => {
  const params = new URLSearchParams();

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

  return params;
};

export const fetchUsers = async (
  page: number = 1,
  filters: Filters = {},
): Promise<PaginatedReponse<User>> => {
  const params = filtersToQueryParams(filters);

  params.append("page", page.toString());

  const response = await apiFetch<PaginatedReponse<User>>(`/users/?${params}`);

  return response ?? EMPTY_RESPONSE;
};

export const exportUsersCSV = async (filters: Filters = {}): Promise<void> => {
  const params = filtersToQueryParams(filters);

  const response = await fetch(`${API_BASE_URL}/users/export/?${params}`, {
    credentials: "include",
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `usuarios_${new Date().toISOString()}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};
