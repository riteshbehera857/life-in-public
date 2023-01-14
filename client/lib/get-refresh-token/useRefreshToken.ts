import axios from "axios";

const useRefreshToken = () => {
  const refresh = async () => {
    return await axios.get("http://localhost:8000/api/v1/auth/refresh", {
      withCredentials: true,
    });
  };

  return { refresh };
};

export default useRefreshToken;
