import { IMovie } from "./movie";

export interface ICountry {
  _id: string;
  name: string;
  slug: string;
}

export interface IGetMoviesByCountry {
  country: string;
  page: number;
  limit: number;
}

export interface IGetMoviesByCountryResponse {
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
