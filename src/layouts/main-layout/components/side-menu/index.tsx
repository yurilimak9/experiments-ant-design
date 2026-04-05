import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type React from "react";
import iconImg from "@/assets/icon.png";
import logoImg from "@/assets/logo.png";
import { styles } from "@/layouts/main-layout/components/side-menu/styles";

const { Sider } = Layout;

interface SideMenuProps {
  collapsed: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  collapsed,
  currentPath,
  onNavigate,
}) => {
  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/usuarios",
      icon: <UserOutlined />,
      label: "Usuários",
    },
    {
      key: "/pedidos",
      icon: <FileTextOutlined />,
      label: "Pedidos",
      children: [
        {
          key: "/pedidos/ativos",
          label: "Ativos",
        },
      ],
    },
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
      <div style={styles.logoContainer}>
        <img
          src={collapsed ? iconImg : logoImg}
          alt="Logotipo"
          style={{
            ...styles.logoImage,
            maxHeight: collapsed ? "32px" : "",
            maxWidth: collapsed ? "32px" : "120px",
          }}
        />
      </div>
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
