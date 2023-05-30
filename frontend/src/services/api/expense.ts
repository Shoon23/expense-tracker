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

// get recent expense
type Expense = {
  expenseList: Array<{
    amount: string;
    budget: { name: string };
    category: { name: string };
    id: number;
    name: string;
  }>;
  budgetList: {
    id: number;
    name: string;
  }[];
  recentExpense: {
    amount: string;
    budget: null;
    category: {
      name: string;
    };
    name: string;
  };
};
const getDashboard = (userId: number): UseQueryResult<Expense, unknown> => {
  return useQuery(["recentExpense"], async () => {
    const res = await axiosPublic.get(`/expense/${userId}/dashboard`);

    return res?.data;
  });
};

export default {
  getMonthlyExpenseTrend,
  getCategoryDistribution,
  getDashboard,
};
