"use client";
import LoadingSnippet from "@/components/loading/loading-snippet";
import { EpisodeList } from "@/components/movie-detail/episode-list";
import { MovieSummary } from "@/components/movie-detail/movie-summary";
import { useGetMovieDetail } from "@/hooks/useGetMovieDetail";
import { useParams } from "next/navigation";

export default function WatchPage() {
  const { slug } = useParams();
  const { data, isLoading } = useGetMovieDetail(slug as string);
  const episodes = data?.episodes;
  const movie = data?.movie;

  if (isLoading)
    return (
      <div className="container flex justify-center py-8">
        <div className="flex items-center gap-2 text-center text-lg text-muted-foreground">
          <LoadingSnippet /> Đang tải ...
        </div>
      </div>
    );

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
    <div className="container space-y-4">
      <EpisodeList episodes={episodes} />
      <MovieSummary movie={movie} />
    </div>
  );
}
