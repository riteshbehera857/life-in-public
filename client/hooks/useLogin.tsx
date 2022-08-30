import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { ILoginResponse, IUser } from "../types";
import { useRouter } from "next/router";

export const useLogin = () => {
  const [error, setError] = useState<null | string | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const router = useRouter();

  const { dispatch } = useAuthContext();

  const GET_USER = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}${process.env.NEXT_PUBLIC_CURRENT_USER_END_POINT}`;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const END_POINT: any = `http://localhost:8000${process.env.NEXT_PUBLIC_BACKEND_LOGIN_END_POINT}`;

    const { data } = await axios.post<ILoginResponse>(END_POINT, {
      email,
      password,
    });

    if (data?.error) {
      setIsLoading(false);
      setError(data?.message);
    }
    if (!data?.error) {
      data?.token && localStorage.setItem("token", data?.token);
      axios
        .get(GET_USER, {
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
        })
        .then((res) => {
          dispatch({ type: "LOGIN", payload: res?.data?.user });
          // console.log("<><><><><>><", res?.data?.user);
          // if (!res?.data?.user?.avatar || !res?.data?.user?.username) {
          //   router.push(`/${res?.data?.user?._id}/assign_username_avatar`);
          // }
        })
        .catch((err) => console.log(err));
      setIsLoading(false);
      router.push("/");
    }
  };
  return { login, isLoading, error };
};
