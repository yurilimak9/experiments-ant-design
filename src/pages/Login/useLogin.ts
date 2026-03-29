import { message } from "antd";
import { useState } from "react";

export interface LoginCredentials {
  username?: string;
  password?: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginSubmit = async (values: LoginCredentials) => {
    console.log("Login values:", values);
    setIsLoading(true);

    try {
      // Simulação de chamada de API para autenticação
      await new Promise((resolve) => setTimeout(resolve, 1500));

      message.success("Login realizado com sucesso!");
      // Redirecionamento ou atualização de estado de autenticação ocorreria aqui
    } catch {
      message.error("Falha ao autenticar. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLoginSubmit,
  };
};
