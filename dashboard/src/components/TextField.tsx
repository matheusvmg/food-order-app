import {
  Controller,
  Control,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { Input, InputProps } from "antd";

const { Password } = Input;

type TextFieldName = "name" | "email" | "password" | "passwordConfirmation";

interface ITextField<T extends FieldValues> extends UseControllerProps<T> {
  type: string;
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  props?: InputProps;
  placeholder?: string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

function TextField<T extends FieldValues>({
  type = "text",
  name,
  control,
  rules,
  props,
  placeholder,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
}: ITextField<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) =>
        type !== "password" ? (
          <Input
            size={props?.size}
            type={type}
            {...field}
            placeholder={placeholder}
            status={!fieldState.invalid ? "" : "error"}
            style={{
              marginTop: marginTop,
              marginLeft: marginLeft,
              marginRight: marginRight,
              marginBottom: marginBottom,
            }}
          />
        ) : (
          <Password
            size={props?.size}
            type={type}
            {...field}
            placeholder={placeholder}
            status={!fieldState.invalid ? "" : "error"}
            style={{
              marginTop: marginTop,
              marginLeft: marginLeft,
              marginRight: marginRight,
              marginBottom: marginBottom,
            }}
          />
        )
      }
    />
  );
}

export type { TextFieldName };

export { TextField };
