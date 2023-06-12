import {
  RefetchOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { axiosPublic } from "../axiosInstance";
import { fa } from "@faker-js/faker";

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
  isLastPage: boolean;
}
const getAllExpenes = (
  userId: number,
  page: number,
  searchKey?: string,
  budgetFilter?: number,
  categoryFilter?: number,
  dateFilter?: number
) => {
  return useQuery<iResultExpense, unknown>(["expenses", page], async () => {
    const res = await axiosPublic.get(`/expense/${userId}`, {
      params: {
        searchKey,
        page,
        budgetFilter,
        categoryFilter,
        dateFilter,
      },
    });
    return res.data;
  });
};
// get date as a option

const getDates = (userId: number) => {
  return useQuery<
    Array<{
      id: number;
      createdAt: string;
    }>,
    unknown
  >(["dateExpenseOptions"], async () => {
    const res = await axiosPublic.get(`/expense/${userId}/dates`);
    return res.data;
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
      expenseId?: number | null;
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

// create expense

const createExpense = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setExpenseData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      amount: string;
      budgetId?: number | null | undefined;
      categoryId?: number | null | undefined;
    }>
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expenseData: {
      userId: number;
      name: string;
      amount: string;
      budgetId?: number | null | undefined;
      categoryId?: number | null | undefined;
    }) => {
      const res = await axiosPublic.post(`expense`, expenseData);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["expenses"]);
      setExpenseData({
        name: "",
        amount: "",
        budgetId: null,
        categoryId: null,
      });
      setShowModal(false);
    },
  });
};

export default {
  createExpense,
  getMonthlyExpenseTrend,
  getCategoryDistribution,
  getDashboard,
  getAllExpenes,
  updateExpense,
  deleteExpense,
  getDates,
};
