import { theme } from "@theme/index";
import * as S from "./styles";

enum EFontSize {
  extraBlack = 900,
  black = 800,
  bold = 700,
  semiBold = 600,
  medium = 500,
  regular = 400,
  light = 300,
  extraLight = 200,
  thin = 100,
}

type TextProps = {
  text: string;
  fontWeight?: keyof typeof EFontSize;
  fontSize: keyof typeof theme.font.size;
  color?: keyof typeof theme.colors;
  textAlign?: string;
  marginTop?: keyof typeof theme.spacing.margin;
  marginleft?: keyof typeof theme.spacing.margin;
  marginRight?: keyof typeof theme.spacing.margin;
  marginBottom?: keyof typeof theme.spacing.margin;
};

const Text = ({
  text,
  fontWeight,
  fontSize,
  color = "darkestGreen",
  textAlign = "center",
  marginTop,
  marginleft,
  marginRight,
  marginBottom,
}: TextProps) => {
  return (
    <S.GenericText
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
      marginTop={marginTop}
      marginleft={marginleft}
      marginRight={marginRight}
      marginBottom={marginBottom}
    >
      {text}
    </S.GenericText>
  );
};

export { Text, EFontSize };
