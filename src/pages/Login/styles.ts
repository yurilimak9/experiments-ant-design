import type { CSSProperties } from "react";

interface LoginStyles {
  container: CSSProperties;
  card: CSSProperties;
}

export const styles: LoginStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    width: 350,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
};
