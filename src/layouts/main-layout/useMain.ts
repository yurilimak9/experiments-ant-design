import { useLocation, useNavigate } from "@tanstack/react-router";
import { theme } from "antd";
import { useState } from "react";

export const useMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  return {
    colorBgContainer,
    borderRadiusLG,
    collapsed,
    setCollapsed,
    navigate,
    location,
  };
};
