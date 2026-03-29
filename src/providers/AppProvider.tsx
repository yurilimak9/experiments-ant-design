import React from "react";
import { ConfigProvider, theme } from "antd";
import ptBr from "antd/locale/pt_BR";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from "../lib/react-query";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isDarkMode = false;

  return (
    <ConfigProvider
      locale={ptBr}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
};
