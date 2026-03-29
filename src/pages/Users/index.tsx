import React, { useState } from "react";
import { Alert, Button, Space, Table, Tooltip, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../services/users";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { UserFormModal } from "./modals/create";

const { Text, Title } = Typography;

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["usersList"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  const handleOpenCreateModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(true);
  }

  const handleOpenEditModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  }

  const columns: ColumnsType<User> = [
    {
      title: "ID do Usuário",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <Text>{id}</Text>
      ),
    },
    {
      title: "Nome de Usuário",
      dataIndex: "username",
      key: "username",
      render: (username: string) => (
        <Text copyable={{ text: username }}>{username}</Text>
      ),
    },
    {
      title: "Nome",
      dataIndex: "first_name",
      key: "first_name",
      render: (first_name: string) => (
        <Text>{first_name}</Text>
      ),
    },
    {
      title: "Sobrenome",
      dataIndex: "last_name",
      key: "last_name",
      render: (last_name: string) => (
        <Text>{last_name}</Text>
      ),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <Text copyable={{ text: email }}>{email}</Text>
      ),
    },
    {
      title: "Data de Criação",
      dataIndex: "created_at",
      key: "created_at",
      responsive: ["lg"],
      render: (dateString: string) =>
        new Date(dateString).toLocaleDateString("pt-BR")
    },
    {
      title: "Ações",
      key: "action",
      width: 100,
      align: "right",
      render: (_, record) => (
        <Space size='small'>
          <Tooltip title='Editar'>
            <Button
              type='text'
              icon={<EditOutlined />}
              size='small'
              onClick={() => handleOpenEditModal(record.id)}
            />
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={4}>Gerenciamento de usuários</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenCreateModal}
        >
          Novo Usuário
        </Button>
      </div>

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

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={selectedUserId}
      />
    </Space>
  );
};
