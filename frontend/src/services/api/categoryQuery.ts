import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePrivateRoutes from "../../hooks/usePrivateRoutes";
import { iUser } from "../../types/user";

// eslint-disable-next-line react-hooks/rules-of-hooks

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
  const queryClient = useQueryClient();
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useQuery<iResultsCategories, unknown>(["categories"], async () => {
    const res = await api.get(`/category/${userId}`, {
      params: {
        page,
        searchKey,
      },
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return res.data;
  });
};

// get category as an option
const getCategoryOptions = (userId: number) => {
  const queryClient = useQueryClient();
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useQuery<
    Array<{
      id: number;
      name: string;
    }>,
    unknown
  >(["categoryOptions"], async () => {
    const res = await api.get(`/category/${userId}/options`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
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
  const queryClient = useQueryClient();
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useQuery<iResultsExpenses, unknown>(
    ["categoryExpenses", page],
    async () => {
      const res = await api.get(`category/${categoryId}/expense`, {
        params: {
          page,
          searchKey,
        },
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
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
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (category: {
      categoryId: number;
      name?: string;
      description?: string | null;
    }) => {
      const res = await api.put(`/category`, category, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
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
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (categoryId: number) => {
      const res = await api.delete(`/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["categories"]);
      setShowModal(false);
    },
  });
};

// delete category expense
const deleteCategoryExpense = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (expenseId: number) => {
      const res = await api.delete(`category/${expenseId}/expense`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["categoryExpenses"]);
      setShowModal(false);
    },
  });
};

// add category
const createCategory = (
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  setCategoryData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description?: string | null;
    }>
  >
) => {
  const queryClient = useQueryClient();
  const api = usePrivateRoutes();
  const user = queryClient.getQueryData<iUser>(["user"]);

  return useMutation({
    mutationFn: async (category: {
      userId: number;
      name: string;
      description?: string | null;
    }) => {
      const res = await api.post(`/category`, category, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return res.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["categories"]);
      setCategoryData({
        name: "",
        description: "",
      });
      setShowModal(false);
    },
  });
};

export default {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryExpenses,
  getAll,
  getCategoryOptions,
  deleteCategoryExpense,
};
