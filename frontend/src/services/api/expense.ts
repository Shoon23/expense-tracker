import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosPublic } from "../axiosInstance";

const getMonthlyExpenseTrend = (userId: number) => {
  return useQuery(
    ["pieChart"],
    async () => {
      const res = await axiosPublic.get(
        `/chart/monthly-expense-trend/${userId}`
      );
      return res.data;
    },
    {
      refetchOnMount: true,
    }
  );
};

export { getMonthlyExpenseTrend };
