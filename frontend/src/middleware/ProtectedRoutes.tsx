import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../types/user";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const ProtectedRoutes = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return user?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
