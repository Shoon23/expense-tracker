import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

interface iResultExpense {
  expenseList: Array<iExpense>;
  budgetOptions: Array<{
    id: number;
    name: string;
  }>;
  categoryOptions: Array<{
    id: number;
    name: string;
  }>;
}
const getAllExpenes = (
  userId: number
): UseQueryResult<iResultExpense, unknown> => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/expense/${userId}`);
      return res.data;
    },
  });
};
// update expense
const updateExpense = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expense: {
      name?: string;
      amount?: string;
      expenseId: number;
      categoryId?: number | null;
      budgetId?: number | null;
    }) => {
      const res = await axiosPublic.put("/expense", expense);
      return res.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["expenses"]);
      setShowModal(false);
    },
  });
};

// delete expense

const deleteExpense = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expenseId: number) => {
      const res = await axiosPublic.delete(`expense/${expenseId}`);
      return res.data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["expenses"]);
      setShowModal(false);
    },
  });
};

export default {
  getMonthlyExpenseTrend,
  getCategoryDistribution,
  getDashboard,
  getAllExpenes,
  updateExpense,
  deleteExpense,
};
