import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  id: number | string;
  title: string;
  poster_url: string;
  year: number;
  height?: number;
  width?: number;
  showTitle?: boolean;
  time?: string;
  lang?: string;
  slug?: string;
}

const SearchMovieCard: React.FC<MovieCardProps> = ({
  title,
  poster_url,
  year,
  slug,
  height = 100,
  width = 70,
  showTitle = true,
}) => {
  return (
    <Link
      href={`/movie/${slug}`}
      className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded transition duration-200"
    >
      <Image
        src={poster_url}
        alt={title}
        height={height}
        width={width}
        className="rounded object-cover"
      />
      {showTitle && (
        <div className="flex flex-col">
          <span className="font-medium text-primary">{title}</span>
          <span className="text-sm text-gray-500">{year}</span>
        </div>
      )}
    </Link>
  );
};

export default SearchMovieCard