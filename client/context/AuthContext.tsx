import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { GET_USER } from "../constants";
import { useCookies } from "react-cookie";

axios.defaults.withCredentials = true;

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
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const router = useRouter();

  useEffect(() => {
    console.log("%c Inside First useEffect...", "color: red");
    axios
      .get(GET_USER, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res?.data?.user });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!state.user) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
