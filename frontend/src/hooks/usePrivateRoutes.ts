import { useQueryClient } from "@tanstack/react-query";
import axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { iUser } from "../types/user";
import authQuery from "../services/api/authQuery";
import { useNavigate } from "react-router-dom";

export default function usePrivateRoutes() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);
  const navigate = useNavigate();

  const axiosPrivate = axios.create({
    baseURL: "http://localhost:1234",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  const onRequestError = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
      const { message } = error;
      const { status } = error.response ?? {};
      console.log(message);
      if (status === 401 || status === 409) {
        navigate("/login");
      }
    }

    return Promise.reject(error);
  };

  const onRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const decoded = jwt_decode<JwtPayload>(user?.accessToken as string);
    const { exp } = decoded;
    const token_expiration = new Date(1000 * Number(exp)).toLocaleString();
    const current_time = new Date().toLocaleString();

    if (current_time > token_expiration) {
      const refreshUser = authQuery.refreshToken(user?.accessToken as string);

      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${refreshUser.data?.accessToken ?? ""}`,
      } as AxiosRequestHeaders;
    }

    return config;
  };

  axiosPrivate.interceptors.request.use(onRequest, onRequestError);
  return axiosPrivate;
}
