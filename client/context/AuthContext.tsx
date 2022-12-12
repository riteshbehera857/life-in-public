import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useEffectOnce } from "@hooks/helpers/useEfffectOnce";
// import { GET_USER } from "../constants";
// import useSWR from "swr";

axios.defaults.withCredentials = true;

export const AuthContext = createContext<any>(null);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoading: action.isLoading,
        token: action.token,
      };
    case "REFRESH":
      return { ...state, isLoading: action.isLoading, user: action.user };
    case "LOGOUT":
      return { user: null, isLoading: true, token: null };
    case "LOADING":
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }: any) => {
  const GET_USER_URL = `http://localhost:8000/api/v1/user/me`;
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    token: null,
  });
  const [redirected, setRedirected] = useState(true);
  const router = useRouter();
  const [cookies] = useCookies(["route"]);

  useEffectOnce(() => {
    getRefreshToken();
  });

  useEffectOnce(() => {
    setRedirected(false);
  });

  useEffect(() => {
    if (!redirected && state.user && !state.isLoading) {
      router.prefetch(`${cookies["route"]}`);
      router.push(`${cookies["route"]}`, undefined, { shallow: true });
      setRedirected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoading, state.user, redirected]);

  const fetchUser = async (accessToken) => {
    return await axios.get(GET_USER_URL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const getRefreshToken = async () => {
    axios
      .get("http://localhost:8000/api/v1/auth/refresh", {
        withCredentials: true,
      })
      .then(async (response) => {
        const res = await fetchUser(response?.data?.accessToken);
        dispatch({
          type: "LOGIN",
          token: response?.data?.accessToken,
          isLoading: false,
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response?.data?.accessToken}`;

        dispatch({ type: "REFRESH", isLoading: false, user: res.data?.user });
      });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, redirected }}>
      {children}
    </AuthContext.Provider>
  );
};
