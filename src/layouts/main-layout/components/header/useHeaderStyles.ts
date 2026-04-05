import { theme } from "antd";
import type { CSSProperties } from "react";

interface HeaderStyles {
  header: CSSProperties;
}

export const useHeaderStyles = (): HeaderStyles => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return {
    header: {
      padding: 0,
      background: colorBgContainer,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: 24,
      position: "sticky",
      top: 0,
      zIndex: 1,
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
    },
  };
};
