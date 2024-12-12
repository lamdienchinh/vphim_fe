import { MovieApi } from "@/api/movieApi";
import { IGetParams } from "@/types/common";
import { IMoviesResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleMovies = (params?: IGetParams) => {
  return useQuery<IMoviesResponse, Error>({
    queryKey: ["singleMovies"],
    queryFn: async () => {
      const result = await MovieApi.getSingleMovies(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
