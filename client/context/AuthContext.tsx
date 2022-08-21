import axios from "axios";
import {
  createContext,
  ReactElement,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useRouter } from "next/router";
import { IUser } from "../types";

export const AuthContext = createContext<any>(null);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { token: action.payload };
    case "LOGOUT":
      return { token: null };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }: any) => {
  const GET_USER = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}${process.env.NEXT_PUBLIC_CURRENT_USER_END_POINT}`;

  const [state, dispatch] = useReducer(authReducer, {
    token: null,
  });
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get(GET_USER, {
          headers: {
            Authorization: `Bearer ${state?.token}`,
          },
        })
        .then((res) => {
          setUser(res?.data?.user);
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, [state?.token, GET_USER]);

  useEffect(() => {
    if (user) router.push("/");
    if (!user) router.push("/auth/login");
  }, [user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, user }}>
      {children}
    </AuthContext.Provider>
  );
};
