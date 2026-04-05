import { useLocation, useNavigate } from "@tanstack/react-router";
import { theme } from "antd";
import { useState } from "react";
import { ROUTE_LABELS } from "@/constants/route";

export const useMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  const breadcrumbItems = location.pathname
    .split("/")
    .filter(Boolean)
    .reduce<{ path: string; title: string }[]>(
      (acc, _segment, index, arr) => {
        const path = `/${arr.slice(0, index + 1).join("/")}`;
        const label = ROUTE_LABELS[path];

        if (label) acc.push({ path, title: label });

        return acc;
      },
      [{ path: "/", title: "Home" }],
    );

  return {
    location,
    colorBgContainer,
    borderRadiusLG,
    collapsed,
    breadcrumbItems,
    setCollapsed,
    navigate,
  };
};
