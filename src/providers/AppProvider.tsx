import { ThemeContext } from "@/contexts/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, theme } from "antd";
import ptBr from "antd/locale/pt_BR";
import type React from "react";
import { useState } from "react";

type Theme = "light" | "dark";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "light",
  );

  const handleSetTheme = (newTheme: Theme) => {
    if (!document.startViewTransition) {
      setCurrentTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      return;
    }

    document.startViewTransition(() => {
      setCurrentTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, setTheme: handleSetTheme }}
    >
      <ConfigProvider
        locale={ptBr}
        theme={{
          algorithm:
            currentTheme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          token: {
            motion: true,
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
