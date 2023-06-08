import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstance";

// get all categories

interface iResultsCategories {
  categoryList: {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
    expenses: number;
  }[];
  isLastPage: boolean;
}

const getAll = (userId: number, page: number, searchKey?: string) => {
  return useQuery<iResultsCategories, unknown>(["categories"], async () => {
    const res = await axiosPublic.get(`/category/${userId}`, {
      params: {
        page,
        searchKey,
      },
    });
    return res.data;
  });
};

// get category as an option
const getCategoryOptions = (userId: number) => {
  return useQuery<
    Array<{
      id: number;
      name: string;
    }>,
    unknown
  >(["categoryOptions"], async () => {
    const res = await axiosPublic.get(`/category/${userId}/options`);
    return res.data;
  });
};

// get category expenses
interface iResultsExpenses {
  expenseList: {
    id: number;
    name: string;
    amount: string;
    createdAt: string;
    budget: {
      id: number;
      name: string;
    };
  }[];
  isLastPage: boolean;
}
const getCategoryExpenses = (
  categoryId: number,
  page: number,
  searchKey?: string
) => {
  return useQuery<iResultsExpenses, unknown>(
    ["categoryExpenses", page],
    async () => {
      const res = await axiosPublic.get(`category/${categoryId}/expense`, {
        params: {
          page,
          searchKey,
        },
      });

      return res.data;
    }
  );
};

// update category

const updateCategory = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: {
      categoryId: number;
      name?: string;
      description?: string | null;
    }) => {
      const res = await axiosPublic.put(`/category`, category);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["categories"]);
      setShowModal(false);
    },
  });
};

// delete category
const deleteCategory = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryId: number) => {
      const res = await axiosPublic.delete(`/category/${categoryId}`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["categories"]);
      setShowModal(false);
    },
  });
};

// delete categoru expense
const deleteCategoryExpense = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expenseId: number) => {
      const res = await axiosPublic.delete(`category/${expenseId}/expense`);
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["categoryExpenses"]);
      setShowModal(false);
    },
  });
};

export default {
  deleteCategory,
  updateCategory,
  getCategoryExpenses,
  getAll,
  getCategoryOptions,
  deleteCategoryExpense,
};
