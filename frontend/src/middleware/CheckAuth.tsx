import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { iUser } from "../types/user";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const CheckAuth = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return !user?.accessToken ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default CheckAuth;
