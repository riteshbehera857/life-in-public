import axios from "./../axios.config";
import { useRouter } from "next/router";
import { useState } from "react";
import { IRegisterResponse, IUser } from "../types";

export const useSignup = () => {
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

    const END_POINT: any = process.env.NEXT_PUBLIC_BACKEND_SIGNUP_END_POINT;
    const { data } = await axios.post<IRegisterResponse>(END_POINT, {
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