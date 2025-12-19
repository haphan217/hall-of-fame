import { useState } from "react";

import { ClassSidebar } from "./components/ClassSidebar";
import { VideoGrid } from "./components/VideoGrid";
import { mockVideos } from "./mockData";

function App() {
  const [selectedClass, setSelectedClass] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-900 to-blue-900 flex">
      <ClassSidebar
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        onCloseMobile={() => setSidebarCollapsed(true)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarCollapsed(false)}
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
                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-2">
                  Hall of Fame
                </h1>
                <p className="text-gray-400 text-sm lg:text-base">
                  Explore amazing student projects and innovations
                </p>
                {selectedClass && (
                  <p className="text-gray-400 text-sm lg:text-base font-semibold mt-1">
                    {selectedClass} - {mockVideos.length} videos
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        <VideoGrid />

        <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-400 text-sm">
              © 2025 Hall of Fame. Showcasing student excellence.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
