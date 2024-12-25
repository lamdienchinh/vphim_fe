import { IMovie } from "./movie";

export interface IGetMoviesByYear {
  year?: number;
  page: number;
  limit: number;
}

export interface IGetMoviesByYearResponse {
  data: {
    items: IMovie[];
    APP_DOMAIN_CDN_IMAGE: string;
    breadCrumb: {
      name: string;
    }[];
    params: {
      pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
      };
    };
  };
}
