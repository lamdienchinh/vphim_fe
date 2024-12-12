import { MovieApi } from "@/api/movieApi";
import { IGetParams } from "@/types/common";
import { ILatestMoviesResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useGetLatestMovies = (params?: IGetParams) => {
  return useQuery<ILatestMoviesResponse, Error>({
    queryKey: ["latestMovies"],
    queryFn: async () => {
      const result = await MovieApi.getLatestMovies(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
