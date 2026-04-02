import { Button, DatePicker, Form, Input, Modal } from "antd";

interface Filters {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  created_at?: string;
}

interface FiltersModalProps {
  isOpen: boolean;
  // onApply: (values: Filters) => void;
  onClose: () => void;
}

export const FiltersModal = ({ isOpen, onClose }: FiltersModalProps) => {
  const [form] = Form.useForm<Filters>();

  const handleClear = () => {
    form.resetFields();

    // onApply({});
    onClose();
  };

  return (
    <Modal
      title="Filtros"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="clear" onClick={handleClear}>
          Limpar filtros
        </Button>,
        <Button key="apply" type="primary" onClick={() => form.submit()}>
          Aplicar
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        // onFinish={onApply}
        style={{ marginTop: 16 }}
      >
        <Form.Item label="Nome de Usuário" name="username">
          <Input placeholder="Filtrar por nome de usuário" allowClear />
        </Form.Item>
        <Form.Item label="Nome" name="first_name">
          <Input placeholder="Filtrar por nome" allowClear />
        </Form.Item>
        <Form.Item label="Sobrenome" name="last_name">
          <Input placeholder="Filtrar por sobrenome" allowClear />
        </Form.Item>
        <Form.Item label="E-mail" name="email">
          <Input placeholder="Filtrar por e-mail" allowClear />
        </Form.Item>
        <Form.Item label="Data de Criação" name="created_at">
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            placeholder="Filtrar por data"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
