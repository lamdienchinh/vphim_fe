import axiosInstance from "@/config/axiosV1";
import {
  ICountry,
  IGetMoviesByCountry,
  IGetMoviesByCountryResponse,
} from "@/types/country";
import { AxiosResponse } from "axios";

export class CountryApi {
  // Danh sách quốc gia
  public static getCountries(): Promise<AxiosResponse<ICountry[]>> {
    return axiosInstance.get("quoc-gia");
  }
  // Danh sách phim theo quốc gia
  public static getMoviesByCountry(
    params: IGetMoviesByCountry
  ): Promise<AxiosResponse<IGetMoviesByCountryResponse>> {
    return axiosInstance.get(`v1/api/quoc-gia/${params?.country}`, {
      params: {
        page: params?.page,
        limit: params?.limit,
      },
    });
  }
}
