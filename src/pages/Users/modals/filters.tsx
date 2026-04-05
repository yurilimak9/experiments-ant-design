import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  type TimeRangePickerProps,
} from "antd";
import dayjs, { type Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

export interface Filters {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  created_at?: [Dayjs, Dayjs];
}

interface FiltersModalProps {
  isOpen: boolean;
  onApply: (values: Filters) => void;
  onClose: () => void;
}

const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Últimos 7 dias", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Últimos 14 dias", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Últimos 30 dias", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Últimos 90 dias", value: [dayjs().add(-90, "d"), dayjs()] },
];

export const FiltersModal = ({
  isOpen,
  onApply,
  onClose,
}: FiltersModalProps) => {
  const [form] = Form.useForm<Filters>();

  const handleClear = () => {
    form.resetFields();

    onApply({});
    onClose();
  };

  const handleFinish = (values: Filters) => {
    onApply(values);
    onClose();
  };

  return (
    <Modal
      title="Filtros"
      open={isOpen}
      onCancel={onClose}
      forceRender
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
        onFinish={handleFinish}
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
          <RangePicker
            presets={rangePresets}
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
