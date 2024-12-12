"use client";
import MovieList from "./movie-list";
import { useGetSeriesMovies } from "@/hooks/useGetSeriesMovies";

export default function SeriesMovies() {
  const { data, isLoading } = useGetSeriesMovies({
    page: 1,
    limit: 15,
  });

  const movies = data?.data?.items || [];
  const imgCDN = data?.data.APP_DOMAIN_CDN_IMAGE || "";

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
      <MovieList title="Phim bộ" imgCDN={imgCDN} movies={movies} />
    </div>
  );
}
