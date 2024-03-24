import axios from "../api/axios";
import { useAuth } from "./useAuth";

const REFRESH_TOKEN_URL = "/refresh-token";
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_TOKEN_URL, {
      headers: {
        Authorization: `Bearer ${auth?.refreshToken}`,
      },
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data?.accessToken,
        refreshToken: response.data?.refreshToken,
        user: response.data?.user,
      };
    });
    return response.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
