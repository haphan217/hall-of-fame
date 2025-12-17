import { useState } from "react";

import { type Video } from "../types";
import { Pagination } from "./Pagination";
import { VideoCard } from "./VideoCard";

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

const VIDEOS_PER_PAGE = 10;

export const VideoGrid = ({ videos, onVideoClick }: VideoGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top smoothly when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {currentVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => onVideoClick(video)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Results Info */}
      <div className="text-center text-gray-400 text-sm mt-4">
        Showing {startIndex + 1}-{Math.min(endIndex, videos.length)} of{" "}
        {videos.length} videos
      </div>
    </div>
  );
};
