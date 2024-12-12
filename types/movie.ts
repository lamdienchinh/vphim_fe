interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Modified {
  time: string;
}

export interface ILatestMovie {
  _id: number;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  name: string;
}

export interface IMovie {
  modified: Modified;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  country: Category[];
}

export interface ILatestMoviesResponse {
  items: ILatestMovie[];
  status: boolean;
  pagination: {
    currentPage: number;
    totalItems: number;
    totalItemsPerPage: number;
    totalPages: number;
  };
}

export interface IMoviesResponse {
  data: {
    items: IMovie[];
    APP_DOMAIN_CDN_IMAGE: string;
    APP_DOMAIN_FRONTEND: string;
    breadCrumb: {
      isCurrent: boolean;
      name: string;
      position: number;
      slug: string;
    }[];
    params: {
      filterCategory: string[];
      filterCountry: string[];
      filterType: string[];
      filterYear: string[];
    };
    pagination: {
      currentPage: number;
      totalItems: number;
      totalItemsPerPage: number;
      totalPages: number;
    };
    sortField: string;
    sortType: string;
    type_slug: string;
    seoOnPage: {
      og_type: string;
      titleHead: string;
      descriptionHead: string;
      og_image: string[];
      og_url: string;
    };
    titlePage: string;
    type_list: string;
  };
  status: boolean;
}

interface TMDB {
  type: string;
  id: string;
  season: number;
  vote_average: number;
  vote_count: number;
}

interface IMDB {
  id: string | null;
}

interface Timestamp {
  time: string;
}

interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface IMovieDetail {
  tmdb: TMDB;
  imdb: IMDB;
  created: Timestamp;
  modified: Timestamp;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
}

interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

interface EpisodeServer {
  server_name: string;
  server_data: Episode[];
}

export interface IMovieDetailResponse {
  status: boolean;
  msg: string;
  movie: IMovieDetail;
  episodes: EpisodeServer[];
}