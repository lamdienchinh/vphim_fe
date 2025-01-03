import axiosInstance from "@/config/axiosV1";
import {
  ICategory,
  IGetMoviesByCategory,
  IGetMoviesByCategoryResponse,
} from "@/types/category";
import { AxiosResponse } from "axios";

export class CategoryApi {
  // Danh sách thể loại
  public static getCategories(): Promise<AxiosResponse<ICategory[]>> {
    return axiosInstance.get("the-loai");
  }
  // Danh sách phim theo thể loại
  public static getMoviesByCategory(
    params: IGetMoviesByCategory
  ): Promise<AxiosResponse<IGetMoviesByCategoryResponse>> {
    return axiosInstance.get(`v1/api/the-loai/${params?.slug}`, {
      params: {
        page: params?.page,
        limit: params?.limit,
      },
    });
  }
}
