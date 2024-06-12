import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "@service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegisterServiceFailed, setIsRegisterServiceFailed] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setIsLoading(() => true);
    try {
      await api.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/login");
    } catch (e) {
      setIsRegisterServiceFailed(() => true);
    } finally {
      setIsLoading(() => false);
    }
    clearErrors();
    reset();
  };

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
    watch,
    isValid,
    control,
    isRegisterServiceFailed,
    isLoading,
  };
};

export type { Inputs };

export { useRegister };
