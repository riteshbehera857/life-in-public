import axios from "axios";
import { COMMENT } from "../constants";

export const useComment = () => {
  const refreshComment = async (id) => {
    const res = await axios.get(`${COMMENT}/${id}`);

    return res;
  };

  return { refreshComment };
};
