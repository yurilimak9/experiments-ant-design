import {
  ArrowLeftOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Result,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useUserDetail } from "@/pages/user-detail/useUserDetail";

const { Title, Text } = Typography;

export const UserDetailPage = () => {
  const { userId } = useParams({ from: "/_layout/usuarios/$userId" });
  const navigate = useNavigate();
  const { data: user, isError } = useUserDetail(Number(userId));

  if (!user) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Usuário não encontrado."
        extra={
          <Button type="primary" onClick={() => navigate({ to: "/usuarios" })}>
            Voltar
          </Button>
        }
      />
    );
  }

  if (isError) {
    return (
      <Alert
        type="error"
        showIcon
        title="Erro ao carregar usuário"
        description="Não foi possível carregar os dados do usuário. Tente novamente mais tarde."
      />
    );
  }

  return (
    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        type="text"
        onClick={() => window.history.back()}
      >
        Voltar
      </Button>
      {/* Header */}
      <Card>
        <Row align="middle" justify="space-between">
          <Col>
            <Space>
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {user.first_name} {user.last_name}
                </Title>
                <Text type="secondary">@{user.username}</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Tag color={user.is_active ? "success" : "error"}>
              {user.is_active ? "Ativo" : "Inativo"}
            </Tag>
          </Col>
        </Row>
      </Card>

      {/* Métricas */}
      <Row gutter={12}>
        {[
          { label: "ID do usuário", value: user.id },
          { label: "Status", value: user.is_active ? "Ativo" : "Inativo" },
          { label: "Staff", value: user.is_staff ? "Sim" : "Não" },
        ].map(({ label, value }) => (
          <Col xs={12} sm={8} key={label}>
            <Card>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {label}
              </Text>
              <Title level={5} style={{ margin: "4px 0 0" }}>
                {value}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        title="Informações do usuário"
        extra={
          <Tooltip title="Editar">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
        }
      >
        <Descriptions layout="horizontal" size="small">
          <Descriptions.Item label="Nome">{user.first_name}</Descriptions.Item>
          <Descriptions.Item label="Sobrenome">
            {user.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Nome de usuário">
            @{user.username}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail">
            <Text copyable>{user.email}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Criado em">
            {new Date(user.created_at).toLocaleString("pt-BR")}
          </Descriptions.Item>
          <Descriptions.Item label="Último login">
            {user.last_login ? (
              new Date(user.last_login).toLocaleString("pt-BR")
            ) : (
              <Text>Nunca acessou</Text>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};
