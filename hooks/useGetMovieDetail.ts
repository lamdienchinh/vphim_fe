"use client";
import { MovieApi } from "@/api/movieApi";
import { IMovieDetailResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useGetMovieDetail = (slug?: string) => {
  return useQuery<IMovieDetailResponse, Error>({
    queryKey: ["movie-detail", slug],
    queryFn: async () => {
      const result = await MovieApi.getMovieDetail(slug);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
