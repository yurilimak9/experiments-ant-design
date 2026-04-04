import { Outlet } from "@tanstack/react-router";
import { Breadcrumb, Layout } from "antd";

import { Header } from "@/layouts/main-layout/components/header";
import { SideMenu } from "@/layouts/main-layout/components/side-menu";
import { useMain } from "@/layouts/main-layout/useMain";

const { Content } = Layout;

export const MainLayout = () => {
  const {
    colorBgContainer,
    borderRadiusLG,
    collapsed,
    setCollapsed,
    navigate,
    location,
  } = useMain();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu
        collapsed={collapsed}
        currentPath={location.pathname}
        onNavigate={(to) => navigate({ to })}
      />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Breadcrumb
          items={[{ title: "Home" }, { title: "Usuários" }]}
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
