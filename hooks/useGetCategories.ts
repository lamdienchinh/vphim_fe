import { CategoryApi } from "@/api/categoryApi";
import { ICategory } from "@/types/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery<ICategory[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await CategoryApi.getCategories();
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
