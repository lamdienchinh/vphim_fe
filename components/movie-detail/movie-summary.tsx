import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMovieDetail } from "@/types/movie";
import Link from "next/link";
import { Clock, Calendar, Info } from "lucide-react";

interface MovieSummaryProps {
  movie: IMovieDetail;
}

export function MovieSummary({ movie }: MovieSummaryProps) {
  return (
    <div className="group bg-card hover:bg-card/80 transition-all duration-300 text-card-foreground rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-2/5 md:w-1/3">
          <div className="relative aspect-[2/3] sm:aspect-auto sm:h-full">
            <Image
              src={movie.thumb_url}
              alt={movie.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent sm:hidden" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:hidden">
            <h2 className="text-xl font-bold text-primary mb-1 line-clamp-2">
              {movie.name}
            </h2>
            <p className="text-sm text-primary/80 line-clamp-1">
              {movie.origin_name}
            </p>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 flex flex-col">
          <div className="hidden sm:block mb-4">
            <h2 className="text-2xl font-bold mb-2 line-clamp-2">
              {movie.name}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {movie.origin_name}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.category.map((category) => (
              <Badge
                key={category.id}
                variant="secondary"
                className="px-2 py-1 text-xs"
              >
                {category.name}
              </Badge>
            ))}
          </div>

          {/* Movie Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{movie.year}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{movie.time}</span>
            </div>
          </div>

          {/* Description */}
          {movie.content && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {movie.content}
            </p>
          )}

          <div className="flex gap-3 mt-auto">
            <Link href={`/movie/${movie.slug}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <Info className="w-4 h-4" />
                Chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
