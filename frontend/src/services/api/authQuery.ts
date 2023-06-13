import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstance";
import {
  iLoginCredentials,
  iRegisterCredentials,
  iUser,
} from "../../types/user";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Login Mutation
const login = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const navigate = useNavigate();
  const [errorRes, setErrorRes] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (loginData: iLoginCredentials) => {
      const res = await axiosPublic.post("auth/login", loginData);
      console.log(res.data);
      return res.data;
    },
    onError(error: AxiosError | Error) {
      if (axios.isAxiosError(error)) {
        setErrorRes(error.response?.data?.error || "Somethin went wrong");
      } else {
        setErrorRes("Somethin went wrong");
      }
    },
    onSuccess(data: AxiosResponse) {
      console.log(data);
      queryClient.setQueryData(["user"], data);
      navigate(from, { replace: true });
    },
  });

  return {
    mutation,
    errorRes,
    setErrorRes,
  };
};

// Register Mutation

const register = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [errorRes, setErrorRes] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (registerData: iRegisterCredentials) => {
      const res = await axiosPublic.post("auth/register", registerData);

      return res.data;
    },
    onError(error: AxiosError | Error) {
      if (axios.isAxiosError(error)) {
        setErrorRes(error.response?.data?.error || "Somethin went wrong");
      } else {
        setErrorRes("Somethin went wrong");
      }
    },
    onSuccess(data: AxiosResponse) {
      queryClient.setQueryData(["user"], data);
      navigate(from, { replace: true });
    },
  });

  return {
    mutation,
    errorRes,
    setErrorRes,
  };
};

// refresh auth tokens
const refreshToken = (accessToken: string) => {
  return useQuery<iUser, unknown>(
    ["user"],
    async () => {
      const res = await axiosPublic.get("/auth/refresh");

      return res.data;
    },
    {
      enabled: !accessToken,
      refetchOnMount: false,
      retry: false,
    }
  );
};

// logout

const logout = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosPublic.post("/auth/logout");
      return res.data;
    },
    onSuccess() {
      queryClient.clear();
      navigate("/login");
    },
  });
};

export default { logout, login, register, refreshToken };
