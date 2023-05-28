import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../types/user";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return user?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
