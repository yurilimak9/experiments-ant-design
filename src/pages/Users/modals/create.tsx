import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, Modal, message } from "antd";
import { useEffect } from "react";
import { type ApiError, apiFetch } from "../../../api/client";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number | null;
}

interface UserFormData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [form] = Form.useForm<UserFormData>();
  const queryClient = useQueryClient();
  const isEditing = !!userId;

  const { data: userData, isFetching: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId!),
    enabled: isEditing && isOpen,
    staleTime: 0,
  });

  useEffect(() => {
    if (userData && isOpen) {
      form.setFieldsValue(userData);
    } else if (!isOpen) {
      form.resetFields();
    }
  }, [userData, isOpen, form]);

  const saveMutation = useMutation({
    mutationFn: (values: UserFormData) => saveUser(values, userId),
    onSuccess: () => {
      message.success(
        `Usuário ${isEditing ? "atualizado" : "criado"} com sucesso!`,
      );

      queryClient.invalidateQueries({ queryKey: ["usersList"] });

      handleClose();
    },
    onError: (error: ApiError) => {
      message.error(`${error.message} ${error.action}`);
    },
  });

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = (values: UserFormData) => {
    saveMutation.mutate(values);
  };

  return (
    <Modal
      title={isEditing ? "Editar Usuário" : "Criar Usuário"}
      open={isOpen}
      onCancel={onClose}
      onOk={form.submit}
      confirmLoading={saveMutation.isPending || isLoadingUser}
      destroyOnHidden
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        name="userForm"
      >
        <Form.Item
          name="username"
          label="Nome de usuário:"
          rules={[
            { required: true, message: "Por favor, insira o nome de usuário." },
          ]}
        >
          <Input placeholder="Ex: maria123" />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="Nome:"
          rules={[{ required: true, message: "Por favor, insira o nome." }]}
        >
          <Input placeholder="Ex: Maria" />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Sobrenome:"
          rules={[
            { required: true, message: "Por favor, insira o sobrenome." },
          ]}
        >
          <Input placeholder="Ex: Santos" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail:"
          rules={[{ required: true, message: "Por favor, insira o e-mail." }]}
        >
          <Input placeholder="Ex: mariasantos@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Senha:"
          rules={[
            { required: !isEditing, message: "Por favor, insira a senha." },
          ]}
        >
          <Input placeholder="Digite a senha" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const fetchUserById = async (userId: number): Promise<UserFormData | null> => {
  return apiFetch(`/users/${userId}/`);
};

const saveUser = async (data: UserFormData, id?: number | null) => {
  const method = id ? "PATCH" : "POST";
  const endpoint = id ? `/users/${id}/` : "/users/";

  return apiFetch(endpoint, {
    method: method,
    body: JSON.stringify(data),
  });
};
