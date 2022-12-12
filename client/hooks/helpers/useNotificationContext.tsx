import { NotificationContext } from "@context/NotificationContext";
import { useContext } from "react";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be inside a NotificationContextProvider"
    );
  return context;
};
