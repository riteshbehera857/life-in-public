import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { SIGNUP } from "../../constants";
import { IRegisterResponse } from "../../types";

export const useSignup = () => {
  const SIGNUP_URL = "http://localhost:8000/api/v1/auth/signup";
  const [error, setError] = useState<null | string | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const router = useRouter();

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);

    const { data } = await axios.post<IRegisterResponse>(SIGNUP_URL, {
      firstname,
      lastname,
      email,
      password,
    });

    if (data?.error) {
      setIsLoading(false);
      setError(data?.message);
    }
    if (!data?.error) {
      router.push("/auth/login");
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
