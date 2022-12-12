import axios from "axios";
import { useState } from "react";
import { ILoginResponse } from "../../types";
import { LOGIN } from "../../constants";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<null | string | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const { dispatch } = useAuthContext();
  const LOGIN_URL = "http://localhost:8000/api/v1/auth/login";

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const { data } = await axios.post<ILoginResponse>(LOGIN_URL, {
      email,
      password,
    });

    if (data?.error) {
      setIsLoading(false);
      setError(data?.message);
    }

    if (!data?.error) {
      dispatch({
        type: "LOGIN",
        token: data?.accessToken,
      });
    }

    return data;
  };
  return { login, isLoading, error, setIsLoading, setError };
};
