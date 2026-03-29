import React from "react";
import { Avatar, Button, Dropdown, Layout, Space, theme, Typography } from "antd";
import type { MenuProps } from "antd";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useAppHeader } from "./useAppHeader";

const { Header } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ collapsed,
  setCollapsed,
}) => {
  const { handleLogout } = useAppHeader();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Meu Perfil",
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: "Configurações",
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => handleLogout(),
    },
  ]

  return (
    <Header
      style={{
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
      }}
    >
      <Button
        type='text'
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />

      <Space size="middle">
        <div style={{ lineHeight: 'normal', textAlign: 'right' }}>
          <Text strong style={{ display: 'block' }}>Admin User</Text>
          <Text type="secondary">admin@example.com</Text>
        </div>

        <Dropdown menu={{ items: userMenuItems}} placement="bottomRight" arrow>
          <Avatar
            size="large"
            style={{ backgroundColor: '#1677ff', cursor: 'pointer' }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};
