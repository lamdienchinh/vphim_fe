"use client";
import { EpisodeList } from "@/components/movie-detail/episode-list";
import { MovieSummary } from "@/components/movie-detail/movie-summary";
import { useGetMovieDetail } from "@/hooks/useGetMovieDetail";
import { useParams } from "next/navigation";

export default function WatchPage() {
  const { slug } = useParams();
  const { data } = useGetMovieDetail(slug as string);
  const episodes = data?.episodes;
  const movie = data?.movie;
  if (!episodes || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg text-muted-foreground">
          Phim chưa hợp lệ
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <MovieSummary movie={movie} />
      <EpisodeList episodes={episodes} />
    </div>
  );
}
