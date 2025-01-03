"use client";

import { IMovie } from "@/types/movie";
import MovieCard from "./movie-card";
import { ChevronRight, TvMinimalPlay } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface MovieListProps {
  movies: IMovie[];
  imgCDN: string;
  title: string;
  link?: string;
}

export default function MovieList({
  movies,
  imgCDN,
  title,
  link,
}: MovieListProps) {
  return (
    <div className="container">
      <div className="flex justify-between items-center w-full bg-white/50 backdrop-blur-md mb-6 py-4 px-4 rounded-md">
        <div className="flex items-center gap-2 font-semibold text-xl uppercase">
          <TvMinimalPlay />
          {title}
        </div>
        {!!link && (
          <Button>
            <Link className='flex items-center gap-2' href={link}>
              <ChevronRight /> Xem thêm
            </Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie: IMovie) => (
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
    </div>
  );
}
