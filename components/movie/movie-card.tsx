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

export default function MovieCard({
  title,
  poster_url,
  year,
  height = 500,
  width = 500,
  showTitle = true,
  time,
  lang,
  slug,
}: MovieCardProps) {
  const renderCard = () => {
    return (
      <div className="h-full">
        <div className="group relative rounded-lg shadow-md overflow-hidden transition-transform h-full">
          <Image
            src={`${poster_url}`}
            alt={title}
            width={height}
            height={width}
            className="w-full h-[250px] sm:h-[350px] object-cover group-hover:scale-[1.05] group-hover:brightness-75 transition duration-300"
          />
          <div className="flex items-center gap-2 absolute top-2 left-4 flex-wrap">
            {!!lang && (
              <div className="rounded-[50px] text-nowrap text-xs px-2 py-1 bg-yellow-200 text-yellow-700 backdrop-blur-md font-semibold w-fit">
                {lang}
              </div>
            )}
            {!!time && (
              <div className="rounded-[50px] text-nowrap text-xs px-2 py-1 bg-blue-200 text-blue-700 backdrop-blur-md font-semibold w-fit">
                {time}
              </div>
            )}
          </div>
          {showTitle && (
            <div className="absolute w-[90%] left-1/2 -translate-x-1/2 h-fit bg-primary/30 backdrop-blur-lg rounded-xl group-hover:bottom-5 -bottom-[100%] p-4 transition-all duration-300">
              <h2 className="text-xs sm:text-sm font-bold mb-2 uppercase">
                {title}
              </h2>
              <p className="text-xs sm:text-sm font-bold">{year}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  return slug ? (
    <div>
      <Link className="block" href={`/movie/${slug}`}>
        {renderCard()}
      </Link>
      <div className="sm:hidden mt-2 max-w-full">
        <h2 className="text-xs sm:text-sm font-bold mb-2 uppercase truncate">
          {title}
        </h2>
        <p className="text-xs sm:text-sm font-bold truncate">{year}</p>
      </div>
    </div>
  ) : (
    renderCard()
  );
}
