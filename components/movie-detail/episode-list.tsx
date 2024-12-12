"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

interface EpisodeServer {
  server_name: string;
  server_data: Episode[];
}

export function EpisodeList({ episodes }: { episodes: EpisodeServer[] }) {
  const [selectedEpisode, setSelectedEpisode] = useState<
    Episode | null | undefined
  >(episodes?.[0]?.server_data?.[0]);

  return (
    <div className="mt-8 space-y-4">
      {selectedEpisode && (
        <div className="mt-4">
          <div className="aspect-video">
            <iframe
              src={selectedEpisode.link_embed}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">Tập phim</h2>
      <Tabs defaultValue={episodes[0]?.server_name}>
        <TabsList>
          {episodes.map((server) => (
            <TabsTrigger key={server.server_name} value={server.server_name}>
              {server.server_name}
            </TabsTrigger>
          ))}
        </TabsList>
        {episodes.map((server) => (
          <TabsContent key={server.server_name} value={server.server_name}>
            <div className="grid grid-cols-12 gap-2">
              {server.server_data.map((episode) => (
                <Button
                  key={episode.slug}
                  variant={
                    selectedEpisode?.slug === episode.slug
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelectedEpisode(episode)}
                >
                  {episode.name}
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
