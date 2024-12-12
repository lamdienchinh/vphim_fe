"use client";
import { useGetMovieDetail } from "@/hooks/useGetMovieDetail";
import { MovieInfo } from "@/components/movie-detail/movie-info";
import { useParams } from "next/navigation";

export default function MoviePage() {
  const { slug } = useParams();
  const { data } = useGetMovieDetail(slug as string);
  const movie = data?.movie;

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg text-muted-foreground">
          Phim chưa hợp lệ
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <MovieInfo movie={movie} />
    </div>
  );
}
