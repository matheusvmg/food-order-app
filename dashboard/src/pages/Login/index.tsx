import * as S from "./styles";
import carrouselImage from "@assets/dashboard_carrousel_1.svg";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { useLogin } from "./useLogin";
import { Button } from "@components/Button";
import { loginLocales } from "./loginLocales";

const LoginPage = () => {
  const { control, onSubmit, handleSubmit } = useLogin();

  return (
    <S.Container>
      <S.Carrousel>
        <Text
          text={loginLocales.title}
          fontWeight="bold"
          fontSize="lg"
          color="white"
          textAlign="center"
        />
        <S.Image src={carrouselImage} />
      </S.Carrousel>
      <S.Fields>
        <Text
          text={loginLocales.subtitle}
          fontWeight="bold"
          fontSize="xl"
          color="black"
        />
        <Text
          text={loginLocales.description}
          fontWeight="light"
          fontSize="xs"
          color="black"
          marginTop="lg"
        />
        <TextField
          name="email"
          control={control}
          marginTop="xxxl"
          background="lightGray"
          placeholder={loginLocales.emailTextField.placeholder}
        />
        <TextField
          name="password"
          type="password"
          control={control}
          marginTop="sm"
          background="lightGray"
          placeholder={loginLocales.passwordTextField.placeholder}
        />
        <Button
          text={loginLocales.buttonTitle}
          marginTop="xxxl"
          onClick={handleSubmit(onSubmit)}
        />
        <S.SignUpLinkContainer>
          <Text
            text={loginLocales.signUp.text}
            fontSize="xs"
            fontWeight="extraLight"
            color="black"
            marginTop="sm"
          />
          <S.SignUpLink href="/register">
            <Text
              text={loginLocales.signUp.linkText}
              fontSize="xs"
              fontWeight="bold"
              color="darkestGreen"
              marginTop="sm"
              marginleft="xxxs"
            />
          </S.SignUpLink>
        </S.SignUpLinkContainer>
      </S.Fields>
    </S.Container>
  );
};

export { LoginPage };
