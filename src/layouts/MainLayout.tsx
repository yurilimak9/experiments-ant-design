import React, { useState } from "react";
import { Layout, theme } from "antd";
import { SideMenu } from "../components/layout/SideMenu";
import { AppHeader } from "../components/layout/AppHeader";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";

const { Content } = Layout;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
    },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu
        collapsed={collapsed}
        currentPath={location.pathname}
        onNavigate={(to) => navigate({ to })}
      />
      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
