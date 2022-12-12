import { useEffectOnce } from "@hooks/helpers/useEfffectOnce";
import React, { createContext, useReducer } from "react";
import { io } from "socket.io-client";

interface NotificationContextProviderProp {
  children: React.ReactNode;
}
export const NotificationContext = createContext<any>(null);
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SOCKET":
      return { ...state, socket: action.socket };
    case "NOTIFY":
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({
  children,
}: NotificationContextProviderProp) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    socket: null,
    notifications: [],
  });

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
