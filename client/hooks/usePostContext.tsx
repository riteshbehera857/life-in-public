import { PostContext } from "../context/PostContext";
import { useContext } from "react";

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context)
    throw new Error(
      "useAuthContext must be used inside an AuthContextProvider"
    );
  return context;
};
