import axios from "./../axios.config";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { ILoginResponse, IUser } from "../types";
import { useRouter } from "next/router";

export const useLogin = () => {
  const [error, setError] = useState<null | string | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const router = useRouter();
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const END_POINT: any = process.env.NEXT_PUBLIC_BACKEND_LOGIN_END_POINT;

    const { data } = await axios.post<ILoginResponse>(END_POINT, {
      email,
      password,
    });
    if (data?.error) {
      setIsLoading(false);
      setError(data?.message);
    }
    if (!data?.error) {
      dispatch({ type: "LOGIN", payload: data?.token });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
