import { apiFetch } from "@/api/client";

export interface UserDetail {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
  last_login: string | null;
  created_at: string;
}

export const fetchUserById = async (
  userId: number,
): Promise<UserDetail | null> => {
  return await apiFetch<UserDetail>(`/users/${userId}/`);
};
