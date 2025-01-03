"use client";
import MovieCard from "@/components/movie/movie-card";
import { type CarouselApi } from "@/components/ui/carousel";
import { useGetLatestMovies } from "@/hooks/useGetLatestMovies";
import { ILatestMovie } from "@/types/movie";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../loading/loader-circle";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function MovieBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { data, isLoading } = useGetLatestMovies();

  const movies = data?.items || [];
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg h-screen mx-auto">
        <Spinner />
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
    <div className="min-h-screen">
      <div className="relative w-full bg-center h-screen flex">
        <div className="absolute right-0 inset-y-0 w-full h-full overflow-hidden">
          <Image
            src={movies[current]?.thumb_url ?? ""}
            alt="thumbnail"
            fill
            style={{ objectFit: "cover" }}
            className="z-0 rounded-md"
            priority
          />
        </div>
        <div className="absolute z-1 inset-0 bg-gradient-to-r from-30% via-50% top-90% from-black/70 via-black/20 to-black/80" />
        <div className="absolute z-1 left-0 inset-y-0 w-[30%]" />
        <div className="relative z-2 gap-4 text-2xl font-semibold container flex h-full flex-col justify-end items-center">
          <div className="w-full space-y-5">
            <div className="text-4xl leading-[55px] max-w-[50%]">
              {movies[current]?.name}
            </div>
            <div className="text-xl">
              Năm phát hành: {movies[current]?.year}
            </div>
            <div>
              <Button>
                <Link href={`/movie/${movies[current].slug}`}>Xem ngay</Link>
              </Button>
            </div>
          </div>
          <div className="py-8 w-full flex justify-center overflow-x-hidden">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: false,
                }),
              ]}
              opts={{
                loop: true,
              }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-1">
                {movies.map((movie: ILatestMovie, index: number) => (
                  <CarouselItem
                    className={`pl-4 md:basis-1/2 lg:basis-[15%] ${
                      movies[current]?._id === movie._id
                        ? "relative bottom-5"
                        : ""
                    }`}
                    onClick={() => {
                      api?.scrollTo(index);
                    }}
                    key={movie._id}
                  >
                    <MovieCard
                      id={movie._id}
                      title={movie.name}
                      poster_url={movie.poster_url}
                      year={movie.year}
                      showTitle={false}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
