"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";

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
        <div key={selectedEpisode.slug} className="aspect-video relative">
          <iframe
            src={selectedEpisode.link_embed}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold mb-4"
      >
        Tập phim
      </motion.h2>
      <Tabs defaultValue={episodes[0]?.server_name}>
        <TabsList>
          {episodes.map((server, index) => (
            <motion.div
              key={server.server_name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <TabsTrigger value={server.server_name}>
                {server.server_name}
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>
        {episodes.map((server) => (
          <TabsContent key={server.server_name} value={server.server_name}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-12 gap-2"
            >
              {server.server_data.map((episode, index) => (
                <motion.div
                  key={episode.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.03 * index }}
                >
                  <Button
                    variant={
                      selectedEpisode?.slug === episode.slug
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setSelectedEpisode(episode)}
                    className="w-full"
                  >
                    {episode.name}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
