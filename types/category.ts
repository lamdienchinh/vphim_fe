import { IMovie } from "./movie";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export interface IGetMoviesByCategory {
  slug: string;
  page: number;
  limit: number;
}

export interface IGetMoviesByCategoryResponse {
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
