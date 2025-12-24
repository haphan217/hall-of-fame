import { Cloudinary } from "@cloudinary/url-gen";

import { ClassIcon, PlayIcon, TeamIcon } from "../assets/Icons";
import { type Video } from "../types";

const cld = new Cloudinary({
  cloud: {
    cloudName: "drwdqe51v",
  },
});

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  onHeartClick: () => void;
}

export const VideoCard = ({ video, onClick, onHeartClick }: VideoCardProps) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHeartClick();
  };

  const thumbnail = cld.image(video.thumbnail).toURL();

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 group relative"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <img
          src={thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <PlayIcon />
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>

        <div className="space-y-1">
          <div className="flex items-center text-gray-400 text-sm gap-1">
            <TeamIcon />
            <span className="truncate">{video.teamName}</span>
          </div>

          <div className="flex items-center text-gray-400 text-sm gap-1">
            <ClassIcon />
            <span className="truncate">{video.className}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleHeartClick}
        className="absolute bottom-3 right-3 flex items-center gap-2 bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-3 py-1.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 z-10"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="text-sm font-semibold">{video.heartCount}</span>
      </button>
    </div>
  );
};
