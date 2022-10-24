import axios from "axios";
import { GET_USER } from "../../constants";
import { useAuthContext } from "./useAuthContext";
axios.defaults.withCredentials = true;

export const useUser = () => {
    const { dispatch } = useAuthContext();
    const refreshUser = async () => {
        const res = await axios
            .get(GET_USER, {
            withCredentials: true,
            })
        dispatch({ type: "REFRESH", payload: res?.data?.user });
  };

  return { refreshUser };
}