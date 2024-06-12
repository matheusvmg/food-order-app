import { theme } from "@theme/index";
import * as S from "./styles";

type ButtonProps = {
  text: string;
  marginTop?: keyof typeof theme.spacing.margin;
  marginleft?: keyof typeof theme.spacing.margin;
  marginRight?: keyof typeof theme.spacing.margin;
  marginBottom?: keyof typeof theme.spacing.margin;
  onClick?: () => void;
};

const Button = ({
  text,
  marginTop,
  marginleft,
  marginRight,
  marginBottom,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <S.FilledButton
        marginTop={marginTop}
        marginleft={marginleft}
        marginRight={marginRight}
        marginBottom={marginBottom}
        onClick={onClick}
      >
        {text}
      </S.FilledButton>
    </>
  );
};

export { Button };
