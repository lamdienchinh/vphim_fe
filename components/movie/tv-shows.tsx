"use client";
import { useGetTVShows } from "@/hooks/useGetTVShows";
import MovieList from "./movie-list";
import SkeletonGrid from "../skeleton/skeleton-grid";

export default function TVShows() {
  const { data, isLoading } = useGetTVShows({
    page: 1,
    limit: 20,
  });

  const movies = data?.data?.items || [];
  const imgCDN = data?.data.APP_DOMAIN_CDN_IMAGE || "";

  if (isLoading) {
    return (
      <div className="container">
        <SkeletonGrid count={20} />;
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
      <MovieList
        title="Phim hoạt hình"
        imgCDN={imgCDN}
        movies={movies}
        link={"/tv-shows"}
      />
    </div>
  );
}
