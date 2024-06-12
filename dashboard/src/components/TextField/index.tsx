import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { theme } from "@theme/index";
import * as S from "./styles";

interface TextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  marginTop?: keyof typeof theme.spacing.margin;
  marginleft?: keyof typeof theme.spacing.margin;
  marginRight?: keyof typeof theme.spacing.margin;
  marginBottom?: keyof typeof theme.spacing.margin;
  placeholder?: string;
  background?: keyof typeof theme.colors;
  type?: React.HTMLInputTypeAttribute;
}

const TextField = <T extends FieldValues>({
  marginTop,
  marginleft,
  marginRight,
  marginBottom,
  placeholder,
  control,
  name,
  rules,
  background,
  type,
}: TextFieldProps<T>) => {
  return (
    <Controller
      render={({ field }) => (
        <S.Input
          {...field}
          type={type}
          background={background}
          placeholder={placeholder}
          marginTop={marginTop}
          marginleft={marginleft}
          marginRight={marginRight}
          marginBottom={marginBottom}
        />
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export { TextField };
