import {
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { type Category, type Video } from "../types";
import { db } from "../utils/firebaseConfig";
import { Pagination } from "./Pagination";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

const VIDEOS_PER_PAGE = 10;

interface VideoGridProps {
  category?: Category;
}

export const VideoGrid = ({ category }: VideoGridProps) => {
  const [autoplay, setAutoplay] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<Video>();
  const [videos, setVideos] = useState<Video[]>([]);

  const [loading, setLoading] = useState(true);
  const classId = category?.name;

  useEffect(() => {
    if (!classId) return;

    (async () => {
      setLoading(true);
      const docRef = collection(db, `videos_${classId}`);
      const querySnapshot = await getDocs(docRef);
      const vids = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Video)
      );
      setVideos(vids);
      setLoading(false);
    })();
  }, [classId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const currentVideos = videos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHeartClick = async (id: string) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, heartCount: video.heartCount + 1 } : video
      )
    );

    const videoRef = doc(db, `videos_${classId}`, id);
    await updateDoc(videoRef, {
      heartCount: increment(1),
    });
  };

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedVideo) return;

    const currentIndex = videos.findIndex((v) => v.id === selectedVideo.id);
    let newIndex: number;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    } else {
      newIndex =
        currentIndex < videos.length - 1 ? currentIndex + 1 : currentIndex;
    }

    setSelectedVideo(videos[newIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:px-8  w-full">
      {category && (
        <>
          <p className="text-gray-400 text-sm lg:text-base font-semibold">
            {classId}
          </p>
          <p className="text-gray-400 text-sm lg:text-base mt-1 mb-3 lg:mb-0">
            {category.description}
          </p>
        </>
      )}

      <div className="hidden w-fit ml-auto mb-4 lg:flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg mt-2">
        <span className="text-sm text-gray-300">Autoplay</span>
        <button
          onClick={() => setAutoplay(!autoplay)}
          className={`relative inline-flex text-sm h-6 w-11 items-center rounded-full transition-colors ${
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
            onClick={() => handleVideoClick(video)}
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

      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo.videoId}
          videos={videos}
          autoplay={autoplay}
          onClose={() => setSelectedVideo(undefined)}
          onNavigate={handleNavigate}
          onHeartClick={() => handleHeartClick(selectedVideo.id)}
        />
      )}
    </div>
  );
};
