import { apiFetch } from "../api/client";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

interface UsersResponse {
  users: User[];
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiFetch<UsersResponse>("/users/");

  return response?.users || [];
};
