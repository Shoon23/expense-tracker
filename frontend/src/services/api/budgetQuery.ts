import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstance";

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

export default {
  getBudgetOptions,
};
