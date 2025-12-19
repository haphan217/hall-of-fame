import { useState } from "react";

import { mockVideos } from "../mockData";
import { type Video } from "../types";
import { Pagination } from "./Pagination";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

const VIDEOS_PER_PAGE = 10;

export const VideoGrid = () => {
  const [autoplay, setAutoplay] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [videos, setVideos] = useState<Video[]>(mockVideos);

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHeartClick = (videoId: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId
          ? { ...video, heartCount: video.heartCount + 1 }
          : video
      )
    );
  };

  const handleVideoClick = (id: string) => {
    setSelectedVideoId(id);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedVideoId) return;

    const currentIndex = mockVideos.findIndex((v) => v.id === selectedVideoId);
    let newIndex: number;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    } else {
      newIndex =
        currentIndex < mockVideos.length - 1 ? currentIndex + 1 : currentIndex;
    }

    setSelectedVideoId(mockVideos[newIndex].id);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
      <div className="w-fit lg:ml-auto mb-4 flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg">
        <span className="text-sm text-gray-300">Autoplay</span>
        <button
          onClick={() => setAutoplay(!autoplay)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            autoplay ? "bg-blue-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              autoplay ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {currentVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => handleVideoClick(video.id)}
            onHeartClick={() => handleHeartClick(video.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <div className="text-center text-gray-400 text-sm mt-4">
        Showing {startIndex + 1}-{Math.min(endIndex, videos.length)} of{" "}
        {videos.length} videos
      </div>

      {selectedVideoId && (
        <VideoModal
          videoId={selectedVideoId}
          videos={videos}
          autoplay={autoplay}
          onClose={() => setSelectedVideoId("")}
          onNavigate={handleNavigate}
          onHeartClick={() => handleHeartClick(selectedVideoId)}
        />
      )}
    </div>
  );
};
