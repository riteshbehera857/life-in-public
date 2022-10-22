import axios from "axios";
import { GET_POST } from "../constants";
import { PostResponse } from "../types";
import { usePostContext } from "./usePostContext";

export const usePost = () => {
  const { dispatch } = usePostContext();
  const refreshPost = async () => {
    await axios
      .get<PostResponse>(GET_POST)
      .then((res) => {
        dispatch({ type: "REFRESH", payload: res?.data?.data?.posts });
      })
      .catch((err) => console.error(err));
  };

  return { refreshPost };
};
