import axiosInstance from "@/config/axios";
import { IGetParams } from "@/types/common";
import { ILatestMoviesResponse, IMovieDetailResponse, IMoviesResponse } from "@/types/movie";
import { AxiosResponse } from "axios";

export class MovieApi {
  // Danh sách phim mới nhất
  public static getLatestMovies(
    params?: IGetParams
  ): Promise<AxiosResponse<ILatestMoviesResponse>> {
    return axiosInstance.get("/danh-sach/phim-moi-cap-nhat-v2", {
      params,
    });
  }
  // Danh sách phim lẻ
  public static getSingleMovies(
    params?: IGetParams
  ): Promise<AxiosResponse<IMoviesResponse>> {
    return axiosInstance.get("v1/api/danh-sach/phim-le", {
      params,
    });
  }
  // Danh sách phim bộ
  public static getSeriesMovies(
    params?: IGetParams
  ): Promise<AxiosResponse<IMoviesResponse>> {
    return axiosInstance.get("v1/api/danh-sach/phim-bo", {
      params,
    });
  }
  // Danh sách TV shows
  public static getTVShows(
    params?: IGetParams
  ): Promise<AxiosResponse<IMoviesResponse>> {
    return axiosInstance.get("v1/api/danh-sach/tv-shows", {
      params,
    });
  }
  // Danh sách hoạt hình
  public static getCartoonMovies(
    params?: IGetParams
  ): Promise<AxiosResponse<IMoviesResponse>> {
    return axiosInstance.get("v1/api/danh-sach/hoat-hinh", {
      params,
    });
  }
  // Chi tiết phim
  public static getMovieDetail(
    slug?: string
  ): Promise<AxiosResponse<IMovieDetailResponse>> {
    return axiosInstance.get(`phim/${slug}`);
  }
}
