import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../types/user";
import authQuery from "../services/api/authQuery";
import Loading from "../components/common/Loading";
import Expenses from "../pages/Expenses";
const PersistAuth = () => {
  const queryClient = useQueryClient();

  const location = useLocation();
  const user = queryClient.getQueryData<iUser>(["user"]);

  const { isLoading, isError } = authQuery.refreshToken(
    user?.accessToken as string
  );

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (isError) {
    <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PersistAuth;
