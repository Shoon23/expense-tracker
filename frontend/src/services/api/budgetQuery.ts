import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstance";

// get all budgets
interface iResultsBudgets {
  budgetList: {
    id: number;
    name: string;
    amount: string;
    description: string | undefined;
    createdAt: string;
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
// delete expense
const deleteBudget = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId: number) => {
      console.log(budgetId);
      const res = await axiosPublic.delete(`/budget/${budgetId}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["budgets"]);
      setShowModal(false);
    },
  });
};

export default {
  getDates,
  getBudgetExpenses,
  getBudgets,
  getBudgetOptions,
  deleteBudget,
  updateBudget,
};
