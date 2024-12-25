"use client";
import MovieCard from "@/components/movie/movie-card";
import { useState } from "react";
import Pagination from "@/components/pagination/normal-pagination";
import { Badge } from "@/components/ui/badge";
import { useGetCartoonMovies } from "@/hooks/useGetCartoonMovies";
import SkeletonGrid from "@/components/skeleton/skeleton-grid";

export default function CartoonMoviesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 18; // Số lượng phim trên mỗi trang

  // Gọi hook với tham số phân trang
  const { data, isLoading } = useGetCartoonMovies({
    page: currentPage,
    limit: limit,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="container py-8 mt-[100px]">
        <SkeletonGrid count={18} />
      </div>
    );
  }

  const movies = data?.data?.items;
  const totalPages = data?.data?.params?.pagination?.totalPages ?? 0;
  const totalItems = data?.data?.params?.pagination?.totalItems ?? 0;
  const imgCDN = data?.data.APP_DOMAIN_CDN_IMAGE || "";

  return (
    <div className="container py-8 mt-[100px]">
      <div className="flex items-center gap-2 mb-8 uppercase text-lg font-bold">
        <h1>Danh sách phim hoạt hình</h1>
        <Badge>{totalItems} phim</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies?.map((movie) => (
          <MovieCard
            key={movie._id}
            id={movie._id}
            title={movie.name}
            poster_url={`${imgCDN}/${movie.poster_url}`}
            year={movie.year}
            time={movie.time}
            lang={movie.lang}
            slug={movie.slug}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
