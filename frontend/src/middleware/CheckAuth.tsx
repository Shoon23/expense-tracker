import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../types/user";
import { Navigate, Outlet } from "react-router-dom";

const CheckAuth = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return !user?.accessToken ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default CheckAuth;
