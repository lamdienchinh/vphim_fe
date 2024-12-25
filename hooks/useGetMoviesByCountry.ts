import { CategoryApi } from "@/api/categoryApi";
import { CountryApi } from "@/api/countryApi";
import {
  IGetMoviesByCountry,
  IGetMoviesByCountryResponse,
} from "@/types/country";
import { useQuery } from "@tanstack/react-query";

export const useGetMoviesByCountry = (params: IGetMoviesByCountry) => {
  return useQuery<IGetMoviesByCountryResponse, Error>({
    queryKey: ["movies-by-country", params],
    queryFn: async () => {
      const result = await CountryApi.getMoviesByCountry(params);
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!params.country,
  });
};
