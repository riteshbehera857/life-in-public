import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export const AuthContext = createContext<any>(null);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }: any) => {
  const GET_USER = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}${process.env.NEXT_PUBLIC_CURRENT_USER_END_POINT}`;
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [token, setToken] = useState();
  console.log(
    "🚀 ~ file: AuthContext.tsx ~ line 27 ~ AuthContextProvider ~ token",
    token
  );
  console.log(
    "🚀 ~ file: AuthContext.tsx ~ line 25 ~ AuthContextProvider ~ state",
    state.user
  );

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(GET_USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({ type: "LOGIN", payload: res?.data?.user });
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
