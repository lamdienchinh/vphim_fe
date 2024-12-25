"use client";
import { useGetSingleMovies } from "@/hooks/useGetSingleMovies";
import MovieList from "./movie-list";

export default function SingleMovies() {
  const { data, isLoading } = useGetSingleMovies({
    page: 1,
    limit: 15,
  });

  const movies = data?.data?.items || [];
  const imgCDN = data?.data.APP_DOMAIN_CDN_IMAGE || '';

  if (isLoading) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
        Không có phim để hiển thị
      </div>
    );
  }

  return (
    <div>
      <MovieList title="Phim lẻ" imgCDN={imgCDN} movies={movies} link={'/single-movies'}/>
    </div>
  );
}
