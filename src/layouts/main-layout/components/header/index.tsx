import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Segmented,
  Skeleton,
  Space,
  Typography,
} from "antd";
import type React from "react";
import { useHeaderStyles } from "@/layouts/main-layout/components/header/useHeaderStyles";
import { useAppHeader } from "./useHeader";

const { Header: HeaderAnt } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Header: React.FC<AppHeaderProps> = ({
  collapsed,
  setCollapsed,
}) => {
  const {
    theme: currentTheme,
    user,
    isLoadingUser,
    setTheme,
    handleLogout,
  } = useAppHeader();

  const styles = useHeaderStyles();

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
      key: "theme",
      label: (
        <Segmented
          block
          size="small"
          value={currentTheme}
          onClick={(e) => e.stopPropagation()}
          onChange={(value) => setTheme(value as "light" | "dark")}
          options={[
            { value: "light", icon: <SunOutlined /> },
            { value: "dark", icon: <MoonOutlined /> },
          ]}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Sair",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => handleLogout(),
    },
  ];

  if (isLoadingUser) {
    return <Skeleton active />;
  }

  if (!user) {
    return null;
  }

  return (
    <HeaderAnt style={styles.header}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <Space size="middle">
        <div style={{ lineHeight: "normal", textAlign: "right" }}>
          <Text strong style={{ display: "block" }}>
            {user.first_name} {user.last_name}
          </Text>
          <Text type="secondary">{user.email}</Text>
        </div>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Avatar
            size="large"
            style={{ backgroundColor: "#1677ff", cursor: "pointer" }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </HeaderAnt>
  );
};
