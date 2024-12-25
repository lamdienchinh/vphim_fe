"use client";

import { IMovieDetail } from "@/types/movie";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Clock, Star, Calendar, Globe } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";

export const MovieInfo = (({ movie }: { movie: IMovieDetail }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={movie?.poster_url ?? "/placeholder.svg?height=450&width=300"}
            alt="Movie backdrop"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>

      <div className="relative -mt-48 container mx-auto pb-12">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <Card className="">
              <CardContent className="p-0">
                <div className="relative aspect-[2/3] rounded-t-lg overflow-hidden">
                  <Image
                    src={
                      movie?.poster_url ??
                      "/placeholder.svg?height=450&width=300"
                    }
                    alt={movie.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4 space-y-4">
                  <Link href={`/watch/${movie.slug}`}>
                    <Button className="w-full text-lg h-12 font-medium">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Xem phim
                    </Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <QuickInfoItem
                      icon={<Clock className="w-4 h-4" />}
                      label="Thời lượng"
                      value={movie.time}
                    />
                    <QuickInfoItem
                      icon={<Star className="w-4 h-4" />}
                      label="Chất lượng"
                      value={movie.quality}
                    />
                    <QuickInfoItem
                      icon={<Calendar className="w-4 h-4" />}
                      label="Năm"
                      value={movie.year}
                    />
                    <QuickInfoItem
                      icon={<Globe className="w-4 h-4" />}
                      label="Ngôn ngữ"
                      value={movie.lang}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{movie.name}</h1>
              <p className="text-xl text-muted-foreground">
                {movie.origin_name}
              </p>
              <div className="flex flex-wrap gap-2">
                {movie.category.map((cat) => (
                  <Badge key={cat.id} variant="secondary" className="px-3 py-1">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <InfoSection title="Giới thiệu" content={movie.content} />

              <InfoSection
                title="Thông tin chi tiết"
                content={
                  <div className="grid sm:grid-cols-2 gap-4">
                    <DetailItem
                      label="Đạo diễn"
                      value={movie.director.join(", ")}
                    />
                    <DetailItem
                      label="Trạng thái"
                      value={
                        movie.status === "completed" ? "Hoàn thành" : "Còn tiếp"
                      }
                    />
                    <DetailItem
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
                    <DetailItem
                      label="Diễn viên"
                      value={movie.actor.join(", ")}
                    />
                  </div>
                }
              />
            </div>

            {movie.trailer_url && (
              <InfoSection
                title="Trailer"
                content={
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      className="w-full h-full"
                      src={movie.trailer_url.replace("watch?v=", "embed/")}
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const QuickInfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col items-center text-center gap-1">
    <div className="text-muted-foreground">{icon}</div>
    <div className="font-medium">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const InfoSection = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <div className="text-muted-foreground">{content}</div>
  </div>
);

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="space-y-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    <div className="font-medium">{value}</div>
  </div>
);

export default MovieInfo;
