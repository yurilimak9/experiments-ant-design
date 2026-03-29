import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import { ApiError, apiFetch } from "../../../api/client";

export const useAppHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: destroySession,
    onSuccess: () => {
      queryClient.clear();

      message.success("Sessão encerrada com sucesso.");

      navigate({ to: "/login" });
    },
    onError: (error: ApiError) => {
      message.error(
        `Erro ao encerrar sessão: ${error.message}. ${error.action}`,
      );

      queryClient.clear();
      navigate({ to: "/login" });
    },
  });

  return {
    handleLogout: logoutMutation.mutate,
  };
};

const destroySession = async () => {
  return apiFetch("/sessions/", {
    method: "DELETE",
  });
};
