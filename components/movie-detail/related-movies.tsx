import { IMovie } from "@/types/movie";
import MovieCard from "../movie/movie-card";

interface RelatedMoviesProps {
  movies: IMovie[];
  imgCDN?: string;
}
export function RelatedMovies({ movies}: RelatedMoviesProps) {
  return (
    <div className="space-y-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          id={movie._id}
          title={movie.name}
          poster_url={`${movie.poster_url}`}
          year={movie.year}
          time={movie.time}
          lang={movie.lang}
          slug={movie.slug}
        />
      ))}
    </div>
  );
}
