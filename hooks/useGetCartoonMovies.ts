import { MovieApi } from "@/api/movieApi";
import { IGetParams } from "@/types/common";
import { IMoviesResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useGetCartoonMovies = (params?: IGetParams) => {
  return useQuery<IMoviesResponse, Error>({
    queryKey: ["cartoonMovies", params],
    queryFn: async () => {
      const result = await MovieApi.getCartoonMovies(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
