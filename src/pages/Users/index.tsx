import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiltersModal, UserFormModal } from "./modals";
import { type User, useUsers } from "./useUsers";

const { Text } = Typography;

export const UsersPage = () => {
  const {
    isModalOpen,
    isFilterModalOpen,
    selectedUserId,
    data,
    isLoading,
    isError,
    isExporting,
    setCurrentPage,
    setIsModalOpen,
    setIsFilterModalOpen,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleApplyFilters,
    handleExportCSV,
    navigate,
  } = useUsers();

  const columns: ColumnsType<User> = [
    {
      title: "ID do Usuário",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <Button
          type="link"
          onClick={() =>
            navigate({
              to: "/usuarios/$userId",
              params: { userId: String(id) },
            })
          }
        >
          {id}
        </Button>
      ),
    },
    {
      title: "Nome de Usuário",
      dataIndex: "username",
      key: "username",
      render: (username: string) => (
        <Text copyable={{ text: username }}>@{username}</Text>
      ),
    },
    {
      title: "Nome",
      dataIndex: "first_name",
      key: "first_name",
      render: (first_name: string) => <Text>{first_name}</Text>,
    },
    {
      title: "Sobrenome",
      dataIndex: "last_name",
      key: "last_name",
      render: (last_name: string) => <Text>{last_name}</Text>,
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
        new Date(dateString).toLocaleDateString("pt-BR"),
    },
    {
      title: "Ações",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleOpenEditModal(record.id)}
            />
          </Tooltip>

          <Popconfirm
            title="Tem certeza que deseja excluir este usuário?"
            description="Esta ação não pode ser desfeita."
            onConfirm={() => console.log("Usuário excluído:", record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
      {isError && (
        <Alert
          title="Erro ao carregar usuários"
          description="Não foi possível carregar os usuários. Por favor, tente novamente mais tarde."
          type="error"
          showIcon
          closable
        />
      )}

      <Space style={{ width: "100%", justifyContent: "end" }}>
        <Button
          icon={<ExportOutlined />}
          loading={isExporting}
          onClick={handleExportCSV}
        >
          Exportar CSV
        </Button>
        <Button
          icon={<FilterOutlined />}
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filtros
        </Button>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenCreateModal}
        >
          Novo Usuário
        </Button>
      </Space>

      <Table
        dataSource={data.data}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          pageSize: data.items_per_page,
          total: data.total_items,
          current: data.current_page,
          showSizeChanger: false,
          showTotal: (total) => {
            if (total === 1) {
              return "1 usuário encontrado";
            }

            return `${total} usuários encontrados`;
          },
          onChange: (page) => setCurrentPage(page),
        }}
        bordered
      />

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={selectedUserId}
      />

      <FiltersModal
        onApply={handleApplyFilters}
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </Space>
  );
};
