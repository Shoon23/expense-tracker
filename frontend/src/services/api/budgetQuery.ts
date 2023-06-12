import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstance";

// get all budgets
interface iResultsBudgets {
  budgetList: {
    id: number;
    name: string;
    amount: string;
    description: string | null;
    createdAt: string;
    expenses: number;
  }[];
  isLastPage: boolean;
}
const getBudgets = (
  userId: number,
  page: number,
  searchKey?: string,
  dateFilter?: number
) => {
  return useQuery<iResultsBudgets, unknown>(["budgets", page], async () => {
    const res = await axiosPublic.get(`/budget/${userId}`, {
      params: {
        page,
        searchKey,
        dateFilter,
      },
    });
    return res.data;
  });
};

// get budget expenses
interface iResultsExpenses {
  expenseList: {
    id: number;
    name: string;
    amount: string;
    createdAt: string;
    category: {
      id: number;
      name: string;
    };
  }[];
  isLastPage: boolean;
}
const getBudgetExpenses = (budgetId: number, page: number) => {
  return useQuery<iResultsExpenses, unknown>(
    ["budgetExpenses", page],
    async () => {
      const res = await axiosPublic.get(`budget/${budgetId}/expense`, {
        params: {
          page,
        },
      });

      return res.data;
    }
  );
};

// get date as a option

const getDates = (userId: number) => {
  return useQuery<
    Array<{
      id: number;
      createdAt: string;
    }>,
    unknown
  >(["dateBudgetsOptions"], async () => {
    const res = await axiosPublic.get(`/budget/${userId}/dates`);
    return res.data;
  });
};

// get budgets as an option
const getBudgetOptions = (userId: number) => {
  return useQuery<
    Array<{
      id: number;
      name: string;
    }>,
    unknown
  >(["budgetOptions"], async () => {
    const res = await axiosPublic.get(`/budget/${userId}/options`);
    return res.data;
  });
};

// update budget

const updateBudget = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budget: {
      budgetId: number;
      amount?: string;
      name?: string;
      description?: string | undefined;
    }) => {
      const res = await axiosPublic.put(`/budget`, budget);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["budgets"]);
      setShowModal(false);
    },
  });
};
// delete budget
const deleteBudget = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId: number) => {
      const res = await axiosPublic.delete(`/budget/${budgetId}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["budgets"]);
      setShowModal(false);
    },
  });
};

// delete budget expense
const deleteBudgetExpense = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expenseId: number) => {
      const res = await axiosPublic.delete(`budget/${expenseId}/expense`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["budgetExpenses"]);
      setShowModal(false);
    },
  });
};

// add budget
const createBudget = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setBudgetData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      amount: string;
      description?: string | null;
    }>
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budget: {
      userId: number;
      name: string;
      amount: string;
      description?: string | null;
    }) => {
      const res = await axiosPublic.post(`budget/`, budget);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["budgets"]);
      setBudgetData({
        name: "",
        amount: "",
        description: "",
      });
      setShowModal(false);
    },
  });
};

export default {
  createBudget,
  getDates,
  deleteBudgetExpense,
  getBudgetExpenses,
  getBudgets,
  getBudgetOptions,
  deleteBudget,
  updateBudget,
};
