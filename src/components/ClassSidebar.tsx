import { useState } from "react";

interface ClassInfo {
  id: string;
  name: string;
  fullName: string;
  count: number;
}

interface ClassSidebarProps {
  classes: ClassInfo[];
  selectedClass: string | null;
  onSelectClass: (classId: string | null) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ClassSidebar = ({
  classes,
  selectedClass,
  onSelectClass,
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}: ClassSidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "IT",
    "BA",
    "DS",
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "IT":
        return "Information Technology";
      case "BA":
        return "Business Administration";
      case "DS":
        return "Design";
      default:
        return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "IT":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "BA":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "DS":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Group classes by category (IT, BA, DS)
  const groupedClasses = classes.reduce((acc, cls) => {
    const category = cls.id.match(/^[A-Z]+/)?.[0] || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cls);
    return acc;
  }, {} as Record<string, ClassInfo[]>);

  const totalVideos = classes.reduce((sum, cls) => sum + cls.count, 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gray-900 border-r border-gray-800 z-50 transition-all duration-300 flex flex-col ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-16" : "w-72"}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-white">Classes</h2>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {/* Desktop Toggle Button */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex w-8 h-8 items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                className={`w-5 h-5 transition-transform ${
                  isCollapsed ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* All Classes Button */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-800">
            <button
              onClick={() => {
                onSelectClass(null);
                onCloseMobile();
              }}
              className={`w-full px-4 py-3 rounded-lg text-left transition-colors flex items-center justify-between ${
                selectedClass === null
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span className="font-medium">All Classes</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  selectedClass === null
                    ? "bg-blue-600"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {totalVideos}
              </span>
            </button>
          </div>
        )}

        {/* Collapsed All Classes Icon */}
        {isCollapsed && (
          <div className="hidden lg:block p-2 border-b border-gray-800">
            <button
              onClick={() => {
                onSelectClass(null);
              }}
              className={`w-full p-3 rounded-lg transition-colors flex items-center justify-center ${
                selectedClass === null
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              title="All Classes"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Class List - Expanded */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {Object.entries(groupedClasses).map(
              ([category, categoryClasses]) => (
                <div key={category} className="space-y-1">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-3 py-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-blue-400">
                        {getCategoryIcon(category)}
                      </div>
                      <span className="text-sm font-medium">
                        {getCategoryName(category)}
                      </span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedCategories.includes(category) ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Category Classes */}
                  {expandedCategories.includes(category) && (
                    <div className="ml-4 space-y-1">
                      {categoryClasses.map((cls) => (
                        <button
                          key={cls.id}
                          onClick={() => {
                            onSelectClass(cls.id);
                            onCloseMobile();
                          }}
                          className={`w-full px-4 py-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                            selectedClass === cls.id
                              ? "bg-blue-500 text-white"
                              : "text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          <span className="text-sm">{cls.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              selectedClass === cls.id
                                ? "bg-blue-600"
                                : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            {cls.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* Class List - Collapsed (Icons Only) */}
        {isCollapsed && (
          <div className="hidden lg:block flex-1 overflow-y-auto p-2 space-y-2">
            {Object.entries(groupedClasses).map(
              ([category, categoryClasses]) => (
                <div key={category} className="space-y-1">
                  {categoryClasses.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => {
                        onSelectClass(cls.id);
                      }}
                      className={`w-full p-3 rounded-lg transition-colors flex items-center justify-center relative group ${
                        selectedClass === cls.id
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                      title={cls.name}
                    >
                      <span className="text-xs font-semibold">
                        {cls.name.slice(-2)}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                        {cls.name}
                        <span className="ml-2 text-xs text-gray-400">
                          ({cls.count})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </aside>
    </>
  );
};
