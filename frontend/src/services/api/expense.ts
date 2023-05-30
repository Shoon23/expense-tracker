import { UseQueryResult, useQuery } from "@tanstack/react-query";
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

// get dashboard data
interface iResultDb {
  expenseList: Array<iExpense>;
  budgetList: Array<iDdBudget>;
}
const getDashboard = (userId: number): UseQueryResult<iResultDb, unknown> => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/expense/${userId}/dashboard`);
      return res.data;
    },
    refetchOnWindowFocus: true,
  });
};

// get expenses data

const getAllExpenes = (
  userId: number
): UseQueryResult<Array<iExpense>, unknown> => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/expense/${userId}`);
      return res.data;
    },
  });
};

export default {
  getMonthlyExpenseTrend,
  getCategoryDistribution,
  getDashboard,
  getAllExpenes,
};
