import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import type React from "react";
import { styles } from "./styles";
import { useLogin } from "./useLogin";

export const LoginPage: React.FC = () => {
  const { isLoading, handleLoginSubmit } = useLogin();

  return (
    <div style={styles.container}>
      <Card title="Acesso ao Sistema" style={styles.card}>
        <Form
          name="userLogin"
          layout="vertical"
          onFinish={handleLoginSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Nome de usuário"
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu nome de usuário!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Digite seu usuário"
            />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: "Por favor, insira sua senha!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Digite sua senha"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
