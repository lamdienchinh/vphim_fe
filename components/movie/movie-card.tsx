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
      <div className="block h-full">
        <div className="group relative rounded-lg shadow-md overflow-hidden transition-transform h-full">
          <Image
            src={`${poster_url}`}
            alt={title}
            width={height}
            height={width}
            className="w-full h-full group-hover:scale-[1.05] group-hover:brightness-75 transition duration-300"
          />
          <div className="flex items-center gap-2 absolute right-4 top-2">
            {!!lang && (
              <div className="rounded-[50px] text-xs px-2 py-1 bg-yellow-200 text-yellow-700 backdrop-blur-md font-semibold w-fit">
                {lang}
              </div>
            )}
            {!!time && (
              <div className="rounded-[50px] text-xs px-2 py-1 bg-blue-200 text-blue-700 backdrop-blur-md font-semibold w-fit">
                {time}
              </div>
            )}
          </div>
          {showTitle && (
            <div className="absolute w-[90%] left-1/2 -translate-x-1/2 h-fit bg-primary/30 backdrop-blur-lg rounded-xl group-hover:bottom-5 -bottom-[100%] p-4 transition-all duration-300">
              <h2 className="text-sm font-bold mb-2 uppercase">{title}</h2>
              <p className="text-sm font-bold">{year}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  return slug ? (
    <Link href={`/movie/${slug}`}>{renderCard()}</Link>
  ) : (
    renderCard()
  );
}
