"use client";
import { CategoryApi } from "@/api/categoryApi";
import { IGetMoviesByCategory, IGetMoviesByCategoryResponse } from "@/types/category";
import { useQuery } from "@tanstack/react-query";

export const useGetMoviesByCategory = (params: IGetMoviesByCategory) => {
  return useQuery<IGetMoviesByCategoryResponse, Error>({
    queryKey: ["movies-by-category", params],
    queryFn: async () => {
      const result = await CategoryApi.getMoviesByCategory(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!params.slug,
  });
};
