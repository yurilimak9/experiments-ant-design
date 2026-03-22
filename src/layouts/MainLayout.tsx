import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
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
        <Breadcrumb
          items={[
            { title: "Home" },
            { title: "Usuários" },
          ]}
          style={{ margin: "16px" }}
        />
        <Content
          style={{
            margin: "0 16px",
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
