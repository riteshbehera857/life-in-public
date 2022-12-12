import axios from "axios";
import { useRouter } from "next/router";
import { GET_USER } from "../../constants";
import { useAuthContext } from "./useAuthContext";
// axios.defaults.withCredentials = true;

export const useUser = () => {
  const { dispatch, token } = useAuthContext();
  const router = useRouter();
  const GET_USER_URL = `http://localhost:8000/api/v1/user/me`;
  const refreshUser = async (accessToken = token) => {
    const res = await axios.get(GET_USER_URL);
    if (!res?.data?.user?.username || !res?.data?.user?.avatar) {
      router.push(`/${res?.data?.user?._id}/assign_username_avatar`);
    } else {
      dispatch({
        type: "REFRESH",
        user: res?.data?.user,
        isLoading: false,
      });
      router.push("/");
    }
  };

  return { refreshUser };
};
