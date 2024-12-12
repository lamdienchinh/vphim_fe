import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IMovieDetail } from "@/types/movie";
import Link from "next/link";

interface MovieSummaryProps {
  movie: IMovieDetail;
}

export function MovieSummary({ movie }: MovieSummaryProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden mb-8 flex">
      <div className="relative w-1/3 h-[200px]">
        <Image
          src={movie.thumb_url}
          alt={movie.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 w-2/3">
        <h1 className="text-2xl font-bold mb-2">{movie.name}</h1>
        <p className="text-sm text-muted-foreground mb-2">
          {movie.origin_name}
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {movie.category.slice(0, 3).map((category) => (
            <Badge key={category.id} variant="secondary">
              {category.name}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <InfoItem label="Năm" value={movie.year.toString()} />
          <InfoItem label="Thời lượng" value={movie.time} />
        </div>
        <Link
          href={`/movie/${movie.slug}`}
          className="text-sm text-primary hover:underline"
        >
          Xem chi tiết phim
        </Link>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-semibold">{label}:</span> {value}
    </div>
  );
}
