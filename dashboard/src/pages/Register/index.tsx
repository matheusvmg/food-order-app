import { useRegister } from "./useRegister";
import * as S from "./styles";
import { Text } from "@components/Text";
import { TextField } from "@components/TextField";
import { Button } from "@components/Button";
import { registerLocales } from "./registerLocales";
import carrouselImage from "@assets/dashboard_carrousel_1.svg";

const RegisterPage = () => {
  const { control, handleSubmit, onSubmit } = useRegister();

  return (
    <S.Container>
      <S.Carrousel>
        <Text
          text={registerLocales.title}
          fontWeight="bold"
          fontSize="lg"
          color="white"
          textAlign="center"
        />
        <S.Image src={carrouselImage} />
      </S.Carrousel>
      <S.Fields>
        <Text
          text={registerLocales.subtitle}
          fontWeight="bold"
          fontSize="xl"
          color="black"
        />
        <Text
          text={registerLocales.description}
          fontWeight="light"
          fontSize="xs"
          color="black"
          marginTop="lg"
        />
        <TextField
          name="name"
          control={control}
          marginTop="xxxl"
          background="lightGray"
          placeholder={registerLocales.nameTextField.placeholder}
        />
        <TextField
          name="email"
          control={control}
          marginTop="sm"
          background="lightGray"
          placeholder={registerLocales.emailTextField.placeholder}
        />
        <TextField
          name="password"
          type="password"
          control={control}
          marginTop="sm"
          background="lightGray"
          placeholder={registerLocales.passwordTextField.placeholder}
        />
        <Button
          text={registerLocales.buttonTitle}
          marginTop="xxxl"
          onClick={handleSubmit(onSubmit)}
        />
        <S.LoginLinkContainer>
          <Text
            text={registerLocales.login.text}
            fontSize="xs"
            fontWeight="extraLight"
            color="black"
            marginTop="sm"
          />
          <S.LoginLink href="/login">
            <Text
              text={registerLocales.login.linkText}
              fontSize="xs"
              fontWeight="bold"
              color="darkestGreen"
              marginTop="sm"
              marginleft="xxxs"
            />
          </S.LoginLink>
        </S.LoginLinkContainer>
      </S.Fields>
    </S.Container>
  );
};

export { RegisterPage };
