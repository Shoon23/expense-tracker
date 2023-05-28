import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosPublic } from "../axiosInstance";

// line chart
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
// doughnut chart
const getCategoryDistribution = (userId: number) => {
  return useQuery(
    ["doughnutChart"],
    async () => {
      const res = await axiosPublic.get(
        `/chart/category-distribution/${userId}`
      );
      return res.data;
    },
    {
      refetchOnMount: true,
    }
  );
};

export default { getMonthlyExpenseTrend, getCategoryDistribution };
