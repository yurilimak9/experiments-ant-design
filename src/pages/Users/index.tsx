import React from "react";
import { Alert, Avatar, Button, Space, Table, Tag, Tooltip, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, type User } from "../../services/users";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, GlobalOutlined, UserOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

export const UsersPage: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const columns: ColumnsType<User> = [
    {
      title: "User",
      key: "user",
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text strong>{record.name}</Text>
            <Text type='secondary' style={{ fontSize: 12 }}>
              {record.companyName}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text copyable={{ text: record.email }}>{record.email}</Text>
          <Link href={record.website} target='_blank' style={{ fontSize: 12 }}>
            <GlobalOutlined style={{ marginRight: 4 }} />
            Website
          </Link>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role: string) => {
        const colors = {
          ADMIN: "geekblue",
          EDITOR: "purple",
          VIEWER: "default",
        };
        return <Tag color={colors[role as keyof typeof colors]}>{role}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => (
        <Tag color={status === "active" ? "success" : "error"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      responsive: ["lg"], // Esconde em telas menores (Mobile First)
      render: (date: Date) =>
        date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      title: "Actions",
      key: "action",
      width: 100,
      align: "right",
      render: () => (
        <Space size='small'>
          <Tooltip title='Editar'>
            <Button type='text' icon={<EditOutlined />} size='small' />
          </Tooltip>
          <Tooltip title='Excluir'>
            <Button type='text' danger icon={<DeleteOutlined />} size='small' />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
      {isError && (
        <Alert
          title='Erro ao carregar usuários'
          description='Não foi possível carregar os usuários. Por favor, tente novamente mais tarde.'
          type='error'
          showIcon
        />
      )}

      <Table
        dataSource={data}
        columns={columns}
        rowKey='id'
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </Space>
  );
};
