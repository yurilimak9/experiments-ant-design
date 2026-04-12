import { useNavigate } from "@tanstack/react-router";
import { Button, Result, Space } from "antd";

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
      <Result
        status="403"
        title="403"
        subTitle="Você não tem permissão para acessar este recurso."
        extra={[
          <Button
            type="primary"
            key="home"
            onClick={() => navigate({ to: "/" })}
          >
            Voltar para o início
          </Button>,
          <Button key="back" onClick={() => history.back()}>
            Voltar
          </Button>,
        ]}
      />
    </Space>
  );
};
