import { MovieApi } from "@/api/movieApi";
import { IGetParams } from "@/types/common";
import { IMoviesResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useGetSeriesMovies = (params?: IGetParams) => {
  return useQuery<IMoviesResponse, Error>({
    queryKey: ["seriesMovies"],
    queryFn: async () => {
      const result = await MovieApi.getSeriesMovies(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
