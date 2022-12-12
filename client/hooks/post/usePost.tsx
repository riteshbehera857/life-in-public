import { useAuthContext } from "@hooks/auth/useAuthContext";
import axios from "axios";
import { GET_POST } from "../../constants";
import { PostResponse } from "../../types";
import { usePostContext } from "./usePostContext";

export const usePost = () => {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const refreshPost = async () => {
    const res = await axios.get<PostResponse>(
      `${GET_POST}?sort=createdAt&currUser=${user?._id}`
    );
    dispatch({ type: "REFRESH", payload: res?.data?.data?.posts });
  };

  return { refreshPost };
};
