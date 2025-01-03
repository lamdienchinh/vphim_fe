import axiosInstance from "@/config/axiosV1";
import { IGetMoviesByYear, IGetMoviesByYearResponse } from "@/types/year";
import { AxiosResponse } from "axios";

export class YearApi {
  // Danh sách phim theo năm
  public static getMoviesByYear(
    params: IGetMoviesByYear
  ): Promise<AxiosResponse<IGetMoviesByYearResponse>> {
    return axiosInstance.get(`v1/api/nam/${params?.year}`, {
      params: {
        page: params?.page,
        limit: params?.limit,
      },
    });
  }
}
