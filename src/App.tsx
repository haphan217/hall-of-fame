import { useState, useMemo } from "react";

import { ClassSidebar } from "./components/ClassSidebar";
import { VideoGrid } from "./components/VideoGrid";
import { VideoModal } from "./components/VideoModal";
import { mockVideos } from "./mockData";
import { type Video } from "./types";

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  // Filter videos by selected class
  const filteredVideos = useMemo(() => {
    if (!selectedClass) return mockVideos;
    return mockVideos.filter((video) => video.className === selectedClass);
  }, [selectedClass]);

  // Get unique classes with counts
  const classes = useMemo(() => {
    const classMap = new Map<string, { count: number; fullName: string }>();

    mockVideos.forEach((video) => {
      const existing = classMap.get(video.className);
      if (existing) {
        existing.count++;
      } else {
        classMap.set(video.className, {
          count: 1,
          fullName: video.className,
        });
      }
    });

    return Array.from(classMap.entries())
      .map(([id, info]) => ({
        id,
        name: id,
        fullName: info.fullName,
        count: info.count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedVideo) return;

    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === selectedVideo.id
    );
    let newIndex: number;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    } else {
      newIndex =
        currentIndex < filteredVideos.length - 1
          ? currentIndex + 1
          : currentIndex;
    }

    setSelectedVideo(filteredVideos[newIndex]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-900 to-blue-900 flex">
      {/* Sidebar */}
      <ClassSidebar
        classes={classes}
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        isMobileOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Hall of Fame
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {selectedClass
                      ? `${selectedClass} - ${filteredVideos.length} videos`
                      : `Explore amazing student projects and innovations`}
                  </p>
                </div>
              </div>

              {/* Autoplay Toggle */}
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg">
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
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <VideoGrid videos={filteredVideos} onVideoClick={handleVideoClick} />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-400 text-sm">
              © 2025 Hall of Fame. Showcasing student excellence.
            </p>
          </div>
        </footer>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          videos={filteredVideos}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
          autoplay={autoplay}
        />
      )}
    </div>
  );
}

export default App;
