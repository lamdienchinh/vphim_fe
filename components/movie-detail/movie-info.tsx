"use client";

import { IMovieDetail } from "@/types/movie";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

export function MovieInfo({ movie }: { movie: IMovieDetail }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={
                    movie?.poster_url ?? "/placeholder.svg?height=450&width=300"
                  }
                  alt={movie.name || "Poster phim"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/watch/${movie.slug}`}>
                  <Button className="flex-1 flex items-center">
                    <PlayCircle />
                    Xem phim
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-2">{movie.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {movie.origin_name || "Tên gốc không xác định"}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <InfoItem label="Năm phát hành" value={movie.year} />
              <InfoItem label="Trạng thái" value={movie.status} />
              <InfoItem label="Thời lượng" value={movie.time} />
              <InfoItem label="Chất lượng" value={movie.quality} />
              <InfoItem label="Ngôn ngữ" value={movie.lang} />
            </div>
            <div className="space-y-6">
              <InfoItem
                label="Thể loại"
                value={
                  <div className="flex flex-wrap gap-2">
                    {movie.category.map((cat) => (
                      <Badge key={cat.id} variant="secondary">
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                }
              />
              <InfoItem
                label="Quốc gia"
                value={
                  <div className="flex flex-wrap gap-2">
                    {movie.country.map((country) => (
                      <Badge key={country.id} variant="outline">
                        {country.name}
                      </Badge>
                    ))}
                  </div>
                }
              />
              <InfoItem label="Đạo diễn" value={movie.director.join(", ")} />
              <InfoItem label="Diễn viên" value={movie.actor.join(", ")} />
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Mô tả</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.content || "Không có mô tả"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {!!movie.trailer_url && (
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full"
            src={movie.trailer_url?.replace("watch?v=", "embed/") ?? ""}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span className="font-semibold text-muted-foreground">{label}:</span>{" "}
      <span className="text-foreground">{value}</span>
    </div>
  );
}
