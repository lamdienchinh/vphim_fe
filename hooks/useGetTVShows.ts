import { MovieApi } from "@/api/movieApi";
import { IGetParams } from "@/types/common";
import { IMoviesResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const useGetTVShows = (params?: IGetParams) => {
  return useQuery<IMoviesResponse, Error>({
    queryKey: ["TVShows"],
    queryFn: async () => {
      const result = await MovieApi.getTVShows(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
