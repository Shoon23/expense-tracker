import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstance";

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

export default {
  getCategoryOptions,
};
