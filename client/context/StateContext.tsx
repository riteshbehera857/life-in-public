import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { IUser } from "./../types";

interface IContext {
  loggedIn: boolean;
  user?: Object | null;
  userID?: string;
  setLoggedIn: (value: boolean) => void;
}

export const StateContext = createContext<IContext | any>(false);

export const AuthContext = ({ children }: any) => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [userID, setUserID] = useState<string>("");

  // const ISSERVER = typeof window === "undefined";
  // if (!ISSERVER) {
  //   setToken(localStorage.getItem("token"));
  // }

  useEffect(() => {
    function redirect() {
      if (!loggedIn) router.push("/auth");
    }
    redirect();
  }, [loggedIn]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}${process.env.NEXT_PUBLIC_CURRENT_USER_END_POINT}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserID(res?.data?.user?._id);
        setUser(res?.data?.user);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <StateContext.Provider
      value={{ loggedIn, setLoggedIn, user, userID, token, setToken }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
