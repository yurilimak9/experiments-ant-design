import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { message } from "antd";
import { useTheme } from "@/contexts/theme-context";
import { type ApiError, apiFetch } from "../../../../api/client";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

export const useAppHeader = () => {
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();

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
    theme,
    user,
    isLoadingUser,
    setTheme,
    handleLogout: logoutMutation.mutate,
  };
};

const destroySession = async () => {
  return apiFetch("/sessions/", {
    method: "DELETE",
  });
};
