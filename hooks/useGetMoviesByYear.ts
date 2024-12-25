import { YearApi } from "@/api/yearApi";
import { IGetMoviesByYear, IGetMoviesByYearResponse } from "@/types/year";
import { useQuery } from "@tanstack/react-query";

export const useGetMoviesByYear = (params: IGetMoviesByYear) => {
  return useQuery<IGetMoviesByYearResponse, Error>({
    queryKey: ["movies-by-country", params],
    queryFn: async () => {
      const result = await YearApi.getMoviesByYear(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!params.year,
  });
};
