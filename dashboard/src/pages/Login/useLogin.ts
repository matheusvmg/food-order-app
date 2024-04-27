import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginServiceFailed, setIsLoginServiceFailed] =
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
      await api.post("/login", {
        email: data.email,
        password: data.password,
      });
      navigate("/");
    } catch (e) {
      setIsLoginServiceFailed(() => true);
    } finally {
      setIsLoading(() => false);
    }
    clearErrors();
    reset();
  };

  return {
    isLoading,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    register,
    watch,
    control,
    isLoginServiceFailed,
  };
};

export { useLogin };
