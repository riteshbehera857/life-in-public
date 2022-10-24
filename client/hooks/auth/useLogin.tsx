import axios from "axios";
import { useState } from "react";
import { ILoginResponse } from "../../types";
import { LOGIN } from "../../constants";

export const useLogin = () => {
  const [error, setError] = useState<null | string | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined>();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const { data } = await axios.post<ILoginResponse>(LOGIN, {
      email,
      password,
    });

    if (data?.error) {
      setIsLoading(false);
      setError(data?.message);
    }

    return data;
  };
  return { login, isLoading, error, setIsLoading, setError };
};
