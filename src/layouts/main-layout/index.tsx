import { Outlet } from "@tanstack/react-router";
import { Breadcrumb, Layout } from "antd";
import { useMain } from "./useMain";
import { SideMenu } from "./components/side-menu";
import { Header } from "./components/header";

const { Content } = Layout;

export const MainLayout = () => {
  const {
    location,
    colorBgContainer,
    borderRadiusLG,
    collapsed,
    breadcrumbItems,
    setCollapsed,
    navigate,
  } = useMain();

  const renderBreadcrumbItem = (path: string, title: string, index: number) => {
    if (index < breadcrumbItems.length - 1) {
      return (
        <button
          type="button"
          style={{
            cursor: "pointer",
            color: "#1677ff",
            background: "none",
            border: "none",
            padding: 0,
          }}
          onClick={() => navigate({ to: path })}
        >
          {title}
        </button>
      );
    }

    return title;
  };

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
          style={{ margin: "16px" }}
          items={breadcrumbItems.map(({ path, title }, index) => ({
            title: renderBreadcrumbItem(path, title, index),
          }))}
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
