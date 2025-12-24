import { useEffect, useRef } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClassIcon,
  TeamIcon,
  XIcon,
} from "../assets/Icons";
import { type Video } from "../types";
import HeartButton from "./HeartButton";

interface VideoModalProps {
  videoId: string;
  videos: Video[];
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  autoplay: boolean;
  onHeartClick: () => void;
}

export const VideoModal = ({
  videoId,
  videos,
  autoplay,
  onClose,
  onNavigate,
  onHeartClick,
}: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cloudinaryRef = useRef<any>(null);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = (window as any).cloudinary;
    cloudinaryRef.current?.videoPlayer(videoRef.current, {
      cloudName: "drwdqe51v",
    });
  }, []);

  const currentIndex = videos.findIndex((v) => v.videoId === videoId);
  const video = videos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < videos.length - 1;

  useEffect(() => {
    if (videoId && videoRef.current) {
      videoRef.current.play();
    }
  }, [videoId]);

  const handleVideoEnded = () => {
    if (!hasNext || !autoplay) return;

    setTimeout(() => {
      onNavigate("next");
    }, 1000);
  };

  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl max-h-[90vh] bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <XIcon />
        </button>

        {hasPrev && (
          <button
            onClick={() => onNavigate("prev")}
            className="hidden lg:flex absolute text-white left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-blue-500 rounded-full items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ArrowLeftIcon width={24} height={24} />
          </button>
        )}

        {hasNext && (
          <button
            onClick={() => onNavigate("next")}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-blue-500 rounded-full items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ArrowRightIcon width={24} height={24} />
          </button>
        )}

        <div className="flex-1 flex flex-col overflow-auto">
          {/* Video Player */}
          <div className="relative bg-black aspect-video shrink-0">
            <video
              ref={videoRef}
              data-cld-public-id={video.videoId}
              controls
              className="w-full! h-full! object-cover"
              onEnded={handleVideoEnded}
            />
          </div>

          {/* Video Details */}
          <div className="flex-1 p-6 space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 lg:gap-4 mb-4 lg:mb-2">
              <div>
                <h2 className="text-2xl font-bold text-white">{video.title}</h2>
                {video.description && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>

              <HeartButton
                onHeartClick={onHeartClick}
                heartCount={video.heartCount}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-300 gap-2">
                <TeamIcon width={20} height={20} />
                <div>
                  <span className="text-xs text-gray-400 block">Team</span>
                  <span className="font-medium">{video.teamName}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-300 gap-2">
                <ClassIcon width={20} height={20} />
                <div>
                  <span className="text-xs text-gray-400 block">Class</span>
                  <span className="font-medium">{video.className}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                Team Members
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {video.teamMembers.map((member) => (
                  <div
                    key={member}
                    className="bg-gray-800 rounded-lg py-1 px-2 border border-gray-700"
                  >
                    <p className="text-white font-medium">{member}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex lg:hidden gap-3 pt-4 border-t border-gray-700">
              <button
                onClick={() => onNavigate("prev")}
                disabled={!hasPrev}
                className="flex-1 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeftIcon width={20} height={20} />
                Previous
              </button>
              <button
                onClick={() => onNavigate("next")}
                disabled={!hasNext}
                className="flex-1 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                Next
                <ArrowRightIcon width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
