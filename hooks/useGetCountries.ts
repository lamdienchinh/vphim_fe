import { CountryApi } from "@/api/countryApi";
import { ICountry } from "@/types/country";
import { useQuery } from "@tanstack/react-query";

export const useGetCountries = () => {
  return useQuery<ICountry[], Error>({
    queryKey: ["countries"],
    queryFn: async () => {
      const result = await CountryApi.getCountries();
      return result?.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
