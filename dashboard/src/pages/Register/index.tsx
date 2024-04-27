import { Typography, Flex, Button, Form } from "antd";
import { useRegister } from "./useRegister";
import { TextField } from "../../components/TextField";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    control,
    isRegisterServiceFailed,
    isLoading,
  } = useRegister();

  return (
    <Flex vertical justify="center" align="center">
      <Title style={{ margin: 16 }}>Bem vindo(a) ao Food Order</Title>
      <Form onFinish={handleSubmit(onSubmit)} style={{ width: "70%" }}>
        <TextField
          name={"name"}
          type="text"
          control={control}
          rules={{ required: "O nome é obrigatório" }}
          props={{ size: "large" }}
          placeholder="Nome"
          marginBottom={8}
        />
        <Text type="danger" style={{ display: errors.name ? "flex" : "none" }}>
          {errors?.name?.message}
        </Text>
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
        <Text type="danger" style={{ display: errors.email ? "flex" : "none" }}>
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
        <TextField
          name={"passwordConfirmation"}
          type="password"
          control={control}
          rules={{ required: "A confirmação da senha é obrigatória" }}
          props={{ size: "large" }}
          placeholder="Repita sua melhor senha"
          marginTop={8}
          marginBottom={8}
        />
        <Text
          type="danger"
          style={{ display: errors.passwordConfirmation ? "flex" : "none" }}
        >
          {errors?.passwordConfirmation?.message}
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
            display: isRegisterServiceFailed ? "flex" : "none",
            marginTop: 8,
          }}
        >
          Usuário já registrado!
        </Text>
      </Form>
    </Flex>
  );
};

export { RegisterPage };
