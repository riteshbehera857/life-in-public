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

const StateContext = createContext<IContext | any>(false);

export const AuthContext = ({ children }: any) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [userID, setUserID] = useState<string>("");

  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}${process.env.NEXT_PUBLIC_CURRENT_USER_END_POINT}`;

  let token: string | null;
  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    async function redirect() {
      if (!loggedIn) router.push("/auth");
      router.push("/");
    }
    redirect();
  }, [loggedIn]);

  useEffect(() => {
    async function getCurrentUser() {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserID(response?.data?.user?._id);
      setUser(response?.data?.user);
    }
    getCurrentUser();
  }, [token]);

  return (
    <StateContext.Provider value={{ loggedIn, setLoggedIn, user, userID }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
