import { QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import "./global.css";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const queryClient = new QueryClient();

function App() {
  const { data: user } = useCurrentUser();

  return (
    <RouterProvider
      router={router}
      context={{ queryClient, user: user ?? null }}
    />
  );
}

export default App;
