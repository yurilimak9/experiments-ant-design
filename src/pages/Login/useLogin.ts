/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { message } from "antd";

export interface LoginCredentials {
  username?: string;
  password?: string;
}

export interface ApiErrorResponse {
  name: string;
  message: string;
  action: string;
  status_code: number;
}

class SessionError extends Error {
  public action: string;
  public statusCode: number;

  constructor(errorData: ApiErrorResponse) {
    super(errorData.message);

    this.name = errorData.name;
    this.action = errorData.action;
    this.statusCode = errorData.status_code;
  }
}

const createSession = async (credentials: LoginCredentials) => {
  const reponse = await fetch("http://localhost:8000/api/v1/sessions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  if (!reponse.ok) {
    const errorData = (await reponse.json()) as ApiErrorResponse;

    throw new SessionError(errorData);
  }

  return reponse.json();
};

export const useLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation<any, SessionError, LoginCredentials>({
    mutationFn: createSession,
    onSuccess: () => {
      message.success("Login realizado com sucesso!");

      navigate({ to: "/" });
    },
    onError: (error) => {
      const errorMessage = `${error.message} ${error.action}`;

      message.error(errorMessage);
    },
  });

  return {
    isLoading: loginMutation.isPending,
    handleLoginSubmit: loginMutation.mutate,
  };
};
