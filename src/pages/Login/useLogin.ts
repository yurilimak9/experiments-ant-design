import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import { ApiError, apiFetch } from "../../api/client";

export interface LoginCredentials {
  username?: string;
  password?: string;
}

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      message.success("Login realizado com sucesso!");

      navigate({ to: "/" });
    },
    onError: (error: ApiError) => {
      const errorMessage = `${error.message} ${error.action}`;

      message.error(errorMessage);
    },
  });

  return {
    isLoading: loginMutation.isPending,
    handleLoginSubmit: loginMutation.mutate,
  };
};

const createSession = async (credentials: LoginCredentials) => {
  return apiFetch("/sessions/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};
