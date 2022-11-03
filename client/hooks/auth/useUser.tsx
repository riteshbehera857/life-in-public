import axios from "axios";
import { useRouter } from "next/router";
import { GET_USER } from "../../constants";
import { useAuthContext } from "./useAuthContext";
axios.defaults.withCredentials = true;

export const useUser = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const refreshUser = async () => {
    const res = await axios.get(GET_USER, {
      withCredentials: true,
    });
    if (!res?.data?.user?.username || !res?.data?.user?.avatar) {
      router.push(`/${res?.data?.user?._id}/assign_username_avatar`);
    } else {
      dispatch({ type: "REFRESH", payload: res?.data?.user });
      router.push("/");
    }
  };

  return { refreshUser };
};
