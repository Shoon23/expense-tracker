import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import usePrivateRoutes from "../../hooks/usePrivateRoutes";
import { iUser } from "../../types/user";

// eslint-disable-next-line react-hooks/rules-of-hooks

// line chart
const getMonthlyExpenseTrend = (userId: number) => {
  const api = usePrivateRoutes();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useQuery(
    ["pieChart"],
    async () => {
      const res = await api.get(`/chart/monthly-expense-trend/${userId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return res.data;
    },
    {
      refetchOnMount: true,
    }
  );
};
// doughnut chart
const getCategoryDistribution = (userId: number) => {
  const api = usePrivateRoutes();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);
  return useQuery(
    ["doughnutChart"],
    async () => {
      const res = await api.get(`/chart/category-distribution/${userId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
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
  const api = usePrivateRoutes();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get(`/expense/${userId}/dashboard`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
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
  const api = usePrivateRoutes();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useQuery<iResultExpense, unknown>(["expenses", page], async () => {
    const res = await api.get(`/expense/${userId}`, {
      params: {
        searchKey,
        page,
        budgetFilter,
        categoryFilter,
        dateFilter,
      },
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return res.data;
  });
};
// get date as a option

const getDates = (userId: number) => {
  const api = usePrivateRoutes();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useQuery<
    Array<{
      id: number;
      createdAt: string;
    }>,
    unknown
  >(["dateExpenseOptions"], async () => {
    const res = await api.get(`/expense/${userId}/dates`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return res.data;
  });
};

// update expense
const updateExpense = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (expense: {
      name?: string;
      amount?: string;
      expenseId?: number | null;
      categoryId?: number | null;
      budgetId?: number | null;
    }) => {
      const res = await api.put("/expense", expense, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess() {
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
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (expenseId: number) => {
      const res = await api.delete(`expense/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["expenses"]);
      setShowModal(false);
    },
  });
};

// create expense

const createExpense = (
  setExpenseData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      amount: string;
      budgetId?: number | null | undefined;
      categoryId?: number | null | undefined;
    }>
  >,
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (expenseData: {
      userId: number;
      name: string;
      amount: string;
      budgetId?: number | null | undefined;
      categoryId?: number | null | undefined;
    }) => {
      const res = await api.post(`expense`, expenseData, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
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
      if (setShowModal) {
        setShowModal(false);
      }
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
