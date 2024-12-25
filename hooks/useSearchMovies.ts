import { MovieApi } from "@/api/movieApi";
import { ISearchParams } from "@/types/common";
import { IMoviesResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useSearchMovies = (params?: ISearchParams) => {
  return useQuery<IMoviesResponse, Error>({
    queryKey: ["search-movies", params],
    queryFn: async () => {
      const result = await MovieApi.searchMovies(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
