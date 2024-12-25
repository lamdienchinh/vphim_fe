"use client";
import { useGetMovieDetail } from "@/hooks/useGetMovieDetail";
import { MovieInfo } from "@/components/movie-detail/movie-info";
import { useParams } from "next/navigation";
import LoadingSnippet from "@/components/loading/loading-snippet";

export default function MoviePage() {
  const { slug } = useParams();
  const { data, isLoading } = useGetMovieDetail(slug as string);
  const movie = data?.movie;

  if (isLoading) {
    return (
      <div className="containerflex py-8 mt-[100px] flex justify-center">
        <div className="flex items-center gap-2 text-center text-lg text-muted-foreground">
          <LoadingSnippet /> Đang tải ...
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 mt-[100px]">
        <p className="text-center text-lg text-muted-foreground">
          Phim chưa hợp lệ
        </p>
      </div>
    );
  }

  return (
    <div className="">
      <MovieInfo movie={movie} />
    </div>
  );
}
