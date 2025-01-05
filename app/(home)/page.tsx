import CartoonMovies from "@/components/movie/cartoon-movies";
import MovieBanner from "@/components/movie/movie-banner";
import SeriesMovies from "@/components/movie/series-movies";
import SingleMovies from "@/components/movie/single-movies";
import TVShows from "@/components/movie/tv-shows";

export default function Home() {
  return (
    <main className="space-y-5">
      <MovieBanner />
      <CartoonMovies />
      <SeriesMovies />
      <SingleMovies />
      <TVShows />
    </main>
  );
}
