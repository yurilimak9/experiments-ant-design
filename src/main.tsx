import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./providers/AppProvider.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Elemento 'root' não encontrado no HTML.");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
