import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";

const { Sider } = Layout;

interface SideMenuProps {
  collapsed: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ collapsed, currentPath, onNavigate }) => {
  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "Usuários",
    }
  ]
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <div className="demo-logo-vertical" style={{ height: 64, margin: 16, background: 'rgba(0,0,0,0.05)', borderRadius: 6 }} />
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[currentPath]}
        items={items}
        onClick={({ key }) => onNavigate(key)}
      />
    </Sider>
  );
};
