import axios from "axios";
import { GET_POST } from "../../constants";
import { PostResponse } from "../../types";
import { usePostContext } from "./usePostContext";

export const usePost = () => {
  const { dispatch } = usePostContext();
  const refreshPost = async () => {
    const res = await axios
      .get<PostResponse>(`${GET_POST}?sort=created_at`)
    dispatch({ type: "REFRESH", payload: res?.data?.data?.posts });
  };

  return { refreshPost };
};
