import { QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import "./global.css";

const queryClient = new QueryClient();

router.update({
  context: {
    queryClient,
  },
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
