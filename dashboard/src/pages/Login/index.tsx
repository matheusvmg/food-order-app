import { Typography, Flex, Form, Button } from "antd";
import { useLogin } from "./useLogin";
import { TextField } from "../../components/TextField";
import * as S from "./styles";

const { Title, Text } = Typography;

const LoginPage = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    errors,
    isLoading,
    isLoginServiceFailed,
  } = useLogin();

  return (
    <S.Container>
      <S.Background />
      <Flex vertical justify="center" align="center" style={{ width: "50vw" }}>
        <Title style={{ margin: 16 }}>Bem vindo(a) ao Food Order</Title>
        <Form onFinish={handleSubmit(onSubmit)} style={{ width: "70%" }}>
          <TextField
            name={"email"}
            type="email"
            control={control}
            rules={{ required: "O email é obrigatório" }}
            props={{ size: "large" }}
            placeholder="teste@teste.com"
            marginTop={8}
            marginBottom={8}
          />
          <Text
            type="danger"
            style={{ display: errors.email ? "flex" : "none" }}
          >
            {errors?.email?.message}
          </Text>
          <TextField
            name={"password"}
            type="password"
            control={control}
            rules={{ required: "A senha é obrigatória" }}
            props={{ size: "large" }}
            placeholder="Digite sua melhor senha"
            marginTop={8}
            marginBottom={8}
          />
          <Text
            type="danger"
            style={{ display: errors.password ? "flex" : "none" }}
          >
            {errors?.password?.message}
          </Text>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ marginTop: 8 }}
            shape="round"
            loading={isLoading}
          >
            Cadastrar
          </Button>
          <Text
            type="danger"
            style={{
              display: isLoginServiceFailed ? "flex" : "none",
              marginTop: 8,
            }}
          >
            Erro ao fazer o login!
          </Text>
        </Form>
      </Flex>
    </S.Container>
  );
};

export { LoginPage };
