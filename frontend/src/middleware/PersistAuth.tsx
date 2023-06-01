import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { iUser } from "../types/user";
import auth from "../services/api/authQuery";
import Loading from "../components/common/Loading";

const PersistAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const user = queryClient.getQueryData<iUser>(["user"]);
  console.log(user);
  const { isLoading, isError } = auth.refreshToken(user?.accessToken as string);
  if (isError) {
    navigate("/login");
  }
  return isLoading ? (
    <section className="min-h-screen flex items-center justify-center">
      <Loading />
    </section>
  ) : (
    <Outlet />
  );
};

export default PersistAuth;
